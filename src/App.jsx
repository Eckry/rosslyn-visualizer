import "./App.css";
import User from "./components/User";
import Home from "./routes/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/:user",
    element: <User />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
