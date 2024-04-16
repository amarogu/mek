import { useEffect } from "react"

export default function Us() {

    const data = ['Um amor que', 'tinha que', 'acontecer']

    useEffect(() => {
        const usTitle = document.querySelectorAll('.usTitle');
        const hidingRects = document.querySelectorAll('.hidingRect');
        let heights: number[] = [];
        usTitle.forEach(title => {
            heights.push(title.clientHeight);
        })
        heights.forEach((height, i) => {
            hidingRects[i].setAttribute('style', `height: ${height}px`);
        })
    }, [])

    return (
        <section className="flex items-center text-[12.5vw] md:text-[9vw] xl:text-[120px] font-extrabold leading-[85%] text-center justify-center h-screen">
            <div>
                {data.map(i => {
                    return (
                        <div key={i} className="relative">
                            <div className="bg-bg-100 absolute hidingRect dark:bg-dark-bg-100 w-full"></div>
                            <h2 className="usTitle">{i}</h2>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}