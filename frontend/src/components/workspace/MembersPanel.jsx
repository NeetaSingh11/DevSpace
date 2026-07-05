import { FiUser, FiUserPlus } from "react-icons/fi";

function MembersPanel({ workspace, onInvite }) {

    return (

        <div className="mt-10 rounded-2xl bg-white p-6 shadow">

            <div className="mb-6 flex items-center justify-between">

                <h2 className="text-2xl font-bold">

                    Members

                </h2>

                <button
                    onClick={onInvite}
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >

                    <FiUserPlus />

                    Invite

                </button>

            </div>

            <div className="space-y-4">

                {workspace.members.map(member => (

                    <div
                        key={member.user?._id || member.user}
                        className="flex items-center justify-between rounded-xl border p-4"
                    >

                        <div className="flex items-center gap-4">

                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-bold text-white">

                                {member.user?.name?.charAt(0) || "?"}

                            </div>

                            <div>

                                <p className="font-semibold">

                                    {member.user?.name || "Unknown User"}

                                </p>

                                <p className="text-sm text-slate-500">

                                    {member.user?.email || "No email"}

                                </p>

                            </div>

                        </div>

                        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">

                            {member.role}

                        </span>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default MembersPanel;