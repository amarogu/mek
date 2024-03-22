import React, { useRef } from 'react';
import gsap from 'gsap';

interface ContactFieldProps {
    id: string;
    title: string;
    description: string;
    className?: string;
    isTextBox?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function ContactField({id, title, description, className, isTextBox, onChange}: ContactFieldProps) {
    const inputRef = useRef<HTMLElement>(null);

    const handleDivClick = () => {
        inputRef.current?.focus();
    }

    return (
        <div onClick={handleDivClick} id={`field-${id}`} className={`flex gap-9 border-text-200 cursor-pointer ${className} ${isTextBox ? 'h-full' : ''}`}>
            <p className="text-7xl w-[85px] shrink-0">{id}</p>
            <div className="flex flex-col gap-3">
                <h3>{title}</h3>
                {isTextBox ? <textarea ref={inputRef as React.RefObject<HTMLTextAreaElement>} onChange={onChange} placeholder={description} className={`placeholder:text-xl resize-none placeholder:text-text-200/75 text-xl outline-none w-full bg-transparent ${isTextBox && 'h-full'}`} /> : <input ref={inputRef as React.RefObject<HTMLInputElement>} onChange={onChange} placeholder={description} className={`placeholder:text-xl placeholder:text-text-200/75 text-xl outline-none w-full bg-transparent`} />}
            </div>
        </div>
    )
}