import { Link, useParams } from "react-router-dom";
import {
    FiFolder,
    FiClipboard,
    FiArrowRight,
} from "react-icons/fi";

function ProjectCard({ project }) {

    const { workspaceId } = useParams();

    return (

        <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">

                        <FiFolder size={24} />

                    </div>

                    <div>

                        <h2 className="text-2xl font-bold text-slate-800">

                            {project.name}

                        </h2>

                        <p className="mt-1 text-slate-500">

                            {project.description}

                        </p>

                    </div>

                </div>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-600">

                    Active

                </span>

            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">

                <div className="flex items-center gap-2 text-slate-500">

                    <FiClipboard />

                    <span>

                        Project

                    </span>

                </div>

            </div>

            <Link
                to={`/workspaces/${workspaceId}/projects/${project._id}`}
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >

                Open Project

                <FiArrowRight />

            </Link>

        </div>

    );

}

export default ProjectCard;