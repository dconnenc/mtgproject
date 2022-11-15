import { Comparison } from "./Comparison"
import ImagePreviewer from "./ImagePreviewer"
import { Table } from "./Table"

export const ListManager = ({user}) => {
    return(
        <>
            <div className="main-container">
                <Comparison user={user} />
            </div>
            <div className="row .container">
                <div className="col-4 .container" id="preview-container">
                    <ImagePreviewer />
                </div>
                <div className="col-8 .container" id="table-container">
                    <Table />
                </div>
            </div>
        </>
    )
}