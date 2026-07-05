import { useEffect, useState } from "react";
import api from "../../services/api";

function Navbar({title = "Dashboard", subtitle = "Welcome back 👋",}) {

    const [user, setUser] = useState(null);

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const res = await api.get("/auth/profile");

                setUser(res.data.data);

            } catch (err) {

                console.log(err);

            }

        };

        fetchProfile();

    }, []);

    return (

        <header className="flex h-20 items-center justify-between border-b bg-white px-10">

            <div>

                <h1 className="text-3xl font-bold">
                    {title}
                </h1>

                <p className="text-slate-500">
                    {subtitle}
                </p>

            </div>

            <div className="flex items-center gap-4 pr-4">

                <div className="text-right">

                    <p className="text-sm font-semibold">
                        {user?.name || "Loading..."}
                    </p>

                    <p className="text-xs text-slate-500">
                        {user?.email}
                    </p>

                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white shadow-md">

                    {user?.name?.charAt(0).toUpperCase()}

                </div>

            </div>

        </header>

    );

}

export default Navbar;