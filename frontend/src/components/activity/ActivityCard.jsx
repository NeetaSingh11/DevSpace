import { FiClock } from "react-icons/fi";

function ActivityCard({ activity }) {

    return (

        <div className="rounded-2xl bg-white p-6 shadow">

            <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-bold text-white">

                    {activity.user.name.charAt(0)}

                </div>

                <div>

                    <h3 className="font-bold">

                        {activity.user.name}

                    </h3>

                    <p className="text-sm text-slate-500">

                        {activity.action}

                    </p>

                    <p className="text-blue-600">

                        {activity.target}

                    </p>

                </div>

            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">

                <FiClock />

                {new Date(
                    activity.createdAt
                ).toLocaleString()}

            </div>

        </div>

    );

}

export default ActivityCard;