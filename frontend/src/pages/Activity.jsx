import { useEffect, useState } from "react";
import api from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";
import ActivityCard from "../components/activity/ActivityCard";

function Activity() {

    const [activities, setActivities] = useState([]);

    useEffect(() => {

        const fetchActivities = async () => {

            try {

                // Temporary workspace ID
                const workspaceId =
                    localStorage.getItem("workspaceId");

                if (!workspaceId) return;

                const res = await api.get(
                    `/workspaces/${workspaceId}/activities`
                );

                setActivities(res.data.data);

            }

            catch (err) {

                console.log(err);

            }

        };

        fetchActivities();

    }, []);

    return (

        <DashboardLayout
            title="Activity"
            subtitle="Workspace timeline"
        >

            <div className="space-y-5">

                {

                    activities.length === 0 ?

                        (

                            <div className="rounded-2xl bg-white p-12 text-center shadow">

                                <h2 className="text-2xl font-bold">

                                    No Activity Yet

                                </h2>

                                <p className="mt-3 text-slate-500">

                                    Start creating workspaces, projects and tasks to see activity here.

                                </p>

                            </div>

                        )

                        :

                        (

                            activities.map(activity => (

                                <ActivityCard

                                    key={activity._id}

                                    activity={activity}

                                />

                            ))

                        )

                }

            </div>

        </DashboardLayout>

    );

}

export default Activity;