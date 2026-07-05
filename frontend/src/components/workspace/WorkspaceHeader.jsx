function WorkspaceHeader({ onCreate }) {

    return (

        <div className="mb-8 flex items-center justify-between">

            <div>

                <h1 className="text-4xl font-bold text-slate-800">
                    Workspaces
                </h1>

                <p className="mt-2 text-slate-500">
                    Manage all your workspaces from one place.
                </p>

            </div>

            <button
                onClick={onCreate}
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
                + New Workspace
            </button>

        </div>

    );

}

export default WorkspaceHeader;