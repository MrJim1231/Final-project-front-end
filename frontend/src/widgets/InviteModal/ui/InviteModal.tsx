import "./InviteModal.css";
import { IoIosArrowDown } from "react-icons/io";
import { useInvite } from "../model/useInvite";

export const InviteModal = ({ onClose }: { onClose: () => void }) => {
  const { email, setEmail, members, projectLink, sendInvite, changeRole } =
    useInvite();

  return (
    <div className="invite-modal-overlay">
      <div className="invite-modal">
        <div className="invite-header">
          <h2>Send an invite to a new member</h2>
          <button className="invite-back" onClick={onClose}>
            Go Back
          </button>
        </div>

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

        <h3>Members</h3>

        <div className="members-list">
          {members.map((m: any) => (
            <div key={m._id} className="member-item">
              <img src={m.avatar} alt="" className="member-avatar" />

              <div className="member-info">
                <div className="member-name">{m.name}</div>
                <div className="member-email">{m.email}</div>
              </div>

              <div className="role-select">
                <span>
                  {m.role === "owner"
                    ? "Owner"
                    : m.role === "edit"
                    ? "Can edit"
                    : "Can view"}
                </span>
                <IoIosArrowDown />

                <div className="role-dropdown">
                  <div onClick={() => changeRole(m._id, "edit")}>Can edit</div>
                  <div onClick={() => changeRole(m._id, "view")}>Can view</div>
                  <div onClick={() => changeRole(m._id, "owner")}>Owner</div>
                </div>
              </div>
            </div>
          ))}
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
