import docImg from "../../../../shared/assets/images/my-task/docs.png";
import { TaskDetails } from "../../../../shared/ui/TaskDetails/TaskDetails";

export const MyTaskDetails = () => (
  <TaskDetails
    image={docImg}
    title="Submit Documents"
    priority="Extreme"
    status="Not Started"
    date="20/06/2023"
    description="To submit required documents for something important."
    extraContent={
      <ul>
        <li>Ensure documents are authentic and up-to-date.</li>
        <li>Maintain confidentiality during submission.</li>
        <li>Follow up for confirmation of successful submission.</li>
      </ul>
    }
  />
);
