import "./styles/Day.css"
import Problem from "./Problem";

export default function Day({ data, day, max }) {
  return (
    <div key={day} className="day-container">
      <h4 className="day">{day}</h4>
      <div className="problem-container">
        {data.map((problem, idx) => {
          return <Problem key={idx} {...problem} max={max} />;
        })}
      </div>
    </div>
  );
}
