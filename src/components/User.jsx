import { Link, useParams } from "react-router-dom";
import useUser from "../hooks/useUser";
import "./styles/User.css";
import consts from "../constants.json";
import Week from "./Week";
import Loading from "./Loading";
import { useEffect, useRef } from "react";

export default function User() {
  const { user } = useParams();
  const [data, isLoading] = useUser(user);
  const ref = useRef(null);

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
          Volver
        </Link>
      </main>
    );
  }

  const isDataEmpty = Object.keys(data).length === 1;

  const date = new Date(consts.limitDate);
  const day = date.getDay();
  const month = consts.months[date.getMonth()];
  const year = date.getFullYear();

  return (
    <>
      <main ref={ref} className="users-container">
        <header>
          <img
            className="profile-picture"
            src={data.pfp}
            alt="profile picture"
          />
          <h1 className="profile-link">
            <a
              className="profile-anchor"
              rel="noreferrer"
              target="_blank"
              href={`https://codeforces.com/profile/${user}`}
            >
              {user}
            </a>
          </h1>
        </header>
        {isDataEmpty ? (
          <h2 className="no-problems">
            No se ha resuelto ningun problema desde el {day + 1} de {month} del{" "}
            {year}
          </h2>
        ) : (
          <ul className="problems-container">
            {Object.keys(data).map((date, idx) => {
              if (date === "pfp") return;
              return <Week key={idx} date={date} data={data} />;
            })}
          </ul>
        )}
      </main>
      <Link className="go-back" to={"/"}>
        Volver
      </Link>
    </>
  );
}
