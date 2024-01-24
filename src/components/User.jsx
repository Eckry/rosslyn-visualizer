import { useParams } from "react-router-dom";
import useUser from "../hooks/useUser";
import { Link } from "react-router-dom";
import "./styles/User.css"

export default function User() {
  const {user} = useParams();
  const [data] = useUser(user);
  return (
    <main className="users-container">
      <h1>{user}</h1>
      <ul className="problems-container">
        {data.map((problem) => {
          return (
            <li className="problem" key={problem.problem.name}>
              <p>{problem.problem.name}</p>
              <p>{problem.problem.rating}</p>
              <div>
                {problem.problem.tags.map((tag) => (
                  <p key={tag}>{tag}</p>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
      <h4>Total: {data.length}</h4>

      <Link className="go-back" to={"/"}>Go back</Link>
    </main>
  );
}
