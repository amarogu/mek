export default function Input({type, id, placeholder, className, onChange, value}: {type: string, id: string, placeholder: string, className?: string , onChange?: (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void, value?: string}) {
    return (
        <input onChange={onChange} value={value} type={type ?? 'text'} id={id} placeholder={placeholder} className={`rounded-sm focus:outline outline-offset-2 placeholder-text-100 dark:placeholder-dark-text-100 ${className} outline-bg-300 dark:outline-dark-bg-300 bg-bg-300 dark:bg-dark-bg-300 px-4 py-2`} />
    )
}