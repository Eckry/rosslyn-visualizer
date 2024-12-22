import { Link, useParams } from "react-router-dom";
import useUser from "../hooks/useUser";
import "./styles/User.css";
import consts from "../constants.json";
import Week from "./Week";
import Loading from "./Loading";
import { useEffect, useRef } from "react";
import { IconGoBack, IconGoBackShape } from "../icons";
import { dynamicStyleRating } from "../utils";

export default function User() {
  const { user } = useParams();
  const [data, isLoading] = useUser(user);
  const ref = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.classList.add("appear");
    }
  }, [data]);

  if (isLoading) {
    return (
      <main className="users-loading">
        <Loading />
        <Link className="go-back" to={"/"}>
          <IconGoBackShape />
          <IconGoBack />
        </Link>
      </main>
    );
  }

  const isDataEmpty = Object.keys(data).length === 1;

  const date = new Date(consts.limitDate);
  const day = date.getDay();
  const month = consts.months[date.getMonth()];
  const year = date.getFullYear();

  const { dark, light } = dynamicStyleRating(data.profileInfo.rating);
  const { light: maxLight } = dynamicStyleRating(data.profileInfo.maxRating);

  function handleMove(e) {
    const width = cardRef.current.clientWidth;
    const height = cardRef.current.clientHeight;

    const xVal = e.clientX - e.target.getBoundingClientRect().x;
    const yVal = e.clientY - e.target.getBoundingClientRect().y;
    const yRotation = 20 * ((xVal - width / 2) / width);
    const xRotation = -20 * ((yVal - height / 2) / height);
    const string =
      "perspective(500px) scale(1.1) rotateX(" +
      xRotation +
      "deg) rotateY(" +
      yRotation +
      "deg)";

    cardRef.current.style.transform = string;
  }

  function handleLeave() {
    cardRef.current.style.transform =
      "perspective(500px) scale(1) rotateX(0) rotateY(0)";
    console.log("xd");
  }

  function handleDown() {
    cardRef.current.style.transform =
      "perspective(500px) scale(0.9) rotateX(0) rotateY(0)";
  }

  function handleUp() {
    cardRef.current.style.transform =
      "perspective(500px) scale(1.1) rotateX(0) rotateY(0)";
  }

  return (
    <>
      <main ref={ref} className="users-container">
        <header
          ref={cardRef}
          onMouseMove={handleMove}
          onMouseOut={handleLeave}
          onMouseDown={handleDown}
          onMouseUp={handleUp}
          className="user-header"
          style={{ backgroundColor: dark, borderColor: light }}
        >
          <img
            className="profile-picture"
            src={data.profileInfo.titlePhoto}
            alt="profile picture"
          />
          <div className="user-info-container">
            <div>
              <h1 style={{ color: light }}>{data.profileInfo.rank}</h1>
              <h1 className="profile-link">
                <a
                  style={{ color: light }}
                  rel="noreferrer"
                  target="_blank"
                  href={`https://codeforces.com/profile/${user}`}
                >
                  {data.profileInfo.handle}
                </a>
              </h1>
            </div>
            <div>
              <p>
                rating:{" "}
                <span style={{ color: light }}>{data.profileInfo.rating}</span>
              </p>
              <p>
                max rating:{" "}
                <span style={{ color: maxLight }}>
                  {data.profileInfo.maxRating} ({data.profileInfo.maxRank})
                </span>
              </p>
            </div>
          </div>
        </header>
        {isDataEmpty ? (
          <h2 className="no-problems">
            No se ha resuelto ningun problema desde el {day + 1} de {month} del{" "}
            {year}
          </h2>
        ) : (
          <ul className="problems-container">
            {Object.keys(data).map((date, idx) => {
              if (date === "profileInfo") return;
              return <Week key={idx} date={date} data={data} />;
            })}
          </ul>
        )}
      </main>
      <Link className="go-back" to={"/"}>
        <IconGoBackShape />
        <IconGoBack />
      </Link>
    </>
  );
}
