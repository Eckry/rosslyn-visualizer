import useUser from "../hooks/useUser";
import "./styles/User.css"

export default function User() {
  const [data] = useUser("KyhosCrusher");
  return (
    <>
      <h1>KyhosCrusher</h1>
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
    </>
  );
}
