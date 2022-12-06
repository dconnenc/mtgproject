import { Comparison } from "./Comparison"
import ImagePreviewer from "./ImagePreviewer"
import { Table } from "./Table"

export const ListManager = ({user}) => {
    return(
        <>
                <Comparison user={user} />
            <div className="container-mat">
                <ImagePreviewer />
                <Table />
            </div>
        </>
    )
}