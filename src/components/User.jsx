import { useParams } from "react-router-dom";
import useUser from "../hooks/useUser";
import { Link } from "react-router-dom";
import Loading from "./Loading";
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
          return data[date].map((problem) => {
            const { tags, name, rating } = problem;
            return (
              <li className="problem" key={name}>
                <h5>{date}</h5>
                <p>{name}</p>
                <p>{rating}</p>
                <div>
                  {tags.map((tag) => (
                    <p key={tag}>{tag}</p>
                  ))}
                </div>
              </li>
            );
          });
        })}
      </ul>
      <h4>Total: {data.length}</h4>

      <Link className="go-back" to={"/"}>
        Go back
      </Link>
    </main>
  );
}
