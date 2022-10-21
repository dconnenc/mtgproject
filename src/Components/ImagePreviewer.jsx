function ImagePreviewer({ previewCard, cards }) {
  if(!previewCard?.img || !cards?.length){
    return <></>
  } else {
    return (
      <div id="preview-container" style={{
        maxWidth: "25vw"
      }}>
        <img id="preview"
          className={`preview-card ${previewCard.isHorizontal ? 'horizontal' : ''}`}
          src={previewCard.img}
          alt="preview of highlighted card"
        />
      </div>
    );
  }
}
export default ImagePreviewer;
