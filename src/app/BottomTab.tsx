export default function BottomTab({className}: {className?: string}) {
    return (
        <section className={`grid bottomTab text-[10px] w-full absolute bottom-0 left-0 grid-cols-3 ${className ? className : ''}`}>
            <p className="justify-self-start">Saint German Eventos</p>
            <p className="justify-self-center">16:30</p>
            <p className="justify-self-end">09 NOV 2024</p>
        </section>
    )
}