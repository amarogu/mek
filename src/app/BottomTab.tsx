export default function BottomTab({className}: {className?: string}) {
    return (
        <div className="px-8 absolute bottom-0 flex w-full justify-center">
            <div className={`grid bottomTab z-10 text-xs container pb-8 grid-cols-3 ${className ? className : ''}`}>
                <p className="justify-self-start"><a href="https://maps.app.goo.gl/bS5KpEtKDsBoigbM7" target="_blank">Saint German Eventos</a></p>
                <p className="justify-self-center">16:30</p>
                <p className="justify-self-end">09 NOV 2024</p>
            </div>
        </div>
    )
}