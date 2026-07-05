import { useNavigate } from "react-router-dom";

function WorkspaceCard({ workspace }) {
    const navigate = useNavigate();

    return (

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-center justify-between">

                <h2 className="text-2xl font-bold text-slate-800">
                    📁 {workspace.name}
                </h2>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                    Active
                </span>

            </div>

            <p className="mt-4 text-slate-600">
                {workspace.description}
            </p>

            <div className="mt-6 flex items-center justify-between border-t pt-4">

                <span className="text-sm text-slate-500">
                    👥 {workspace.members.length} Members
                </span>

                <span className="text-sm font-medium text-slate-500">
                    Created by You
                </span>

            </div>

            <button
                onClick={() =>
                    navigate(`/workspaces/${workspace._id}`)
                }
                className="mt-6 w-full rounded-xl border border-blue-600 py-3 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white">
                Open Workspace →
            </button>

        </div>

    );

}

export default WorkspaceCard;