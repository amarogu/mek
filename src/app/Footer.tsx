export default function Footer() {
    return (
        <footer className="text-xl flex flex-col gap-20 mb-12 px-8 container mx-auto">
            <div className="flex justify-between">
                <div className="flex flex-col gap-3">
                    <button>
                        <p>&#169; Coded by Amaro </p>
                    </button>
                    <p>Brazil, SP</p>
                </div>
                <div className="flex gap-3 flex-col">
                    <p>Version</p>
                    <p>1.0 2024</p>
                </div>
            </div>
            <div className="flex flex-col gap-3 w-full">
                <div className="flex items-center gap-6">
                    <p className="text-lg">Socials</p>
                    <span className="h-[1px] w-full inline-block bg-text-200"></span>
                </div>
                <div className="flex justify-between">
                    <a>Instagram</a>
                    <a>LinkedIn</a>
                    <a>GitHub</a>
                </div>
            </div>
        </footer>
    )
}