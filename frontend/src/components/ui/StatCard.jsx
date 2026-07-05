function StatCard({ title, value }) {

    return (

        <div className="rounded-xl bg-white p-6 shadow-md">

            <p className="text-slate-500">
                {title}
            </p>

            <h2 className="mt-3 text-4xl font-bold">
                {value}
            </h2>

        </div>

    );

}

export default StatCard;