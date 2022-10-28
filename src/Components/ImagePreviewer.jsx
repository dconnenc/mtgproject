import { CardsContext } from "./AppContext"
import {useContext} from "react";

function ImagePreviewer() {
  const context = useContext(CardsContext);
   
  const [cards, setCards] = context["cards"]
  const [previewCard, setPreviewCard] = context["previewCard"]

  if(!previewCard?.img || !cards?.length){
    return <></>
  } else {
    return (
      <div id="preview-container" style={{
        maxWidth: "25vw"
      }}>
        <img id="preview"
          className="preview-card"
          src={previewCard.img}
          alt="preview of highlighted card"
        />
      </div>
    );
  }
}
export default ImagePreviewer;
