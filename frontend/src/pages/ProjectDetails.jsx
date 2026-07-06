import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";

import DashboardLayout from "../layouts/DashboardLayout";
import TaskCard from "../components/task/TaskCard";
import TaskModal from "../components/task/TaskModal";
import KanbanBoard from "../components/kanban/KanbanBoard";
import toast from "react-hot-toast";

function ProjectDetails() {

    const { projectId } = useParams();
    const { workspaceId } = useParams();
    const [tasks, setTasks] = useState([]);
    const [openTaskModal, setOpenTaskModal] = useState(false);
    const [view, setView] = useState("list");
    const [editingTask, setEditingTask] = useState(null);
    const [statusFilter, setStatusFilter] = useState("All");
    const filteredTasks =
    statusFilter === "All"
        ? tasks
        : tasks.filter(
            task => task.status === statusFilter
        );

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

                toast.success(
                    editingTask
                        ? "Task updated successfully!"
                        : "Task created successfully!"
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

            toast.error(
                err.response?.data?.message ||
                "Failed to save task"
            );

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

            toast.success("Task deleted successfully!");

            setTasks(prev =>
                prev.filter(task => task._id !== taskId)
            );

        } catch (err) {

            toast.error(
                "Failed to delete task"
            );

        }

    };

    const handleStatusChange = async (taskId, currentStatus) => {

        const nextStatus = {

            "Todo": "In Progress",
            "In Progress": "Review",
            "Review": "Done",
            "Done": "Done",

        };

        if (currentStatus === "Done") return;

        try {

            await api.patch(

                `/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}/status`,

                {
                    status: nextStatus[currentStatus],
                }

            );

            setTasks(prev =>

                prev.map(task =>

                    task._id === taskId
                        ? {
                            ...task,
                            status: nextStatus[currentStatus],
                        }
                        : task

                )

            );

            toast.success("Status updated");

        }

        catch (err) {

            toast.error("Failed to update status");

        }

    };

    return (

        <DashboardLayout
            title="Project"
            subtitle="Manage tasks inside this project.">

            <div className="flex flex-wrap items-center justify-between gap-4">

                    <div className="flex items-center gap-4">

                        <div>

                            <h2 className="text-3xl font-bold">

                                Project Tasks

                            </h2>

                            <p className="text-slate-500">

                                Switch between List and Kanban Board view.

                            </p>

                        </div>

                        <div className="flex rounded-xl border border-slate-300 bg-white p-1 shadow-sm">

                            <button
                                onClick={() => setView("list")}
                                className={`rounded-lg px-5 py-2 font-medium transition ${
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

                <div className="mt-6">

                    <select
                        value={statusFilter}
                        onChange={(e)=>setStatusFilter(e.target.value)}
                        className="rounded-lg border p-3"
                    >

                        <option>All</option>
                        <option>Todo</option>
                        <option>In Progress</option>
                        <option>Review</option>
                        <option>Done</option>

                    </select>

                </div>

            {view === "list" ? (

                <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

                    {filteredTasks.length === 0 ? (

                        <div className="col-span-full rounded-2xl bg-white p-10 text-center shadow">

                            <h2 className="text-2xl font-bold">
                                {statusFilter === "All"
                                    ? "No Tasks Yet"
                                    : `No ${statusFilter} Tasks`}
                            </h2>

                            <p className="mt-2 text-slate-500">

                                Create your first task to get started.

                            </p>

                        </div>

                    ) : (

                        filteredTasks.map(task => (

                            <TaskCard
                                key={task._id}
                                task={task}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />

                        ))

                    )
                }

                </div>

            ) : (

                <KanbanBoard
                    tasks={tasks}
                    onMove={handleStatusChange}
                />

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