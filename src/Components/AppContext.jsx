import { createContext, useState } from "react";

const CardsContext = createContext();
const BackgroundContext = createContext();

const UserContextProvider = ({children}) => {
    const [cardInput, setCardInput] = useState([]);
    const [cards, setCards] = useState([]);
    const [previewCard, setPreviewCard] = useState([]);
    const [comparisonCards, setComparisonCards] = useState([]);
    const [background, setBackground] = useState([]);
    const [userDBCards, setUserDBCards] = useState([]);

    return(
        <CardsContext.Provider value={{
            cards: [cards, setCards], 
            cardInput: [cardInput, setCardInput],
            previewCard: [previewCard, setPreviewCard],
            comparisonCards: [comparisonCards, setComparisonCards],
            userDBCards: [userDBCards, setUserDBCards]
            }}>
                <BackgroundContext.Provider value={[background, setBackground]}>
                    {children}
                </BackgroundContext.Provider>
        </CardsContext.Provider>
    )
}