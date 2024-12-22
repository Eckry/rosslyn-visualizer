import { useEffect, useState } from "react";
import { IconTag } from "../icons";
import { dynamicStyleRating } from "../utils";
import "./styles/Problem.css";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadStarsPreset } from "@tsparticles/preset-stars";

export default function Problem({ tags, name, rating, id, index, max }) {
  const [init, setInit] = useState(false);

  const { dark, light } = dynamicStyleRating(rating, "light");
  const bg = { backgroundColor: dark, borderColor: light };

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
      color: { value: light },
    },
  };

  return (
    <a
      target="_blank"
      href={`https://codeforces.com/problemset/problem/${id}/${index}`}
      className="problem"
      style={bg}
      rel="noreferrer"
    >
      {showParticles && init && (
        <Particles
          options={options}
          id={crypto.randomUUID()}
          className="tsparticles2"
        />
      )}
      <p style={{ color: light }} className="problem-title">
        {name}
      </p>
      <p style={{ color: light }}>{rating}</p>
      <div style={{ color: light }} className="tags-show">
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
