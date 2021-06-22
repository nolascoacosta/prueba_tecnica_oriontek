import { useContext } from 'react';
import Image from 'next/image'
import { useRouter } from 'next/router'
import AppContext from '../context/app/appContext'
import Link from 'next/link'
import PropTypes from "prop-types";

const SidebarRow = ({src, title, Icon, active, href, extraClassIcon = ""}) => {

    const router = useRouter()
    const appContext = useContext(AppContext);

    const handleClick = (e) => {
        e.preventDefault()
        router.push(href)
    }

    return (
        <div
            onClick={handleClick}
            className={`flex items-center space-x-2 mt-1 overflow-y-auto w-200
                    p-2 hover:bg-gray-50 rounded-xl cursor-pointer ${active && 'bg-gray-300'}`}>
            {
                src && (
                    <Image
                        className="rounded-full"
                        src={src}
                        width={30}
                        height={30}
                        layout="fixed"
                    />
                )
            }
            {
                Icon && (
                    <Icon
                        className={`h-8 w-8 text-green-500 ${extraClassIcon}`}
                        onClick={handleClick}
                    />
                )
            }
            {/* <p className={` ${state.openedMenu ? 'hidden sm:inline-flex' : ''} font-medium`}>{ title }</p>*/}
            <Link href={href}>
                <p className={`${appContext.openedMenu ? 'inline-flex' : 'hidden'} font-medium`}>{ title } </p>
            </Link>


        </div>
    );
};

SidebarRow.propTypes = {
    href: PropTypes.string.isRequired,
}

export default SidebarRow;
