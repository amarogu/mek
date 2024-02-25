import React, { useRef } from 'react';

interface ContactFieldProps {
    id: string;
    title: string;
    description: string;
}

export default function ContactField({id, title, description}: ContactFieldProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDivClick = () => {
        inputRef.current?.focus();
    }

    return (
        <div onClick={handleDivClick} className={`flex col-span-2 gap-9 border-text-200`}>
            <p className="text-7xl w-[85px] shrink-0">{id}</p>
            <div className="flex flex-col gap-3">
                <h3>{title}</h3>
                <input ref={inputRef} type="name" placeholder={description} className="placeholder:text-xl placeholder:text-text-200 text-xl outline-none bg-transparent" />
            </div>
        </div>
    )
}