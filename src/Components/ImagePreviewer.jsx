import { CardsContext } from "./AppContext"
import {useContext} from "react";
import  mtgcardback  from "../Assets/mtgcardback.jpg";

function ImagePreviewer() {
  const context = useContext(CardsContext);
   
  const [cards, setCards] = context["cards"]
  const [previewCard, setPreviewCard] = context["previewCard"]


    return (
        <img id="preview"
          className="preview-card"
          src={previewCard.img ? previewCard.img : mtgcardback}
          alt="preview of highlighted card"
        />
    );
  }

export default ImagePreviewer;
