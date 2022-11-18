import { Comparison } from "./Comparison"
import ImagePreviewer from "./ImagePreviewer"
import { Table } from "./Table"

export const ListManager = ({user}) => {
    return(
        <>
            <div className="main-container">
                <Comparison user={user} />
            </div>
            <div className=".container container-mat">
                <ImagePreviewer />
                <Table />
            </div>
        </>
    )
}