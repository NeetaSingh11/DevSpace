import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

function PriorityBarChart({ data }) {

    return (

        <div className="rounded-2xl bg-white p-6 shadow">

            <h2 className="mb-6 text-xl font-bold">

                Tasks by Priority

            </h2>

            <ResponsiveContainer
                width="100%"
                height={320}
            >

                <BarChart data={data}>

                    <XAxis dataKey="_id" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="count"
                        fill="#3b82f6"
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}

export default PriorityBarChart;