import { createContext, useState } from "react";

export const CardsContext = createContext();
export const BackgroundContext = createContext();

const AppContextProvider = ({children}) => {
    const [cardInput, setCardInput] = useState([]);
    const [cards, setCards] = useState([]);
    const [previewCard, setPreviewCard] = useState([]);
    const [comparisonCards, setComparisonCards] = useState([[],[]]);
    const [userDBCards, setUserDBCards] = useState([]);
    const [listName, setListName] = useState(["MTGO Vintage Cube"]);
    const [isLoading, setIsLoading] = useState(false)
    const [deleted, setDeleted] = useState([])
    const [cardsLoaded, setCardsLoaded] = useState(false)

    return(
        <CardsContext.Provider value={{
            cards: [cards, setCards], 
            cardInput: [cardInput, setCardInput],
            previewCard: [previewCard, setPreviewCard],
            comparisonCards: [comparisonCards, setComparisonCards],
            userDBCards: [userDBCards, setUserDBCards],
            listName: [listName, setListName],
            isLoading: [isLoading, setIsLoading],
            deleted: [deleted, setDeleted],
            cardsLoaded: [cardsLoaded, setCardsLoaded]
            }}>
                    {children}
        </CardsContext.Provider>
    )
}

export default AppContextProvider