export default function Input({ type, placeholder, value, onChange }) {
    return (
        <input
            onChange={onChange}
            type={type}
            placeholder={placeholder}
            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
    );
}   