import KanbanColumn from "./KanbanColumn";

function KanbanBoard({ tasks }) {

    const todo = tasks.filter(t => t.status === "Todo");

    const progress = tasks.filter(
        t => t.status === "In Progress"
    );

    const review = tasks.filter(
        t => t.status === "Review"
    );

    const done = tasks.filter(
        t => t.status === "Done"
    );

    return (

        <div className="grid gap-6 xl:grid-cols-4">

            <KanbanColumn
                title="Todo"
                tasks={todo}
            />

            <KanbanColumn
                title="In Progress"
                tasks={progress}
            />

            <KanbanColumn
                title="Review"
                tasks={review}
            />

            <KanbanColumn
                title="Done"
                tasks={done}
            />

        </div>

    );

}

export default KanbanBoard;