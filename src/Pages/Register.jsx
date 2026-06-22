import { useState } from "react";
import { registerUser } from "../Services/authService";
import "./Register.css";

function Register() {
  const [formDate, setformDate] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setformDate({
      ...formDate,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmmit = async (e) => {
    e.preventDefault();

    try {
      const data = await registerUser(formDate);
      console.log(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
   <div className="auth-container">
      <h1 className="auth-title">Create Account</h1>

      <form onSubmit={handleSubmmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formDate.name}
          onChange={handleChange}
        />
        <br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formDate.email}
          onChange={handleChange}
        />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formDate.password}
          onChange={handleChange}
        />
        <br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;