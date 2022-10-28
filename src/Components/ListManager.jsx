import { Comparison } from "./Comparison"

export const ListManager = () => {
    return(
        <>
            <div className="main-container">
                <Comparison user={user} />
            </div>
            <div className="row .container">
                <div className="col-3 .container" id="preview-container">
                    <ImagePreviewer />
                </div>
                <div className="col-6 .container" id="tableContainer">
                    <Table />
                </div>
            </div>
        </>
    )
}