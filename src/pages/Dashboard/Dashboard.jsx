import { useState } from "react";
import Sidebar from "../Dashboard/SideBar/Sidebar";
import "./Dashboard.css";
import Notifiaction from "./Notification/Notifiaction";
import { Outlet } from "react-router-dom";
import Support from "./Support/Support";

const Dashboard = ({ setDataFromParent }) => {
  const [dataFromChild, setDataFromChild] = useState(null);

  const handleChildData = (childData) => {
    setDataFromChild(childData);
    setDataFromParent(childData);
  };
  return (
    <>
      <div className="dashboard">
        <Notifiaction />
        <Sidebar onDataUpdate={handleChildData} />
        <Outlet />
        <Support />
      </div>
    </>
  );
};

export default Dashboard;
