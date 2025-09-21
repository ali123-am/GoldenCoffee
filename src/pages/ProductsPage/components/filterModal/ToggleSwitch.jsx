export const ToggleSwitch = ({ label, value, onToggle }) => {
  return (
    <div
      onClick={onToggle}
      className="w-full flex items-center justify-between px-3 sm:px-0 py-3 cursor-pointer transition-all duration-200"
    >
      <span>{label}</span>
      <div
        className={`w-12 h-6 relative transition-colors duration-300 rounded-full ${
          value ? "bg-blue-500" : "bg-gray-400 dark:bg-zinc-600"
        }`}
      >
        <span
          className={`block w-5 h-5 bg-white rounded-full shadow-md absolute top-0.5 left-0.5
          transition-transform duration-300 ${value ? "translate-x-6" : "translate-x-0"}`}
        />
      </div>
    </div>
  );
};
