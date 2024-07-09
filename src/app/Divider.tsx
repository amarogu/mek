export default function Divider({className, vertical, saturated}: {className?: string, vertical?: boolean, saturated?: boolean}) {
    return (
        <div className={`${vertical ? 'w-[1px]' : 'h-[1px]'} ${saturated ? 'bg-text-100 dark:bg-dark-text-100' : 'bg-accent-200/25 dark:bg-dark-accent-200/25'} ${className ? className : ''}`}></div>
    )
}