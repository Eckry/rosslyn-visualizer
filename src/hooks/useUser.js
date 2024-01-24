import { useEffect, useState } from "react";
import { limitDate } from "../constants.json";

export default function useUser(user) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    fetch(`https://codeforces.com/api/user.status?handle=${user}`)
      .then((res) => res.json())
      .then((userData) => {
        // const newUserData = userData.result.reduce((userProblems, problem) => {
        //   const time = new Date(problem.creationTimeSeconds * 1000).getTime();
        //   const limit = new Date("January 14, 2024 00:00:00");
        //   if (time < limit.getTime()) return userProblems;
        //   if (
        //     problem.verdict === "OK" &&
        //     !userProblems.some((y) => y.problem.name === problem.problem.name)
        //   ) {
        //     return [...userProblems, problem];
        //   }
        //   return userProblems;
        // }, []);
        // setData(newUserData);

        const dates = {};
        const limitTime = new Date(limitDate).getTime();
        userData.result.forEach((problem) => {
          const problemDate = new Date(problem.creationTimeSeconds * 1000);
          if (problem.verdict === "OK" && problemDate.getTime() > limitTime) {
            const problemYear = problemDate.toLocaleDateString();
            if (
              dates[problemYear] &&
              !dates[problemYear].some(
                (element) => element.name === problem.problem.name
              )
            )
              return (dates[problemYear] = [
                ...dates[problemYear],
                {
                  name: problem.problem.name,
                  tags: problem.problem.tags,
                  rating: problem.problem.rating,
                },
              ]);
            dates[problemYear] = [
              {
                name: problem.problem.name,
                tags: problem.problem.tags,
                rating: problem.problem.rating,
              },
            ];
          }
        });
        setData(dates);
      })
      .catch((e) => console.error(e))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return [data, isLoading];
}
