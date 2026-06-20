import { useState } from "react";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashbord from "./Pages/Dashbord";

function App() {
  const token = localStorage.getItem("token");
  const [showRegister, setShowRegister] = useState(false);

  if (token) {
    return <Dashbord />;
  }

  return (
    <div>
      {showRegister ? <Register /> : <Login />}

      <br />

      <button onClick={() => setShowRegister(!showRegister)}>
        {showRegister ? "Go to Login" : "Go to Register"}
      </button>
    </div>
  );
}

export default App;