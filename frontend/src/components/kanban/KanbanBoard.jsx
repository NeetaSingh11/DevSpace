import KanbanColumn from "./KanbanColumn";

function KanbanBoard({ tasks, onMove, }) {

    const columns = {

        Todo: tasks.filter(
            task => task.status === "Todo"
        ),

        "In Progress": tasks.filter(
            task => task.status === "In Progress"
        ),

        Review: tasks.filter(
            task => task.status === "Review"
        ),

        Done: tasks.filter(
            task => task.status === "Done"
        ),

    };

    return (

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">

            {Object.entries(columns).map(

                ([title, tasks]) => (

                    <KanbanColumn
                        key={title}
                        title={title}
                        tasks={tasks}
                        onMove={onMove}
                    />

                )

            )}

        </div>

    );

}

export default KanbanBoard;