import { useState } from "react";

function ProjectModal({ open, onClose, onCreate }) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    if (!open) return null;

    const handleSubmit = (e) => {

        e.preventDefault();

        onCreate({
            name,
            description,
        });

        setName("");
        setDescription("");

    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="w-full max-w-md rounded-2xl bg-white p-8">

                <h2 className="mb-6 text-2xl font-bold">
                    Create Project
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        type="text"
                        placeholder="Project Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-lg border p-3"
                        required
                    />

                    <textarea
                        rows="4"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full rounded-lg border p-3"
                        required
                    />

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
                            Create
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default ProjectModal;