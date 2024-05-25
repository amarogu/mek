export default function Divider({className}: {className?: string}) {
    return (
        <div className={`h-[1px] bg-accent-200/25 dark:bg-dark-accent-200/25 ${className ? className : ''}`}></div>
    )
}