import { forwardRef, ChangeEvent } from "react"

const SimpleInput = forwardRef<HTMLInputElement, {type: string, placeholder?: string, onChange?: (e: ChangeEvent<HTMLInputElement>) => void, value?: string | number}>(({type, placeholder, onChange, value}, ref) => {
    return (
        <input type={type} onChange={onChange} value={value} placeholder={placeholder} ref={ref} className="p-4 bg-bg-300 dark:bg-dark-bg-300 placeholder:text-text-100/75 outline-none focus:outline-text-200/75 focus:dark:outline-dark-text-200/75 placeholder:dark:text-dark-text-100/75" />
    )
});

SimpleInput.displayName = 'SimpleInput';

export default SimpleInput;