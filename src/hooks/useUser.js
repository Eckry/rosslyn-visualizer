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
              // Check if the week exists already
              dates[problemWeek].max = Math.max(
                dates[problemWeek].max, // Find max rating of each week every iteration
                problem.problem.rating
              );
              if (
                dates[problemWeek][problemYear] &&
                !dates[problemWeek][problemYear].some(
                  //Check if the date already exists in the week and check if the problem is already there
                  (element) => element.name === problem.problem.name
                )
              )
                return dates[problemWeek][problemYear].push({
                  name: problem.problem.name,
                  tags: problem.problem.tags, // If the date exists, then add new problem
                  rating: problem.problem.rating,
                });
              return (dates[problemWeek][problemYear] = [
                {
                  name: problem.problem.name,
                  tags: problem.problem.tags, //If the date doesn't exists, add an array with the problem
                  rating: problem.problem.rating,
                },
              ]);
            }
            dates[problemWeek] = { max: problem.problem.rating };
            dates[problemWeek][problemYear] = [
              {
                name: problem.problem.name,
                tags: problem.problem.tags, // If the week doesn't exists, add it and add max rating as a property
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
