import React, { useId } from "react";

function Select({ label,
    className,
    options,
    ...props },
    ref) {
    const id = useId();
    return (<>
        <div className="w-full">
            {label && <label htmlFor={id} className="text-base font-medium text-gray-900">{label}</label>}
            <select
                id={id}
                ref={ref}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                {...props}
            >
                {options?.map(option => <option key={option} value={option}>{option.toUpperCase()}</option>)}
            </select>
        </div>
    </>);
}

export default React.forwardRef(Select);