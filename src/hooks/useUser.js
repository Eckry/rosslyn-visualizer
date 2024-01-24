import { useEffect, useState } from "react";
import constants from "../constants.json";

export default function useUser(user) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    fetch(`https://codeforces.com/api/user.status?handle=${user}`)
      .then((res) => res.json())
      .then((userData) => {
        const newUserData = userData.result.reduce((userProblems, problem) => {
          if (constants.solved[user][problem.problem.name]) return userProblems;
          if (
            problem.verdict === "OK" &&
            !userProblems.some((y) => y.problem.name === problem.problem.name)
          )
            return [...userProblems, problem];
          return userProblems;
        }, []);
        setData(newUserData);
      })
      .catch((e) => console.error(e))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return [data, isLoading];
}
