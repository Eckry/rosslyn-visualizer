import "./styles/Week.css";
import Day from "./Day";
import { days } from "../constants.json";
import { dynamicStyleRating } from "../utils";
import { useState } from "react";

export default function Week({ date, data }) {
  const [isOpen, setIsOpen] = useState(false);
  const totalSolved = Object.keys(data[date]).reduce((acc, day) => {
    if (day === "max") return acc;
    return acc + data[date][day].length;
  }, 0);

  function handleClick() {
    setIsOpen((prev) => !prev);
  }

  const borderColor = dynamicStyleRating(data[date].max);

  return (
    <>
      <li className="week-container">
        <h1 className="week-title" id={Number(date) + 1}>
          <span
            className="week-highlight"
            style={{ color: isOpen ? "var(--highlight)" : "var(--gray)" }}
          >
            {Number(date) + 1}.
          </span>
          <span className="week-line"></span>
        </h1>
        <button
          onClick={handleClick}
          className="days-opener-button"
          style={{
            borderColor,
            color: isOpen ? "var(--highlight)" : "var(--gray)",
          }}
        >
          {totalSolved}
        </button>
        <span
          className="week-line2"
          style={{ width: isOpen ? "100%" : "0%" }}
        ></span>
        <div className={`accordion-wrapper ${isOpen ? "accordion-open" : ""}`}>
          <div className="accordion-content">
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
          </div>
        </div>
      </li>
    </>
  );
}
