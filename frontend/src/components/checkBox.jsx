export  const Checkbox = ({ id, label, checked, onChange }) => (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <label
        htmlFor={id}
        className="flex items-center space-x-2 cursor-pointer select-none group"
      >
        <div 
          className={`
            w-5 h-5 rounded border-2 flex items-center justify-center
            transition-all duration-200 ease-in-out
            ${checked 
              ? 'bg-blue-500 border-blue-500' 
              : 'border-gray-300 group-hover:border-blue-400'
            }
          `}
        >
          {checked && (
            <svg 
              className="w-3 h-3 text-white" 
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.5 6.5l2 2 4-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <span className="text-sm text-gray-700">{label}</span>
      </label>
    </div>
  );
