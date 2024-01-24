import { Link } from "react-router-dom";
import "./styles/Home.css";

export default function Home() {
  return (
    <main className="main-container">
      <Link className="link" to="/KyhosCrusher">
        KyhosCrusher
      </Link>
      <Link className="link" to="/Eckry">
        Eckry
      </Link>
      <Link className="link" to="/Wyoming">
        Wyoming
      </Link>
    </main>
  );
}
