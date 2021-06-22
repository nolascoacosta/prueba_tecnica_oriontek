import React, { useContext } from 'react';
import {
    HomeIcon,
    LoginIcon,
    UserAddIcon,
} from '@heroicons/react/outline';
import AppContext from "../context/app/appContext";
import AuthContext from "../context/auth/authContext";
import SidebarRow from "./SidebarRow";
import {useRouter} from "next/router";
const Sidebar = () => {
    const router = useRouter();
    const appContext = useContext(AppContext);
    const authContext = useContext(AuthContext);
    const  { authenticated, user } = authContext;

    const isRouteActive = (route) => {
        return route.split(",").includes(router.pathname)
    }
    return (
        <div className={`p-2 mt-0 max-w-[800px] xl:min-width-[500px] border-r-4 ${appContext.openedMenu ? '' : ''}`}>

            {
                authenticated && (
                    <>
                       {/* <SidebarRow Icon={HomeIcon} title="Dashboard" active={isRouteActive('/')} href="/" />*/}
                        <SidebarRow Icon={HomeIcon} title="Business" active href="/business" />
                    </>

                )
            }

            {
                user?.isAdmin && (
                    <SidebarRow Icon={HomeIcon} title="My Business" active={isRouteActive('/business/my-business')}
                                active={true}
                                href="/business/my-business" />
                )
            }

            {
                !authenticated && (
                    <>
                        <SidebarRow extraClassIcon="transform rotate-180" Icon={LoginIcon} title="Login" active={isRouteActive('/auth/login')} href="/auth/login" />
                        <SidebarRow Icon={UserAddIcon} title="Signup" active={isRouteActive('/auth/signup')} href="/auth/signup" />
                    </>
                )
            }

        </div>


    );

}
export default Sidebar;