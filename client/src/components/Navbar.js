import {useState} from "react";
import {NavLink} from "react-router-dom";
import menus from '../menus'

function Navbar() {
    const [openMenu, setOpenMenu] = useState(false);

    const changeTheme = () => {
        window.document.documentElement.classList.toggle("dark")
    }

    return (
        <>
            <nav className="dark:bg-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <h1 className="text-dark text-[1.5rem] dark:text-light">KOS</h1>
                            </div>
                            {menus.map((menu) => {
                                return (
                                    <div className="hidden md:block" key={menu.id}>
                                        <div className="ml-10 flex items-baseline space-x-2">
                                            <NavLink to={menu.path}
                                                     className="text-dark block dark:text-light rounded-md text-base font-medium">{menu.name}</NavLink>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6">

                                <button className="dark:text-light" onClick={() => {
                                    changeTheme()
                                }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8V16Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4V8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16V20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </button>

                                <button type="button" className="button ml-5">Create Cluster</button>
                            </div>
                        </div>

                        <div className="-mr-2 flex md:hidden">
                            <button type="button"
                                    onClick={() => setOpenMenu(!openMenu)}
                                    className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                    aria-controls="mobile-menu" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>

                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M4 6h16M4 12h16M4 18h16"/>
                                </svg>

                                <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {openMenu === true && <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <NavLink to="/" activeClassName="bg-gray-900"
                                 className="text-white block px-3 py-2 rounded-md text-base font-medium">Dashboard</NavLink>
                        <button className="button ml-5">Create Cluster</button>
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-700">
                        <div className="mt-3 px-2 space-y-1">
                            {menus.map((menu) => {
                                return (
                                    <NavLink key={menu.id} to={menu.path}
                                             className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-70">{menu.name}</NavLink>
                                )
                            })}
                        </div>
                    </div>
                </div>
                }
            </nav>


        </>
    )
}

export default Navbar
