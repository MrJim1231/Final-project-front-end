import "./InviteModal.css";
import { IoIosArrowDown } from "react-icons/io";
import { useInvite } from "../model/useInvite";
import { useSelector } from "react-redux";
import { RootState } from "@/app/providers/store";
import { useState } from "react";

import defaultAvatar from "@/shared/assets/images/avatar6.png";

export const InviteModal = ({ onClose }: { onClose: () => void }) => {
  const { email, setEmail, members, projectLink, sendInvite, changeRole } =
    useInvite();

  const myRole = useSelector((state: RootState) => state.user.role);
  const isOwner = myRole === "owner";

  // 🔥 локальное состояние — какой dropdown открыт
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  const onSelectRole = async (memberId: string, role: string) => {
    await changeRole(memberId, role);
    setOpenDropdownId(null);
  };

  return (
    <div className="invite-modal-overlay">
      <div className="invite-modal">
        <div className="invite-header">
          <h2>Send an invite to a new member</h2>
          <button className="invite-back" onClick={onClose}>
            Go Back
          </button>
        </div>

        {isOwner && (
          <div className="invite-row">
            <input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button className="invite-send-btn" onClick={sendInvite}>
              Send Invite
            </button>
          </div>
        )}

        <h3>Members</h3>

        <div className="members-list">
          {members.map((m: any) => {
            const isMemberOwner = m.role === "owner";

            return (
              <div key={m._id} className="member-item">
                <img
                  src={m.avatar || defaultAvatar}
                  alt={m.name || "User"}
                  className="member-avatar"
                />

                <div className="member-info">
                  <div className="member-name">{m.name}</div>
                  <div className="member-email">{m.email}</div>
                </div>

                <div
                  className="role-select"
                  onClick={() => {
                    if (isOwner && !isMemberOwner) toggleDropdown(m._id);
                  }}
                >
                  <span>
                    {m.role === "edit"
                      ? "Can edit"
                      : m.role === "view"
                      ? "Can view"
                      : "Owner"}
                  </span>

                  {isOwner && !isMemberOwner && <IoIosArrowDown />}

                  <div
                    className={
                      openDropdownId === m._id
                        ? "role-dropdown show"
                        : "role-dropdown"
                    }
                  >
                    <div onClick={() => onSelectRole(m._id, "edit")}>
                      Can edit
                    </div>
                    <div onClick={() => onSelectRole(m._id, "view")}>
                      Can view
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <h3>Project Link</h3>

        <div className="invite-row">
          <input type="text" readOnly value={projectLink} />
          <button
            className="invite-copy-btn"
            onClick={() => navigator.clipboard.writeText(projectLink)}
          >
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
};
