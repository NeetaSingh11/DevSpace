import { useState, useEffect } from "react";

function TaskModal({
    open,
    onClose,
    onCreate,
    task,
}) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Medium");

    useEffect(() => {

        if (task) {

            setTitle(task.title);
            setDescription(task.description);
            setPriority(task.priority);

        } else {

            setTitle("");
            setDescription("");
            setPriority("Medium");

        }

    }, [task, open]);

    if (!open) return null;

    const handleSubmit = (e) => {

        e.preventDefault();

        onCreate({
            title,
            description,
            priority,
        });

    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl">

                <h2 className="mb-6 text-2xl font-bold">

                    {task ? "Edit Task" : "Create Task"}

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        type="text"
                        placeholder="Task Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded-lg border p-3"
                        required
                    />

                    <textarea
                        rows="4"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full rounded-lg border p-3"
                    />

                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="w-full rounded-lg border p-3"
                    >

                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>

                    </select>

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border px-5 py-2"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-5 py-2 text-white"
                        >

                            {task ? "Update" : "Create"}

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default TaskModal;