import React, { useRef, useState } from "react";

const Encode = () => {
  const canvasRef = useRef(null);
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
        const img = new Image();
        img.src = reader.result;

        img.onload = () => {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const textToBinary = (text) =>
    text
      .split("")
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
      .join("");

  const encodeText = () => {
    const binaryText = textToBinary(text);
    const messageLengthBinary = text.length.toString(2).padStart(32, "0");
    const fullBinaryMessage = messageLengthBinary + binaryText;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    let binaryIndex = 0;
    
    for (let i = 0; i < pixels.length && binaryIndex < fullBinaryMessage.length; i += 4) {
      // console.log(pixels[i])
      pixels[i] = (pixels[i] & 0xfe) | parseInt(fullBinaryMessage[binaryIndex], 10);
      binaryIndex++;
    }
    console.log(imageData)
    ctx.putImageData(imageData, 0, 0);
  };

  const saveImage = () => {
    const canvas = canvasRef.current;
    const encodedImage = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "encoded-image.png";
    link.href = encodedImage;
    link.click();
  };

  const toggleImagePreview = () => {
    setShowPreview((prevState) => !prevState);
  };

  return (
    <div className="container">
      <h1>Encode Text into Image</h1>
      <input type="file" accept="image/png" onChange={handleImageUpload} />
      
      <button onClick={toggleImagePreview}>
        {showPreview ? "Hide Preview" : "Show Preview"}
      </button>

      {showPreview && imagePreview && (
        <div>
          <h3>Image Preview:</h3>
          <img src={imagePreview} alt="Preview" />
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: "none" }} />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to encode"
      />
      <button onClick={encodeText}>Encode Text</button>
      <button onClick={saveImage}>Save Image</button>
    </div>
  );
};

export default Encode;
