import { FiFlag } from "react-icons/fi";

function KanbanTask({ task }) {

    const colors = {
        High: "bg-red-100 text-red-700",
        Medium: "bg-yellow-100 text-yellow-700",
        Low: "bg-green-100 text-green-700",
    };

    return (

        <div className="mb-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

            <h3 className="font-semibold">
                {task.title}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
                {task.description}
            </p>

            <div className="mt-4 flex justify-end">

                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${colors[task.priority]}`}
                >
                    <FiFlag className="mr-1 inline" />
                    {task.priority}
                </span>

            </div>

        </div>

    );

}

export default KanbanTask;