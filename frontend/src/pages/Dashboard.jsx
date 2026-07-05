import { useEffect, useState } from "react";

import api from "../services/api";

import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/ui/StatCard";

function Dashboard() {

    const [stats, setStats] = useState({
        total: 0,
        todo: 0,
        inProgress: 0,
        review: 0,
        done: 0,
    });

    useEffect(() => {

        const fetchStats = async () => {

            try {

                const res = await api.get("/tasks/dashboard/stats");

                setStats(res.data.data);

            } catch (err) {

                console.log(err);

            }

        };

        fetchStats();

    }, []);

    return (

        <DashboardLayout
            title="Dashboard"
            subtitle="Overview of your workspace."
        >

            {/* <div className="mb-8">

                <h1 className="text-4xl font-bold">
                    Dashboard
                </h1>

                <p className="mt-2 text-slate-500">
                    Overview of your workspace.
                </p>

            </div> */}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">

                <StatCard
                    title="Total Tasks"
                    value={stats.total}
                />

                <StatCard
                    title="Todo"
                    value={stats.todo}
                />

                <StatCard
                    title="In Progress"
                    value={stats.inProgress}
                />

                <StatCard
                    title="Review"
                    value={stats.review}
                />

                <StatCard
                    title="Completed"
                    value={stats.done}
                />

            </div>

        </DashboardLayout>

    );

}

export default Dashboard;