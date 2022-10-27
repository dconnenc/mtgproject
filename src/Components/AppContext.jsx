import { createContext, useState } from "react";

export const CardsContext = createContext();
export const BackgroundContext = createContext();

const AppContextProvider = ({children}) => {
    const [cardInput, setCardInput] = useState([]);
    const [cards, setCards] = useState([]);
    const [previewCard, setPreviewCard] = useState([]);
    const [comparisonCards, setComparisonCards] = useState([]);
    const [userDBCards, setUserDBCards] = useState([]);
    
    const [background, setBackground] = useState([]);

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

export default AppContextProvider