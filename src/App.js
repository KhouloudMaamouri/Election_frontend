import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import TimeSheet from "./pages/TimeSheet";
import CreateEmploye from "./pages/CreateEpmloye";
import CreateTimeSheet from "./pages/CreateTimeSheet";
import Notification from "./pages/Notification";
import ChartTravisits from "./pages/ChartTravisits";
import ChartEmployee from "./pages/ChartEmployee";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Users from "./pages/Users";
import CreateUser from "./pages/CreateUser";

function App() {
  return (
    <div className="App">
      <Routes>
      {/*   <Route path="/employe" element={<Dashboard />} />
        <Route path="/notification" element={<Notification />} /> */}
        <Route path="/create-employe" element={<CreateEmploye />} />
        <Route path="/create-timesheet" element={<CreateTimeSheet />} />
        {/* <Route path="/timesheet" element={<TimeSheet />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/signup" element={<SignUp />} />
      {/*   <Route path="/dashboard" element={<ChartTravisits />} />
        <Route path="/dashboard-employee" element={<ChartEmployee />} /> */}
      </Routes>
    </div>
  );
}

export default App;
