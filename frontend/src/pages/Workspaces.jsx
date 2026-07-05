import { useEffect, useState } from "react";

import api from "../services/api";

import DashboardLayout from "../layouts/DashboardLayout";

import WorkspaceCard from "../components/workspace/WorkspaceCard";
import WorkspaceHeader from "../components/workspace/WorkspaceHeader";
import WorkspaceModal from "../components/workspace/WorkspaceModal";

function Workspaces() {

    const [workspaces, setWorkspaces] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {

        const fetchWorkspaces = async () => {

            try {

                const res = await api.get("/workspaces");

                setWorkspaces(res.data.data);

            } catch (err) {

                console.log(err);

            }

        };

        fetchWorkspaces();

    }, []);

    const createWorkspace = async (workspaceData) => {

        try {

            const res = await api.post(
                "/workspaces",
                workspaceData
            );

            setWorkspaces(prev => [
                ...prev,
                res.data.data,
            ]);

            setOpenModal(false);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <DashboardLayout
            title="Workspaces"
            subtitle="Manage all your workspaces from one place."
        >

            <div className="mb-8 flex justify-end">

                <button
                    onClick={() => setOpenModal(true)}
                    className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                    + New Workspace
                </button>

            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                {workspaces.map((workspace) => (

                    <WorkspaceCard
                        key={workspace._id}
                        workspace={workspace}
                    />

                ))}

            </div>
            <WorkspaceModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onCreate={createWorkspace}
            />

        </DashboardLayout>

    );

}

export default Workspaces;