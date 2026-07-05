import { useEffect, useState } from "react";

import api from "../services/api";

import DashboardLayout from "../layouts/DashboardLayout";

import WorkspaceCard from "../components/workspace/WorkspaceCard";
import WorkspaceHeader from "../components/workspace/WorkspaceHeader";
import WorkspaceModal from "../components/workspace/WorkspaceModal";

function Workspaces() {

    const [workspaces, setWorkspaces] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [editingWorkspace, setEditingWorkspace] = useState(null);

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

            if (editingWorkspace) {

                const res = await api.put(
                    `/workspaces/${editingWorkspace._id}`,
                    workspaceData
                );

                setWorkspaces(prev =>
                    prev.map(ws =>
                        ws._id === editingWorkspace._id
                            ? res.data.data
                            : ws
                    )
                );

                setEditingWorkspace(null);

            } else {

                const res = await api.post(
                    "/workspaces",
                    workspaceData
                );

                setWorkspaces(prev => [
                    ...prev,
                    res.data.data,
                ]);

            }

            setOpenModal(false);

        } catch (err) {

            console.log(err);

        }

    };

    const handleEdit = (workspace) => {

        setEditingWorkspace(workspace);

        setOpenModal(true);

    };

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Delete this workspace?"
        );

        if (!confirmed) return;

        try {

            await api.delete(`/workspaces/${id}`);

            setWorkspaces(prev =>
                prev.filter(ws => ws._id !== id)
            );

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

            <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

                {workspaces.map((workspace) => (

                    <WorkspaceCard
                        key={workspace._id}
                        workspace={workspace}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                ))}

            </div>
            <WorkspaceModal
                open={openModal}
                workspace={editingWorkspace}
                onClose={() => {

                    setOpenModal(false);

                    setEditingWorkspace(null);

                }}
                onCreate={createWorkspace}
            />

        </DashboardLayout>

    );

}

export default Workspaces;