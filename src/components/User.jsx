import { Link, useParams } from "react-router-dom";
import useUser from "../hooks/useUser";
import Loading from "./Loading";
import "./styles/User.css";
import consts from "../constants.json";
import Week from "./Week";

export default function User() {
  const { user } = useParams();
  const [data, isLoading] = useUser(user);

  if (isLoading) {
    return (
      <main className="users-container">
        <h1>{user}</h1>
        <Loading />
        <Link className="go-back" to={"/"}>
          Volver
        </Link>
      </main>
    );
  }

  const isDataEmpty = Object.keys(data).length === 0;

  const date = new Date(consts.limitDate);
  const day = date.getDay();
  const month = consts.months[date.getMonth()];
  const year = date.getFullYear();

  if (isDataEmpty) {
    return (
      <main className="noproblem-container">
        <h1>
          Ningun problema resuelto desde el {day} de {month} de {year}
        </h1>
        <Link className="go-back" to={"/"}>
          Volver
        </Link>
      </main>
    );
  }

  return (
    <>
      <main className="users-container">
        <header>
          <img className="profile-picture" src={data.pfp} alt="profile picture" />
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
        <ul className="problems-container">
          {Object.keys(data).map((date, idx) => {
            if (date === "pfp") return;
            return <Week key={idx} date={date} data={data} />;
          })}
        </ul>

        <Link className="go-back" to={"/"}>
          Volver
        </Link>
      </main>
    </>
  );
}
