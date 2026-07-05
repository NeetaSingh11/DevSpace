import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";
import ProjectCard from "../components/project/ProjectCard";
import ProjectModal from "../components/project/ProjectModal";
import MembersPanel from "../components/workspace/MembersPanel";

function WorkspaceDetails() {

    const { workspaceId } = useParams();
    const [workspace, setWorkspace] = useState(null);
    const [projects, setProjects] = useState([]);
    const [openProjectModal, setOpenProjectModal] = useState(false);

    useEffect(() => {

        const fetchWorkspace = async () => {

            try {

                const res = await api.get(`/workspaces/${workspaceId}`);

                setWorkspace(res.data.data);
                const projectRes = await api.get(
                    `/workspaces/${workspaceId}/projects`
                );

                setProjects(projectRes.data.data);

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

    const createProject = async (projectData) => {

        try {

            const res = await api.post(
                `/workspaces/${workspaceId}/projects`,
                projectData
            );

            setProjects(prev => [
                ...prev,
                res.data.data,
            ]);

            setOpenProjectModal(false);

        } catch (err) {

            console.log(err);

        }

    };

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

            <div className="mt-10 flex items-center justify-between">

                <h2 className="text-3xl font-bold">
                    Projects
                </h2>

                <button
                    onClick={() => setOpenProjectModal(true)}
                    className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">
                    + New Project
                </button>

            </div>

            <div className="mt-6 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

                {projects.map((project) => (

                    <ProjectCard
                        key={project._id}
                        project={project}
                    />

                ))}

            </div>

            <ProjectModal
                open={openProjectModal}
                onClose={() => setOpenProjectModal(false)}
                onCreate={createProject}
            />

            <MembersPanel
                workspace={workspace}
                onInvite={() => {}}
            />

        </DashboardLayout>

    );

}

export default WorkspaceDetails;