export const ClearCardsButton = ({setCards}) => {
    return(
        <button type="button" class="btn-close btn-danger" aria-label="Close"
            onClick={()=> {setCards([])}}
        ></button>
    )
}