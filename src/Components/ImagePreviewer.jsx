function ImagePreviewer({ previewCard }) {
  return (
    <div style={{
      maxWidth: "25vw"
    }}>
      <img id="preview"
        src={previewCard}
        alt=""
      />
    </div>
  );
}

export default ImagePreviewer;
