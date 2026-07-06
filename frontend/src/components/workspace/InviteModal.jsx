import { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

function InviteModal({ open, onClose, workspaceId }) {

    const [username, setUsername] = useState("");
    const [role, setRole] = useState("Member");

    if (!open) return null;

    const invite = async () => {

        try {

            await api.post(

                `/workspaces/${workspaceId}/invitations`,

                {
                    username,
                    role,
                }

            );

            toast.success("Invitation sent successfully!");

            onClose();

        }

        catch(err){

            toast.error(
                err.response?.data?.message ||
                "Failed to send invitation"
            );

        }

    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="w-full max-w-md rounded-2xl bg-white p-8">

                <h2 className="mb-6 text-2xl font-bold">

                    Invite Member

                </h2>

                <input

                    placeholder="Username"

                    value={username}

                    onChange={(e)=>
                        setUsername(e.target.value)
                    }

                    className="mb-4 w-full rounded-lg border p-3"

                />

                <select

                    value={role}

                    onChange={(e)=>
                        setRole(e.target.value)
                    }

                    className="mb-6 w-full rounded-lg border p-3"

                >

                    <option>Admin</option>

                    <option>Member</option>

                    <option>Viewer</option>

                </select>

                <div className="flex justify-end gap-3">

                    <button

                        onClick={onClose}

                        className="rounded-lg border px-5 py-2"

                    >

                        Cancel

                    </button>

                    <button

                        onClick={invite}

                        className="rounded-lg bg-blue-600 px-5 py-2 text-white"

                    >

                        Send

                    </button>

                </div>

            </div>

        </div>

    );

}

export default InviteModal;