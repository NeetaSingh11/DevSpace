import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";

function WorkspaceDetails() {

    const { workspaceId } = useParams();

    const [workspace, setWorkspace] = useState(null);

    useEffect(() => {

        const fetchWorkspace = async () => {

            try {

                const res = await api.get(`/workspaces/${workspaceId}`);

                setWorkspace(res.data.data);

            } catch (err) {

                console.log(err);

            }

        };

        fetchWorkspace();

    }, [workspaceId]);

    if (!workspace) {

        return (

            <DashboardLayout
                title="Workspace"
                subtitle="Loading..."
            >

                <p>Loading...</p>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout
            title={workspace.name}
            subtitle={workspace.description}
        >

            <div className="rounded-2xl bg-white p-8 shadow">

                <div className="grid grid-cols-2 gap-8">

                    <div>

                        <p className="text-slate-500">
                            Members
                        </p>

                        <p className="mt-2 text-3xl font-bold">
                            {workspace.members.length}
                        </p>

                    </div>

                    <div>

                        <p className="text-slate-500">
                            Status
                        </p>

                        <p className="mt-2 text-3xl font-bold text-green-600">
                            Active
                        </p>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default WorkspaceDetails;