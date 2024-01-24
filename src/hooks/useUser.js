import { useEffect, useState } from "react";
import { limitDate, days } from "../constants.json";

function getWeekOfMonth(date) {
  let t2 = new Date(date).getTime();
  let t1 = new Date(limitDate).getTime();

  return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
}

export default function useUser(user) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    fetch(`https://codeforces.com/api/user.status?handle=${user}`)
      .then((res) => res.json())
      .then((userData) => {
        const dates = {};
        const limitTime = new Date(limitDate).getTime();
        userData.result.forEach((problem) => {
          const problemDate = new Date(problem.creationTimeSeconds * 1000);
          if (problem.verdict === "OK" && problemDate.getTime() > limitTime) {
            const problemYear = days[problemDate.getDay()];
            const problemWeek = getWeekOfMonth(problemDate);
            if (dates[problemWeek]) {
              dates[problemWeek].max = Math.max(
                dates[problemWeek].max,
                problem.problem.rating
              );
              if (
                dates[problemWeek][problemYear] &&
                !dates[problemWeek][problemYear].some(
                  (element) => element.name === problem.problem.name
                )
              )
                return dates[problemWeek][problemYear].push({
                  name: problem.problem.name,
                  tags: problem.problem.tags,
                  rating: problem.problem.rating,
                });
              return (dates[problemWeek][problemYear] = [
                {
                  name: problem.problem.name,
                  tags: problem.problem.tags,
                  rating: problem.problem.rating,
                },
              ]);
            }
            dates[problemWeek] = { max: problem.problem.rating };
            dates[problemWeek][problemYear] = [
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
