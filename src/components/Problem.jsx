import { IconTag } from "../icons";
import { colors } from "../utils";
import "./styles/Problem.css";

const dynamicStyleRating = (rating) => {
  if (rating >= 2400) return { color: colors.grandmaster };
  if (rating >= 2100) return { color: colors.master };
  if (rating >= 1900) return { color: colors.candidate };
  if (rating >= 1600) return { color: colors.expert };
  if (rating >= 1400) return { color: colors.specialist };
  if (rating >= 1200) return { color: colors.pupil };
  return { color: colors.newbie };
};

export default function Problem({ tags, name, rating, id, index }) {
  return (
    <a
      target="_blank"
      href={`https://codeforces.com/problemset/problem/${id}/${index}`}
      className="problem"
      key={name}
      rel="noreferrer"
    >
      <p className="problem-title">{name}</p>
      <p style={dynamicStyleRating(rating)}>{rating}</p>
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
