import "./MyTaskDetails.css";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import docImg from "../../../../shared/assets/images/my-task/docs.png";

export const MyTaskDetails = () => {
  return (
    <div className="my-details">
      <div className="my-details__top">
        <img src={docImg} alt="Documents" className="my-details__img" />

        <div className="my-details__info">
          <h3 className="my-details__title">Submit Documents</h3>
          <p className="my-details__priority">
            Priority: <span className="my-details__priority--red">Extreme</span>
          </p>
          <p className="my-details__status">
            Status: <span className="my-details__status--red">Not Started</span>
          </p>
          <p className="my-details__date">Created on: 20/06/2023</p>
        </div>
      </div>

      <div className="my-details__content">
        <p>
          <strong>Task Title:</strong> Document Submission.
        </p>
        <p>
          <strong>Objective:</strong> To submit required documents for something
          important.
        </p>
        <p>
          <strong>Task Description:</strong> Review the list of documents
          required for submission and ensure all necessary documents are ready.
          Organize and scan them properly for identification and verification.
        </p>

        <ul className="my-details__list">
          <li>Ensure documents are authentic and up-to-date.</li>
          <li>
            Maintain confidentiality and security during the submission process.
          </li>
          <li>
            Follow up for confirmation of successful submission if required.
          </li>
        </ul>

        <p>
          <strong>Deadline for Submission:</strong> End of Day.
        </p>
      </div>

      <div className="my-details__actions">
        <button className="my-details__btn my-details__btn--delete">
          <FiTrash2 />
        </button>
        <button className="my-details__btn my-details__btn--edit">
          <FiEdit2 />
        </button>
      </div>
    </div>
  );
};
