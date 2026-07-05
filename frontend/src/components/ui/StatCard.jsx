import {
    FiClipboard,
    FiClock,
    FiLoader,
    FiEye,
    FiCheckCircle,
} from "react-icons/fi";

function StatCard({ title, value }) {

    const config = {

        "Total Tasks": {
            icon: <FiClipboard size={24} />,
            color: "bg-blue-100 text-blue-600",
            subtitle: "All tasks",
        },

        Todo: {
            icon: <FiClock size={24} />,
            color: "bg-yellow-100 text-yellow-600",
            subtitle: "Pending work",
        },

        "In Progress": {
            icon: <FiLoader size={24} />,
            color: "bg-indigo-100 text-indigo-600",
            subtitle: "Currently active",
        },

        Review: {
            icon: <FiEye size={24} />,
            color: "bg-orange-100 text-orange-600",
            subtitle: "Waiting approval",
        },

        Completed: {
            icon: <FiCheckCircle size={24} />,
            color: "bg-green-100 text-green-600",
            subtitle: "Finished tasks",
        },

    };

    const item = config[title];

    return (

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm font-medium text-slate-500">
                        {title}
                    </p>

                    <h2 className="mt-3 text-4xl font-bold text-slate-800">
                        {value}
                    </h2>

                    <p className="mt-2 text-sm text-slate-400">
                        {item.subtitle}
                    </p>

                </div>

                <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.color}`}
                >
                    {item.icon}
                </div>

            </div>

        </div>

    );

}

export default StatCard;