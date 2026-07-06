import {
    FiFlag,
    FiCalendar,
} from "react-icons/fi";

function KanbanTask({ task, onMove, }) {

    const priorityColor = {

        High: "bg-red-100 text-red-700",

        Medium: "bg-yellow-100 text-yellow-700",

        Low: "bg-green-100 text-green-700",

    };

    return (

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

            <h3 className="text-lg font-bold text-slate-800">

                {task.title}

            </h3>

            <p className="mt-2 text-sm text-slate-500">

                {task.description}

            </p>

            {/* Priority & Due Date */}

            <div className="text-right">

                <p className="text-[11px] font-semibold uppercase text-slate-400">

                    Due Date

                </p>

                <div className="mt-1 flex items-center justify-end gap-1 text-sm text-slate-600">

                    <FiCalendar />

                    {
                        task.dueDate
                            ? new Date(task.dueDate).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })
                            : "N/A"
                    }

                </div>

            </div>

            {/* Status */}

            <div className="mt-4">

                <span className="text-xs text-slate-400">

                    Status

                </span>

                <div>

                    <span
                        className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                            task.status === "Done"
                                ? "bg-green-100 text-green-700"
                                : task.status === "Review"
                                ? "bg-purple-100 text-purple-700"
                                : task.status === "In Progress"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-700"
                        }`}
                    >
                        {task.status}
                    </span>

                </div>

            </div>

            {/* Button */}

            {

                task.status !== "Done" && (

                    <button

                        onClick={() =>
                            onMove(task._id, task.status)
                        }

                        className="mt-5 w-full rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white hover:bg-blue-700"

                    >

                        Move to Next →

                    </button>

                )

            }

        </div>

    );
}

export default KanbanTask;