import { IconTag } from "../icons";
import { colors } from "../utils";
import "./styles/Problem.css";
import Particles from "@tsparticles/react";

const dynamicStyleRating = (rating) => {
  if (rating >= 2400) return colors.grandmaster;
  if (rating >= 2100) return colors.master;
  if (rating >= 1900) return colors.candidate;
  if (rating >= 1600) return colors.expert;
  if (rating >= 1400) return colors.specialist;
  if (rating >= 1200) return colors.pupil;
  return colors.newbie;
};

export default function Problem({ tags, name, rating, id, index, max }) {
  const options = {
    preset: "stars",
    background: { color: "transparent" },
    fullScreen: { enable: false },
    particles: {
      number: { value: 10 },
      size: { value: 2 },
      color: { value: "#facc15" },
    },
  };
  const color = dynamicStyleRating(rating);
  const shadow = { boxShadow: `0 0 30px -20px ${color}` };

  const showParticles = max === rating;
  return (
    <a
      target="_blank"
      href={`https://codeforces.com/problemset/problem/${id}/${index}`}
      className="problem"
      style={shadow}
      rel="noreferrer"
    >
      {showParticles && (
        <Particles
          options={options}
          id={`${index}-${id}`}
          className="tsparticles2"
        />
      )}
      <p className="problem-title">{name}</p>
      <p style={{ color }}>{rating}</p>
      <div className="tags-show">
        <IconTag />
        <div className="tags-container">
          {tags.map((tag, idx) => (
            <p title={tag} className="tag" key={idx}>
              {tag}
            </p>
          ))}
        </div>
      </div>
    </a>
  );
}
