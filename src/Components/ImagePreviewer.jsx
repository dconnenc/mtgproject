function ImagePreviewer({ previewCard }) {
  if(!previewCard?.length || !cards?.length){
    return <></>
  } else {
    return (
      <div id="preview-container" style={{
        maxWidth: "25vw"
      }}>
        <img id="preview"
          src={previewCard}
          alt="preview of highlighted card"
        />
      </div>
    );
  }
}
export default ImagePreviewer;
