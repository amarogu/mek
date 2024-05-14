export default function StyledInput({type, placeholder}: {type: 'text' | 'textarea', placeholder: string}) {
    switch (type) {
        case 'text':
            return (
                <div className="border-b p-4 border-text-100 dark:border-dark-text-100">
                    <p className="uppercase">{placeholder}</p>
                </div>
            )
    }
}