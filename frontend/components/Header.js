import { useContext } from "react";
import {useRouter} from "next/router";
import AppContext from "../context/app/appContext";
import AuthContext from "../context/auth/authContext";
import {
    LogoutIcon,
} from '@heroicons/react/solid';
import {
    MenuAlt1Icon
} from '@heroicons/react/outline';
const Header = () => {
  const router = useRouter();
  const appContext = useContext(AppContext);
  const authContext = useContext(AuthContext);

  const { toggleAppMenu } =  appContext;
  const { logoutUser } = authContext;

  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser();
  }

  return (
      <div className="sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md">
        <div className="flex items-center flex-grow">
          <MenuAlt1Icon
              onClick={() => toggleAppMenu() }
              className=" rounded-full cursor-pointer p-2 h-10 w-10 mr-2"
          />

          <p className="font-bold">ORION</p>

          <div className="rounded-full h-10 w-10 bg-green-500
        flex items-center justify-center text-white ml-1 ">
            <p className="font-bold">TEK</p>
          </div>
        </div>
        <div className="flex items-center sm:space-x-2 justify-end">
          {
            authContext.authenticated && (
                <LogoutIcon className="icon text-green-500"
                            onClick={(e) => handleLogout(e) }/>
            )
          }
        </div>
      </div>
  );
}


export default Header;
