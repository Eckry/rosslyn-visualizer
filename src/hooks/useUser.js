import { useEffect, useState } from "react";
import constants from "../constants.json";

export default function useUser(user) {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`https://codeforces.com/api/user.status?handle=${user}`)
      .then((res) => res.json())
      .then((userData) => {
        const newUserData = userData.result.reduce((userProblems, problem) => {
          if (constants.solved.kyhoscrusher[problem.problem.name])
            return userProblems;
          if (
            problem.verdict === "OK" &&
            !userProblems.some((y) => y.problem.name === problem.problem.name)
          )
            return [...userProblems, problem];
          return userProblems;
        }, []);
        setData(newUserData);
      })
      .catch((e) => console.error(e));
  }, []);

  return [data];
}
