import {
    FiFolder,
    FiUsers,
    FiArrowRight,
    FiEdit2,
    FiTrash2,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function WorkspaceCard({ workspace, onEdit, onDelete, }) {
    const navigate = useNavigate();

    return (

        <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            {/* Header */}

            <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-blue-100 p-3 text-blue-600">

                        <FiFolder size={26} />

                    </div>

                    <div>

                        <h2 className="text-2xl font-bold text-slate-800">

                            {workspace.name}

                        </h2>

                        <p className="mt-1 text-slate-500">

                            {workspace.description}

                        </p>

                    </div>

                </div>

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-600">

                    Active

                </span>

            </div>

            {/* Info */}

            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">

                <div className="flex items-center gap-2 text-slate-500">

                    <FiUsers />

                    <span>

                        {workspace.members.length} Members

                    </span>

                </div>

                <span className="text-sm text-slate-400">

                    Created by You

                </span>

            </div>

            <div className="mt-6 flex gap-3">

                <button
                    onClick={() => onEdit(workspace)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 py-2 transition hover:bg-slate-100"
                >

                    <FiEdit2 />

                    Edit

                </button>

                <button
                    onClick={() => onDelete(workspace._id)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 py-2 text-red-600 transition hover:bg-red-50"
                >

                    <FiTrash2 />

                    Delete

                </button>

            </div>

            {/* Footer */}

            <button
                onClick={() => {

                    // alert("Button Clicked");

                    localStorage.setItem(
                        "workspaceId",
                        workspace._id
                    );

                    console.log("Saved:", workspace._id);

                    navigate(`/workspaces/${workspace._id}`);

                }}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
                Open Workspace
                <FiArrowRight />
            </button>

        </div>

    );

}

export default WorkspaceCard;