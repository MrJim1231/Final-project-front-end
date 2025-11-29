import "./InviteModal.css";
import { IoIosArrowDown } from "react-icons/io";
import { useInvite } from "../model/useInvite";
import { useSelector } from "react-redux";
import { RootState } from "@/app/providers/store";

import defaultAvatar from "@/shared/assets/images/avatar6.png";

export const InviteModal = ({ onClose }: { onClose: () => void }) => {
  const { email, setEmail, members, projectLink, sendInvite, changeRole } =
    useInvite();

  // 🎯 роль текущего пользователя
  const myRole = useSelector((state: RootState) => state.user.role);

  const isOwner = myRole === "owner";

  return (
    <div className="invite-modal-overlay">
      <div className="invite-modal">
        {/* HEADER */}
        <div className="invite-header">
          <h2>Send an invite to a new member</h2>
          <button className="invite-back" onClick={onClose}>
            Go Back
          </button>
        </div>

        {/* SEND INVITE — только для OWNER */}
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

        {/* MEMBERS LIST */}
        <h3>Members</h3>

        <div className="members-list">
          {members.map((m: any) => {
            const isMemberOwner = m.role === "owner";

            return (
              <div key={m._id} className="member-item">
                {/* AVATAR */}
                <img
                  src={m.avatar || defaultAvatar}
                  alt={m.name || "User"}
                  className="member-avatar"
                />

                {/* INFO */}
                <div className="member-info">
                  <div className="member-name">{m.name}</div>
                  <div className="member-email">{m.email}</div>
                </div>

                {/* ROLE SELECTOR */}
                <div className="role-select">
                  <span>
                    {m.role === "edit"
                      ? "Can edit"
                      : m.role === "view"
                      ? "Can view"
                      : "Owner"}
                  </span>

                  {/* Только OWNER может менять роли + нельзя менять владельца */}
                  {isOwner && !isMemberOwner && (
                    <>
                      <IoIosArrowDown />

                      <div className="role-dropdown">
                        <div onClick={() => changeRole(m._id, "edit")}>
                          Can edit
                        </div>
                        <div onClick={() => changeRole(m._id, "view")}>
                          Can view
                        </div>
                        {/* ❌ Убираем возможность назначить owner */}
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* PROJECT LINK */}
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
