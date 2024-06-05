export default function SimpleInput({type, placeholder}: {type: string, placeholder: string}) {
    return (
        <input className="p-4 bg-bg-300 dark:bg-dark-bg-300 placeholder:text-text-100/75 outline-none focus:outline-text-200/75 focus:dark:outline-dark-text-200/75 placeholder:dark:text-dark-text-100/75" type={type} placeholder={placeholder} />
    )
}