import KanbanTask from "./KanbanTask";

function KanbanColumn({
    title,
    tasks,
}) {

    return (

        <div className="min-h-[500px] rounded-2xl bg-slate-100 p-5">

            <div className="mb-5 flex items-center justify-between">

                <h2 className="text-xl font-bold">

                    {title}

                </h2>

                <span className="rounded-full bg-white px-3 py-1">

                    {tasks.length}

                </span>

            </div>

            {tasks.map(task => (

                <KanbanTask
                    key={task._id}
                    task={task}
                />

            ))}

        </div>

    );

}

export default KanbanColumn;