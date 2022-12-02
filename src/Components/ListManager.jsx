import { Comparison } from "./Comparison"
import ImagePreviewer from "./ImagePreviewer"
import { Table } from "./Table"

export const ListManager = ({user}) => {
    return(
        <>
                <Comparison user={user} />
            <div className="container-mat">
                {window.innerWidth > 800 ? <ImagePreviewer /> : <div></div>}
                <Table />
            </div>
        </>
    )
}