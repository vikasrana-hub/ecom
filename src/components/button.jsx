export function Button({ label, onClick }) {
    return (
        <button
            onClick={onClick}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition duration-200"
           >
            {label}
        </button>
    )

}