export default function BottomTab({className}: {className?: string}) {
    return (
        <section className={`grid bottomTab z-10 text-[10px] w-full absolute bottom-0 px-8 left-0 grid-cols-3 ${className ? className : ''}`}>
            <p className="justify-self-start"><a href="https://maps.app.goo.gl/bS5KpEtKDsBoigbM7" target="_blank">Saint German Eventos</a></p>
            <p className="justify-self-center">16:30</p>
            <p className="justify-self-end">09 NOV 2024</p>
        </section>
    )
}