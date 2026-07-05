import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";

import DashboardLayout from "../layouts/DashboardLayout";
import TaskCard from "../components/task/TaskCard";
import TaskModal from "../components/task/TaskModal";
import KanbanBoard from "../components/kanban/KanbanBoard";

function ProjectDetails() {

    const { projectId } = useParams();
    const { workspaceId } = useParams();
    const [tasks, setTasks] = useState([]);
    const [openTaskModal, setOpenTaskModal] = useState(false);
    const [view, setView] = useState("list");
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {

        const fetchTasks = async () => {

            try {

                const res = await api.get(
                    `/workspaces/${workspaceId}/projects/${projectId}/tasks`
                );

                setTasks(res.data.data.tasks);

            } catch (err) {

                console.log(err);

            }

        };

        fetchTasks();

    }, [workspaceId, projectId]);

    const createTask = async (taskData) => {

        try {

            if (editingTask) {

                const res = await api.put(
                    `/workspaces/${workspaceId}/projects/${projectId}/tasks/${editingTask._id}`,
                    taskData
                );

                setTasks(prev =>
                    prev.map(task =>
                        task._id === editingTask._id
                            ? res.data.data
                            : task
                    )
                );

                setEditingTask(null);

            } else {

                const res = await api.post(
                    `/workspaces/${workspaceId}/projects/${projectId}/tasks`,
                    taskData
                );

                setTasks(prev => [
                    res.data.data,
                    ...prev,
                ]);

            }

            setOpenTaskModal(false);

        } catch (err) {

            console.log(err);

        }

    };

    const handleEdit = (task) => {

        setEditingTask(task);

        setOpenTaskModal(true);

    };

    const handleDelete = async (taskId) => {

        const confirmed = window.confirm(
            "Delete this task?"
        );

        if (!confirmed) return;

        try {

            await api.delete(
                `/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`
            );

            setTasks(prev =>
                prev.filter(task => task._id !== taskId)
            );

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <DashboardLayout
            title="Project"
            subtitle="Manage tasks inside this project.">

            <div className="flex flex-wrap items-center justify-between gap-4">

                    <div className="flex items-center gap-4">

                        <h2 className="text-3xl font-bold">
                            Tasks
                        </h2>

                        <div className="flex rounded-xl border bg-white p-1">

                            <button
                                onClick={() => setView("list")}
                                className={`rounded-lg px-4 py-2 ${
                                    view === "list"
                                        ? "bg-blue-600 text-white"
                                        : ""
                                }`}
                            >
                                List
                            </button>

                            <button
                                onClick={() => setView("board")}
                                className={`rounded-lg px-4 py-2 ${
                                    view === "board"
                                        ? "bg-blue-600 text-white"
                                        : ""
                                }`}
                            >
                                Board
                            </button>

                        </div>

                    </div>

                    <button
                        onClick={() => setOpenTaskModal(true)}
                        className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                    >
                        + New Task
                    </button>

                </div>

            {view === "list" ? (

                <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

                    {tasks.map(task => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}

                </div>

            ) : (

                <div className="mt-8 rounded-xl bg-white p-8 text-center">
                    Board Coming Soon...
                </div>

            )}

            <TaskModal
                open={openTaskModal}
                task={editingTask}
                onClose={() => {

                    setOpenTaskModal(false);

                    setEditingTask(null);

                }}
                onCreate={createTask}
            />

        </DashboardLayout>

    );

}

export default ProjectDetails;