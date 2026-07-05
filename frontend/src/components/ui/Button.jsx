function Button({
    children,
    type = "button",
    className = "",
    ...props
}) {
    return (
        <button
            type={type}
            className={`w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;