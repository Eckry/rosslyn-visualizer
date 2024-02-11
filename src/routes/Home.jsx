import { Link } from "react-router-dom";
import "./styles/Home.css";

export default function Home() {
  return (
    <main className="main-container">
      <Link className="link erick" to="/Eckry">
        Eckry
      </Link>
      <Link className="link estebanP" to="/KyhosCrusher">
        KyhosCrusher
      </Link>
      <Link className="link estebanS" to="/Wyoming">
        Wyoming
      </Link>
    </main>
  );
}
