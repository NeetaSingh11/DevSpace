import {
    FiCalendar,
    FiFlag,
    FiUser,
    FiEdit2,
    FiTrash2,
} from "react-icons/fi";

function TaskCard({ task, onEdit, onDelete, }) {

    const priorityColor = {

        Low: "bg-green-100 text-green-700",

        Medium: "bg-yellow-100 text-yellow-700",

        High: "bg-red-100 text-red-700",

    };
    
    <p className="text-sm text-slate-500">

    📅 {

    task.dueDate

    ? new Date(task.dueDate).toLocaleDateString()

    : "No Due Date"

    }

    </p>

    const statusColor = {

        Todo: "bg-slate-100 text-slate-700",

        "In Progress": "bg-blue-100 text-blue-700",

        Review: "bg-orange-100 text-orange-700",

        Done: "bg-green-100 text-green-700",

    };

    return (

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

            <div className="flex items-start justify-between">

                <h3 className="text-xl font-bold text-slate-800">

                    {

                        task.dueDate &&

                        new Date(task.dueDate) < new Date() &&

                        task.status !== "Done" && (

                        <span className="rounded bg-red-100 px-2 py-1 text-xs font-semibold text-red-600">

                        Overdue

                        </span>

                        )

                    }

                    {task.title}

                </h3>

                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityColor[task.priority]}`}
                >

                    <FiFlag className="mr-1 inline" />

                    {task.priority}

                </span>

            </div>

            <p className="mt-4 line-clamp-3 text-slate-500">

                {task.description}

            </p>

            {task.attachments?.length > 0 && (

        <div className="mt-4">

            <p className="mb-2 font-semibold">

                Attachments

            </p>

            { task.attachments.map((file, index) => (

                                <a

                                    key={index}

                                    href={`http://localhost:5000${file.fileUrl}`}

                                    target="_blank"

                                    rel="noreferrer"

                                    className="block text-blue-600 hover:underline"

                                >

                                    📎 {file.fileName}

                                </a>

                            ))

                        }

                    </div>

                )
            }

            <div className="mt-6 flex items-center justify-between">

                <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${statusColor[task.status]}`}
                >

                    {task.status}

                </span>

                <div className="flex items-center gap-2 text-slate-500">

                    <FiUser />

                    <span>

                        {task.assignedTo?.name || "Unassigned"}

                    </span>

                </div>

            </div>

            <div className="mt-5 flex items-center justify-between">

                <div className="flex items-center gap-2 text-sm text-slate-400">

                    <FiCalendar />

                    {new Date(task.createdAt).toLocaleDateString()}

                </div>

                <div className="flex gap-2">

                    <button
                        onClick={() => onEdit(task)}
                        className="rounded-lg p-2 hover:bg-slate-100"
                    >
                        <FiEdit2 />
                    </button>

                    <button
                        onClick={() => onDelete(task._id)}
                        className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                    >
                        <FiTrash2 />
                    </button>

                </div>

            </div>

        </div>

    );

}

export default TaskCard;