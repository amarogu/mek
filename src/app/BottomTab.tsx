export default function BottomTab({className}: {className?: string}) {
    return (
        <div className="px-8">
            <div className={`grid bottomTab z-10 text-xs w-full container left-1/2 -translate-x-1/2 absolute bottom-0 pb-8 grid-cols-3 ${className ? className : ''}`}>
                <p className="justify-self-start"><a href="https://maps.app.goo.gl/bS5KpEtKDsBoigbM7" target="_blank">Saint German Eventos</a></p>
                <p className="justify-self-center">16:30</p>
                <p className="justify-self-end">09 NOV 2024</p>
            </div>
        </div>
    )
}