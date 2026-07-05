import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/");

    };

    return (

        <aside className="flex h-screen w-72 flex-col bg-slate-900 text-white">

            <div className="border-b border-slate-700 p-6">

                <h1 className="text-3xl font-bold">
                    DevSpace
                </h1>

            </div>

            <nav className="flex-1 overflow-y-auto p-5">

                <div className="space-y-3">

                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `block rounded-lg p-3 transition ${
                                isActive
                                    ? "bg-blue-600"
                                    : "hover:bg-slate-800"
                            }`
                        }
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/workspaces"
                        className={({ isActive }) =>
                            `block rounded-lg p-3 transition ${
                                isActive
                                    ? "bg-blue-600"
                                    : "hover:bg-slate-800"
                            }`
                        }
                    >
                        Workspaces
                    </NavLink>

                    <NavLink
                        to="/projects"
                        className={({ isActive }) =>
                            `block rounded-lg p-3 transition ${
                                isActive
                                    ? "bg-blue-600"
                                    : "hover:bg-slate-800"
                            }`
                        }
                    >
                        Projects
                    </NavLink>

                    <NavLink
                        to="/tasks"
                        className={({ isActive }) =>
                            `block rounded-lg p-3 transition ${
                                isActive
                                    ? "bg-blue-600"
                                    : "hover:bg-slate-800"
                            }`
                        }
                    >
                        Tasks
                    </NavLink>

                    <NavLink
                        to="/activity"
                        className={({ isActive }) =>
                            `block rounded-lg p-3 transition ${
                                isActive
                                    ? "bg-blue-600"
                                    : "hover:bg-slate-800"
                            }`
                        }
                    >
                        Activity
                    </NavLink>

                </div>

            </nav>

            <div className="mt-auto border-t border-slate-700 p-5">

                <button
                    onClick={logout}
                    className="w-full rounded-lg bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
                >
                    Logout
                </button>

            </div>

        </aside>

    );

}

export default Sidebar;