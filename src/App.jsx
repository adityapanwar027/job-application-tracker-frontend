import Login from "./Pages/Login";
import Dashbord from "./Pages/Dashbord";

function App() {
  const token = localStorage.getItem("token");

  return token ? <Dashbord /> : <Login />;
}

export default App;