import { Link } from "react-router-dom";
import "./styles/Home.css";

export default function Home() {
  return (
    <main className="main-container">
      <Link className="link" to="/Eckry">
        <img src="./erick.webp" alt="" />
      </Link>
      <Link className="link" to="/KyhosCrusher">
        <img src="./esteban.webp" alt="" />
      </Link>
      <Link className="link" to="/AbnGrp">
        <img src="./diego.webp" alt="" />
      </Link>
    </main>
  );
}
