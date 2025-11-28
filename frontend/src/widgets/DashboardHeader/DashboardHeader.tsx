import { useEffect, useState } from "react";
import "./DashboardHeader.css";
import { FiUserPlus } from "react-icons/fi";
import { InviteModal } from "@/widgets/InviteModal";
import { inviteApi } from "@/widgets/InviteModal/api/inviteApi";
import { Member } from "@/entities/user/model/memberTypes";

export const DashboardHeader = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<Member[]>([]);

  // Загружаем участников для аватарок хедера
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
          Welcome back, <span>Sundar</span> 👋
        </h2>

        <div className="dashboard-header__team">
          {/* АВАТАРЫ УЧАСТНИКОВ */}
          <div className="dashboard-header__avatars">
            {users.slice(0, 5).map((user) => (
              <img
                key={user._id}
                src={user.avatar}
                alt={user.name}
                className="dashboard-header__avatar"
              />
            ))}

            {users.length > 5 && (
              <div className="dashboard-header__more">+{users.length - 5}</div>
            )}
          </div>

          {/* КНОПКА INVITE */}
          <button
            className="dashboard-header__invite"
            onClick={() => setOpen(true)}
          >
            <FiUserPlus className="dashboard-header__invite-icon" />
            Invite
          </button>
        </div>
      </div>

      {/* MODAL */}
      {open && <InviteModal onClose={() => setOpen(false)} />}
    </>
  );
};
