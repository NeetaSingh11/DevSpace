function Card({ children }) {
    return (
        <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-2xl">
            {children}
        </div>
    );
}

export default Card;