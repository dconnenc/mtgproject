import { Comparison } from "./Comparison"
import ImagePreviewer from "./ImagePreviewer"
import { Table } from "./Table"

export const ListManager = ({user, list}) => {
    return(
        <>
                <Comparison user={user} list={list}/>
            <div className="container-mat">
                <ImagePreviewer />
                <Table />
            </div>
        </>
    )
}