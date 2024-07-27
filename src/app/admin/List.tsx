import { ReactNode, Children, Fragment } from "react";
import Divider from "../Divider";


export default function List({children}: {children: ReactNode}) {
    const childArray = Children.toArray(children)

    return (
        <div className="flex flex-col gap-2">
            {
                childArray.map((child, i) => (
                    <Fragment key={i}>
                        <div className="p-3">
                            {child}
                        </div>
                        {i < childArray.length - 1 && <Divider />}
                    </Fragment>
                ))
            }
        </div>
    )
}