import { useEffect, useState } from "react";
import api from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";
import StatusPieChart from "../components/dashboard/StatusPieChart";
import PriorityBarChart from "../components/dashboard/PriorityBarChart";
import RecentActivity from "../components/dashboard/RecentActivity";

import {
    FiFolder,
    FiGrid,
    FiCheckCircle,
    FiUsers,
} from "react-icons/fi";

function Dashboard() {

    const [stats, setStats] = useState({
        workspaces: 0,
        projects: 0,
        tasks: 0,
        members: 0,
        status: [],
        priority: [],
        activities: [],
    });

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const res = await api.get("/dashboard");

                const data = res.data.data;

                setStats({

                    workspaces: data.workspaces,

                    projects: data.projects,

                    tasks: data.tasks,

                    members: data.members,

                    status: data.status,

                    priority: data.priority,

                    activities: data.activities,

                });

            }

            catch (err) {

                console.log(err);

            }

        };

        fetchDashboard();

    }, []);

    const cards = [

        {
            title: "Workspaces",
            value: stats.workspaces,
            icon: <FiFolder size={28} />,
            color: "bg-blue-100 text-blue-600",
        },

        {
            title: "Projects",
            value: stats.projects,
            icon: <FiGrid size={28} />,
            color: "bg-green-100 text-green-600",
        },

        {
            title: "Tasks",
            value: stats.tasks,
            icon: <FiCheckCircle size={28} />,
            color: "bg-yellow-100 text-yellow-600",
        },

        {
            title: "Members",
            value: stats.members,
            icon: <FiUsers size={28} />,
            color: "bg-purple-100 text-purple-600",
        },

    ];

    return (

        <DashboardLayout
            title="Dashboard"
            subtitle="Workspace Analytics"
        >

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                {

                    cards.map(card => (

                        <div
                            key={card.title}
                            className="rounded-2xl bg-white p-6 shadow"
                        >

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-slate-500">

                                        {card.title}

                                    </p>

                                    <h2 className="mt-2 text-4xl font-bold">

                                        {card.value}

                                    </h2>

                                </div>

                                <div className={`rounded-xl p-4 ${card.color}`}>

                                    {card.icon}

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-2">

                <StatusPieChart
                    data={stats.status}/>

                <PriorityBarChart
                    data={stats.priority}/>

            </div>

            <div className="mt-8">

                <RecentActivity

                    activities={stats.activities}

                />

            </div>

        </DashboardLayout>

    );

}

export default Dashboard;