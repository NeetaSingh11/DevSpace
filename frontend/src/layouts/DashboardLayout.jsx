import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

function DashboardLayout({children, title, subtitle,}) {

    return (

        <div className="flex h-screen bg-slate-100">

            <Sidebar />

            <div className="flex flex-1 flex-col overflow-hidden">

                <Navbar
                    title={title}
                    subtitle={subtitle}
                />

                <main className="flex-1 overflow-y-auto p-8">

                    {children}

                </main>

            </div>

        </div>

    );

}

export default DashboardLayout;