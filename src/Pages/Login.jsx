import { useState } from "react";
import { loginUser } from "../Services/authService";
import "./Login.css"

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmmit = async (e) => {
    e.preventDefault();

    try {
  console.log("BUTTON CLICKED");

  const data = await loginUser(formData);

  localStorage.setItem("token", data.token);
localStorage.setItem("user", JSON.stringify(data));
  console.log("Token Saved");
} catch (error) {
  console.log("ERROR", error.response?.data);
}
  };



  return (
    <div className="auth-container">
      <h1 className="auth-title">Welcome Back</h1>

      <form onSubmit={handleSubmmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <br />

        <button type="submit">Login</button>
      </form>
      <button
  onClick={() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log("Logged Out");
  }}
>
  Logout
</button>
    </div>
  );
}

export default Login;