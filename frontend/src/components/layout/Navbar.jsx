import { FiBell, FiSearch } from "react-icons/fi";

function Navbar({
    title = "Dashboard",
    subtitle = "Welcome back 👋",
}) {

    const user = JSON.parse(localStorage.getItem("user"));

    return (

        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4">

            {/* Left */}

            <div>

                <h1 className="text-3xl font-bold text-slate-800">
                    {title}
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    {subtitle}
                </p>

            </div>

            {/* Right */}

            <div className="flex flex-wrap items-center gap-4">

                {/* Search */}

                <div className="hidden md:flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2">

                    <FiSearch className="text-slate-500" />

                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent outline-none"
                    />

                </div>

                {/* Notification */}

                <button className="rounded-full bg-slate-100 p-3 transition hover:bg-slate-200">

                    <FiBell size={20} />

                </button>

                {/* User */}

                <div className="flex items-center gap-3">

                    <div className="text-right">

                        <p className="font-semibold text-slate-800">

                            {user?.name}

                        </p>

                        <p className="text-sm text-slate-500">

                            {user?.email}

                        </p>

                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white shadow">

                        {user?.name?.charAt(0).toUpperCase()}

                    </div>

                </div>

            </div>

        </header>

    );

}

export default Navbar;