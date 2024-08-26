import { IconTag } from "../icons";
import "./styles/Problem.css";

const dynamicStyleRating = (rating, max) => {
  return { color: rating === max ? "var(--highlight-color-two)" : "white" };
};

export default function Problem({ tags, name, rating, id, index, max }) {
  console.log(max);
  return (
    <a
      target="_blank"
      href={`https://codeforces.com/problemset/problem/${id}/${index}`}
      className="problem"
      key={name}
      rel="noreferrer"
    >
      <p className="problem-title">{name}</p>
      <p style={dynamicStyleRating(rating, max)}>{rating}</p>
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
