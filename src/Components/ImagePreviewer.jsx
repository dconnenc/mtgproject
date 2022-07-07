function ImagePreviewer({ previewCard }) {
  return (
    <div style={{
      maxWidth: "25vw"
    }}>
      <img id="preview"
        src={previewCard}
        alt="preview of highlighted card" 
      />
    </div>
  );
}

export default ImagePreviewer;
