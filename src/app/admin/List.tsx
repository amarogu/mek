import { ReactNode, Children, Fragment } from "react";
import Divider from "../Divider";


export default function List({children, listRowBackground}: {children: ReactNode, listRowBackground?: string}) {
    const childArray = Children.toArray(children)

    return (
        <div className="flex flex-col">
            {
                childArray.map((child, i) => (
                    <Fragment key={i}>
                        <div className={`${listRowBackground ? listRowBackground : ''} p-4`}>
                            {child}
                        </div>
                        {i < childArray.length - 1 && <Divider />}
                    </Fragment>
                ))
            }
        </div>
    )
}