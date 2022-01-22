import "./sidebar.css";
import { Drawer, Menu } from "antd";
import { MailOutlined, PieChartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

const SideBar = ({ visibleDrawer, setVisibleDrawer }) => {
  const onClose = () => {
    setVisibleDrawer(false);
  };

  

  return (
    <div className="sidebar">
      <Menu
        /* onClick={handleClick} */
        style={{ width: 261 }}
        className="menuSidebar"
        mode="inline"
      >
       {/*  {JSON.parse(localStorage.getItem("token")).role === "exploitation" && (
          <Menu.Item key="10" icon={<PieChartOutlined />}>
            <Link to="/dashboard">Home</Link>
          </Menu.Item>
        )}
        {JSON.parse(localStorage.getItem("token")).role === "exploitation" && (
          <Menu.Item key="12" icon={<PieChartOutlined />}>
            <Link to="/dashboard-employee">Employee Chart</Link>
          </Menu.Item>
        )}
        <Menu.Item key="2" icon={<PieChartOutlined />}>
          <Link to="/timesheet">Timesheet</Link>
        </Menu.Item>
        {JSON.parse(localStorage.getItem("token")).role === "exploitation" && (
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to="/employe">Employee</Link>
          </Menu.Item>
        )} */}

        <Menu.Item key="3" icon={<PieChartOutlined />}>
          <Link to="/home">Home</Link>
        </Menu.Item>
        {JSON.parse(localStorage.getItem("token")).roles ===
            "admin" && (
              <Menu.Item key="4" icon={<PieChartOutlined />}>
              <Link to="/users">Users</Link>
            </Menu.Item>
          )}
      </Menu>

      {/*  Drawer for mobile */}
      <Drawer
        placement={"left"}
        closable={false}
        onClose={onClose}
        visible={visibleDrawer}
        key={"left"}
        width={"261px"}
        className="navbarDrawer"
      >
        <div className="logoSidebar">Logo</div>
        <Menu
          /* onClick={handleClick} */
          style={{ width: 261.4 }}
          className="menuSidebarDrawer"
          mode="inline"
        >
        {/*   {JSON.parse(localStorage.getItem("token")).role ===
            "exploitation" && (
            <Menu.Item key="10" icon={<PieChartOutlined />}>
              <Link to="/dashboard">Home</Link>
            </Menu.Item>
          )}
          {JSON.parse(localStorage.getItem("token")).role ===
            "exploitation" && (
            <Menu.Item key="12" icon={<PieChartOutlined />}>
              <Link to="/dashboard">Employee Chart</Link>
            </Menu.Item>
          )}
          <Menu.Item key="2" icon={<PieChartOutlined />}>
            <Link to="/timesheet">Timesheet</Link>
          </Menu.Item>
          {JSON.parse(localStorage.getItem("token")).role ===
            "exploitation" && (
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              <Link to="/employe">Employee</Link>
            </Menu.Item>
          )} */}
          <Menu.Item key="3" icon={<PieChartOutlined />}>
            <Link to="/home">Home</Link>
          </Menu.Item>
          {JSON.parse(localStorage.getItem("token")).roles ===
            "admin" && (
              <Menu.Item key="4" icon={<PieChartOutlined />}>
              <Link to="/users">Users</Link>
            </Menu.Item>
          )}
         
        </Menu>
      </Drawer>
    </div>
  );
};

export default SideBar;
