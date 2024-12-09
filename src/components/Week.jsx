import "./styles/Week.css";
import Day from "./Day";
import { days } from "../constants.json";

export default function Week({ date, data }) {
  const totalSolved = Object.keys(data[date]).reduce((acc, day) => {
    if (day === "max") return acc;
    return acc + data[date][day].length;
  }, 0);

  return (
    <>
      <li className="week-container">
        <h1 className="week-title" id={Number(date) + 1}>
          <span className="week-highlight">{Number(date) + 1}.</span>
          <span className="week-line"></span>
        </h1>
        <label
          htmlFor={`days-opener-${Number(date)}`}
          className="days-opener-button"
        >
          {totalSolved}
        </label>
        <input
          id={`days-opener-${Number(date)}`}
          className="days-opener"
          type="checkbox"
        />
        <div className="days-package">
          {days.map((day, idx) => {
            if (!data[date][day]) return;
            return (
              <Day
                key={idx}
                data={data[date][day]}
                max={data[date].max}
                day={day}
              />
            );
          })}
        </div>
      </li>
    </>
  );
}
