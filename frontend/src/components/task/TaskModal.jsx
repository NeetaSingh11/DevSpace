import { useState, useEffect } from "react";
import api from "../../services/api";

function TaskModal({
    open,
    onClose,
    onCreate,
    task,
}) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [attachment, setAttachment] = useState(null);
    const [dueDate, setDueDate] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (task) {

            setTitle(task.title);
            setDescription(task.description);
            setPriority(task.priority);
            setDueDate(
                task?.dueDate
                    ? task.dueDate.substring(0,10)
                    : ""
            );

        } else {

            setTitle("");
            setDescription("");
            setPriority("Medium");
            setDueDate("");

        }

    }, [task, open]);

    if (!open) return null;

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            let attachments = [];

            if (attachment) {

                const formData = new FormData();

                formData.append("file", attachment);

                const uploadRes = await api.post(

                    "/upload",

                    formData,

                    {

                        headers: {

                            "Content-Type":
                                "multipart/form-data",

                        },

                    }

                );

                attachments = [

                    uploadRes.data.data,

                ];

            }

            await onCreate({

                title,

                description,

                priority,

                attachments,

                dueDate,

            });

        }

        finally {

            setLoading(false);

        }

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

                    <div className="mt-4">

                        <label className="mb-2 block font-medium">

                            Attachment

                        </label>

                        <input

                            type="file"

                            onChange={(e) =>
                                setAttachment(e.target.files[0])
                            }

                            className="w-full rounded-lg border p-3"

                        />

                    </div>

                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="w-full rounded-lg border p-3"
                    >

                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>

                    </select>

                    <div>

                        <label className="mb-2 block font-medium">

                            Due Date

                        </label>

                        <input

                            type="date"

                            value={dueDate}

                            onChange={(e)=>setDueDate(e.target.value)}

                            className="w-full rounded-lg border p-3"

                        />

                    </div>

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
                            disabled={loading}
                            className="rounded-lg bg-blue-600 px-5 py-2 text-white"
                        >

                            {loading
                            ? "Saving..."
                            : task
                            ? "Update"
                            : "Create"}

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default TaskModal;