import { useState } from "react";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashbord from "./Pages/Dashbord";
import "./App.css";

function App() {
  const token = localStorage.getItem("token");
  const [showRegister, setShowRegister] = useState(false);

  if (token) {
    return <Dashbord />;
  }

  return (
    <div className="auth-wrapper">
      {showRegister ? <Register /> : <Login />}

      <button
        className="switch-auth-btn"
        onClick={() => setShowRegister(!showRegister)}
      >
        {showRegister ? "Go to Login" : "Go to Register"}
      </button>
    </div>
  );
}

export default App;