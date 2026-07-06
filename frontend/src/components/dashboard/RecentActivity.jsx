function RecentActivity({ activities }) {

    return (

        <div className="rounded-2xl bg-white p-6 shadow">

            <h2 className="mb-6 text-xl font-bold">

                Recent Activity

            </h2>

            {

                activities.length === 0 ? (

                    <p className="text-slate-500">

                        No recent activity

                    </p>

                ) : (

                    <div className="space-y-4">

                        {

                            activities.map(activity => (

                                <div

                                    key={activity._id}

                                    className="border-b pb-3"

                                >

                                    <p className="font-semibold">

                                        {activity.user?.name}

                                    </p>

                                    <p className="text-slate-500">

                                        {activity.action}

                                    </p>

                                </div>

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

}

export default RecentActivity;