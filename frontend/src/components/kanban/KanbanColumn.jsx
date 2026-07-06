import KanbanTask from "./KanbanTask";

function KanbanColumn({ title, tasks, onMove, }) {

    return (

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">

            <div className="mb-5 flex items-center justify-between">

                <h2 className="text-xl font-bold text-slate-800">

                    {title}

                </h2>

                <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">

                    {tasks.length}

                </span>

            </div>

            {tasks.length === 0 ? (

                <div className="mt-10 rounded-xl border-2 border-dashed border-slate-300 bg-white p-8 text-center text-slate-400">

                    No {title} Tasks

                </div>

            ) : (

                <div className="space-y-5">

                    {tasks.map(task => (

                        <KanbanTask
                            key={task._id}
                            task={task}
                            onMove={onMove}
                        />

                    ))}

                </div>

            )}

        </div>

    );

}

export default KanbanColumn;