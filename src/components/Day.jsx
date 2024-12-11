import "./styles/Day.css";
import Problem from "./Problem";
import { dynamicStyleRating } from "../utils";

export default function Day({ data, day, max }) {
  const color = dynamicStyleRating(max);
  return (
    <div key={day} className="day-container">
      <h4 className="day" style={{ color }}>
        {day}
      </h4>
      <div className="problem-container">
        {data.map((problem, idx) => {
          return (
            <Problem key={`${idx}-${problem.id}`} {...problem} max={max} />
          );
        })}
      </div>
    </div>
  );
}
