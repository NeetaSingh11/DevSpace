import { useLocation, useNavigate } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

function DashboardLayout({children, title, subtitle,}) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleBack = () => {

        const path = location.pathname;

        if (path === "/dashboard") return;

        if (path === "/workspaces") {
            navigate("/dashboard");
            return;
        }

        const projectMatch = path.match(
            /^\/workspaces\/([^/]+)\/projects\/([^/]+)$/
        );

        if (projectMatch) {
            navigate(`/workspaces/${projectMatch[1]}`);
            return;
        }

        const workspaceMatch = path.match(
            /^\/workspaces\/([^/]+)$/
        );

        if (workspaceMatch) {
            navigate("/workspaces");
            return;
        }

        navigate("/dashboard");

    };

    return (

        <div className="flex h-screen bg-slate-100">

            <Sidebar />

            <div className="flex flex-1 flex-col overflow-hidden">

                <Navbar
                    title={title}
                    subtitle={subtitle}
                />

                <main className="flex-1 overflow-y-auto bg-slate-50 p-10">

                    {title !== "Dashboard" && (
                        <button
                            onClick={handleBack}
                            className="mb-6 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium transition hover:bg-slate-100"
                        >
                            ← Back
                        </button>
                    )}

                    {children}

                </main>

            </div>

        </div>

    );

}

export default DashboardLayout;