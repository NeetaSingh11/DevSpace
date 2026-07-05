import { NavLink, useNavigate } from "react-router-dom";

import {
    FiGrid,
    FiFolder,
    FiActivity,
    FiLogOut,
} from "react-icons/fi";

function Sidebar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/");

    };

    return (

        <aside className="flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-900 text-white">

            {/* Logo */}

            <div className="border-b border-slate-800 p-6">

                <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold">

                        D

                    </div>

                    <div>

                        <h1 className="text-2xl font-bold">
                            DevSpace
                        </h1>

                        <p className="text-xs text-slate-400">
                            Project Manager
                        </p>

                    </div>

                </div>

            </div>

            {/* Navigation */}

            <nav className="flex-1 px-4 py-6">

                <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-slate-400">

                    MENU

                </p>

                <div className="space-y-2">

                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                                isActive
                                    ? "bg-blue-600 text-white shadow"
                                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                            }`
                        }
                    >
                        <FiGrid size={20} />

                        Dashboard

                    </NavLink>

                    <NavLink
                        to="/workspaces"
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                                isActive
                                    ? "bg-blue-600 text-white shadow"
                                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                            }`
                        }
                    >
                        <FiFolder size={20} />

                        Workspaces

                    </NavLink>

                    <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-500">

                        <FiActivity size={20} />

                        <span>
                            Activity
                        </span>

                        <span className="ml-auto rounded-full bg-slate-700 px-2 py-1 text-[10px]">

                            Soon

                        </span>

                    </div>

                </div>

            </nav>

            {/* Logout */}

            <div className="border-t border-slate-800 p-5">

                <button
                    onClick={logout}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
                >

                    <FiLogOut size={18} />

                    Logout

                </button>

            </div>

        </aside>

    );

}

export default Sidebar;