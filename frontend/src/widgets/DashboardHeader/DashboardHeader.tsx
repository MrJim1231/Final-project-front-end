import { useEffect, useState } from "react";
import "./DashboardHeader.css";
import { FiUserPlus } from "react-icons/fi";
import { InviteModal } from "@/features/invite";
import { inviteApi } from "@/features/invite/api/inviteApi";
import { Member } from "@/entities/user/model/memberTypes";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

import defaultAvatar from "@/shared/assets/images/avatar6.png";

export const DashboardHeader = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<Member[]>([]);

  // 🎯 РОЛЬ ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ
  const role = useSelector((state: RootState) => state.user.role);
  const firstName = useSelector((state: RootState) => state.user.firstName);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const res = await inviteApi.getMembers();
      setUsers(res.data);
    } catch (err) {
      console.error("Error loading members:", err);
    }
  };

  return (
    <>
      <div className="dashboard-header">
        <h2 className="dashboard-header__title">
          Welcome back, <span>{firstName || "User"}</span> 👋
        </h2>

        <div className="dashboard-header__team">
          {/* AVATARS */}
          <div className="dashboard-header__avatars">
            {users.slice(0, 5).map((user) => (
              <img
                key={user._id}
                src={user.avatar || defaultAvatar}
                alt={user.name || "User"}
                className="dashboard-header__avatar"
              />
            ))}

            {users.length > 5 && (
              <div className="dashboard-header__more">+{users.length - 5}</div>
            )}
          </div>

          {/* === INVITE BUTTON (ONLY FOR OWNER) === */}
          {role === "owner" && (
            <button
              className="dashboard-header__invite"
              onClick={() => setOpen(true)}
            >
              <FiUserPlus className="dashboard-header__invite-icon" />
              Invite
            </button>
          )}
        </div>
      </div>

      {open && <InviteModal onClose={() => setOpen(false)} />}
    </>
  );
};
