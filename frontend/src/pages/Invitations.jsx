import { useEffect, useState } from "react";
import api from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";

function Invitations() {

    const [invitations, setInvitations] = useState([]);

    useEffect(() => {

        fetchInvitations();

    }, []);

    const fetchInvitations = async () => {

        try {

            const res = await api.get(
                "/invitations/pending"
            );

            setInvitations(res.data.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    const acceptInvitation = async (id) => {

        try {

            await api.patch(

                `/invitations/${id}/accept`

            );

            fetchInvitations();

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

        <DashboardLayout

            title="Invitations"

            subtitle="Pending workspace invitations"

        >

            <div className="space-y-5">

                {

                    invitations.map(invite => (

                        <div

                            key={invite._id}

                            className="rounded-2xl bg-white p-6 shadow"

                        >

                            <h2 className="text-xl font-bold">

                                {invite.workspace.name}

                            </h2>

                            <p className="mt-2 text-slate-500">

                                Invited as

                                {" "}

                                {invite.role}

                            </p>

                            <button

                                onClick={()=>

                                    acceptInvitation(
                                        invite._id
                                    )

                                }

                                className="mt-5 rounded-xl bg-green-600 px-5 py-2 text-white"

                            >

                                Accept

                            </button>

                        </div>

                    ))

                }

            </div>

        </DashboardLayout>

    );

}

export default Invitations;