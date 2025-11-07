import dogImg from "../../../../shared/assets/images/vital-task/dog.png";
import { TaskDetails } from "../../../../shared/ui/TaskDetails/TaskDetails";

export const VitalTaskDetails = () => (
  <TaskDetails
    image={dogImg}
    title="Walk the dog"
    priority="Extreme"
    status="Not Started"
    date="20/06/2023"
    description="Take the dog to the park and bring treats as well."
    extraContent={
      <ul>
        <li>Listen to a podcast or audiobook</li>
        <li>Take photos of interesting sights</li>
        <li>Practice obedience training with your dog</li>
      </ul>
    }
  />
);
