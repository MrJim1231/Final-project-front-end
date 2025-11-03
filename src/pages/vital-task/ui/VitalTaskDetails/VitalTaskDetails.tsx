import "./VitalTaskDetails.css";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import dogImg from "../../../../shared/assets/images/vital-task/dog.png";

export const VitalTaskDetails = () => {
  return (
    <div className="vital-details">
      {/* === Верхняя часть с изображением и основной инфой === */}
      <div className="vital-details__top">
        <img src={dogImg} alt="Dog" className="vital-details__img" />

        <div className="vital-details__info">
          <h3 className="vital-details__title">Walk the dog</h3>
          <p className="vital-details__priority">
            Priority:{" "}
            <span className="vital-details__priority--red">Extreme</span>
          </p>
          <p className="vital-details__status">
            Status:{" "}
            <span className="vital-details__status--red">Not Started</span>
          </p>
          <p className="vital-details__date">Created on: 20/06/2023</p>
        </div>
      </div>

      {/* === Описание === */}
      <div className="vital-details__content">
        <p>Take the dog to the park and bring treats as well.</p>
        <p>
          Take Luffy and Jiro for a leisurely stroll around the neighborhood.
          Enjoy the fresh air and give them the exercise and mental stimulation
          they need for a happy and healthy day. Don't forget to bring along
          squeaky and fluffy toys for some extra fun along the way!
        </p>

        <ul className="vital-details__list">
          <li>Listen to a podcast or audiobook</li>
          <li>Practice mindfulness or meditation</li>
          <li>Take photos of interesting sights along the way</li>
          <li>Practice obedience training with your dog</li>
          <li>Chat with neighbors or other dog walkers</li>
          <li>Listen to music or an upbeat playlist</li>
        </ul>
      </div>

      {/* === Кнопки === */}
      <div className="vital-details__actions">
        <button className="vital-details__btn vital-details__btn--delete">
          <FiTrash2 />
        </button>
        <button className="vital-details__btn vital-details__btn--edit">
          <FiEdit2 />
        </button>
      </div>
    </div>
  );
};
