import { useEffect, useState } from "react";
import { IconTag } from "../icons";
import { colors } from "../utils";
import "./styles/Problem.css";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadStarsPreset } from "@tsparticles/preset-stars";

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
  const [init, setInit] = useState(false);

  const color = dynamicStyleRating(rating);
  const shadow = { boxShadow: `0 0 30px -20px ${color}` };

  const showParticles = max === rating;

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadStarsPreset(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = {
    preset: "stars",
    background: { color: "transparent" },
    fullScreen: { enable: false },
    particles: {
      number: { value: 10 },
      size: { value: 2 },
      color: { value: color },
    },
  };

  return (
    <a
      target="_blank"
      href={`https://codeforces.com/problemset/problem/${id}/${index}`}
      className="problem"
      style={shadow}
      rel="noreferrer"
    >
      {showParticles && init && (
        <Particles
          options={options}
          id={crypto.randomUUID()}
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
