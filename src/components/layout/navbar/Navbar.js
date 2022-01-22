import "./navbar.css"
import { LogoutOutlined, MenuOutlined } from '@ant-design/icons'
import { Navigate } from "react-router-dom";

const Navbar = ({ showDrawer }) => {
  return (
    <div className="navbar">
      <div className='logoSidebar'>
      SofiaTeam
      </div>

      <div className='logoMobile'>
        <div className='drawerMobile' onClick={showDrawer}>
          <MenuOutlined />
        </div>
        <p className='logoImg'></p>
      </div>

      <div className='navbar__elements'>
       
        <LogoutOutlined onClick={() => {
          localStorage.removeItem('token')
          window.location.reload()
        }} className='logout__Icon' />
      </div>
    </div>
  );
}

export default Navbar;