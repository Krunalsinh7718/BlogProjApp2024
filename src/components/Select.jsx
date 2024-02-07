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
                className={`bg-white flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
                {...props}
            >
                {options?.map(option => <option key={option} value={option}>{option.toUpperCase()}</option>)}
            </select>
        </div>
    </>);
}

export default React.forwardRef(Select);