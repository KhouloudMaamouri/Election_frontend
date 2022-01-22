import { useState } from "react";
import Navbar from "./navbar/Navbar";
import SideBar from "./sidebar/SideBar";

const Layout = ({children}) => {
    const [visibleDrawer, setVisibleDrawer] = useState()

    const showDrawer = () => {
        setVisibleDrawer(true)
    };

    return (
        <div className='layout'>
            <Navbar showDrawer={showDrawer} />
            <div className="hero">
                <SideBar visibleDrawer={visibleDrawer} setVisibleDrawer={setVisibleDrawer} />
                <div className='content'>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Layout;