import { useParams } from "react-router-dom";
import useUser from "../hooks/useUser";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { days } from "../constants.json";
import "./styles/User.css";

export default function User() {
  const { user } = useParams();
  const [data, isLoading] = useUser(user);

  if (isLoading) {
    return (
      <main className="users-container">
        <h1>{user}</h1>
        <Loading />
        <Link className="go-back" to={"/"}>
          Go back
        </Link>
      </main>
    );
  }

  return (
    <main className="users-container">
      <h1>{user}</h1>
      <ul className="problems-container">
        {Object.keys(data).map((date) => {
          return (
            <li className="week-container">
              <h1>Week {Number(date) + 1}</h1>
              <div>
                {days.map((day) => {
                  if (!data[date][day])
                    return (
                      <div className="day-container">
                        <h4>{day}</h4>
                      </div>
                    );
                  return (
                    <div className="day-container">
                      <h4>{day}</h4>
                      <div>
                        {data[date][day].map((problem) => {
                          const { tags, name, rating } = problem;
                          return (
                            <div className="problem" key={name}>
                              <p>{name}</p>
                              <p>{rating}</p>
                              <div>
                                {tags.map((tag) => (
                                  <p key={tag}>{tag}</p>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ul>
      <h4>Total: {data.length}</h4>

      <Link className="go-back" to={"/"}>
        Go back
      </Link>
    </main>
  );
}
