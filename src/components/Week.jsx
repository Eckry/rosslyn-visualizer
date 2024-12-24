import "./styles/Week.css";
import Day from "./Day";
import { days } from "../constants.json";
import { dynamicStyleRating } from "../utils";
import { useState } from "react";
import { IconArrowDown } from "../icons";

export default function Week({ date, data }) {
  const [isOpen, setIsOpen] = useState(false);
  const totalSolved = Object.keys(data[date]).reduce((acc, day) => {
    if (day === "max") return acc;
    return acc + data[date][day].length;
  }, 0);

  function handleClick() {
    setIsOpen((prev) => !prev);
  }

  const { light, dark } = dynamicStyleRating(data[date].max);

  return (
    <>
      <li className="week-container">
        <h1
          style={{ backgroundColor: dark, color: light, borderColor: light }}
          onClick={handleClick}
          className="week-title"
          id={Number(date) + 1}
        >
          <span className="week-highlight" style={{ color: light }}>
            {Number(date) + 1}
          </span>
          <h2>{totalSolved}</h2>
          <span
            className="arrow"
            style={{ transform: isOpen ? "rotate(0deg)" : "rotate(180deg)" }}
          >
            <IconArrowDown />
          </span>
        </h1>
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
