import React, { useRef, useState } from "react";

const Decode = () => {
  const canvasRef = useRef(null);
  const [decodedText, setDecodedText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [showImage, setShowImage] = useState(false);  // State to toggle image preview

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

  const binaryToText = (binary) => {
    return binary
      .match(/.{1,8}/g)
      .map((byte) => String.fromCharCode(parseInt(byte, 2)))
      .join("");
  };

  const decodeText = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const pixels = imageData.data;
    let binaryText = "";

    for (let i = 0; i < pixels.length; i += 4) {
      binaryText += (pixels[i] & 1).toString(); // Extract LSB
    }

    const messageLengthBinary = binaryText.slice(0, 32);
    const messageLength = parseInt(messageLengthBinary, 2);

    const messageBinary = binaryText.slice(32, 32 + messageLength * 8);
    const decodedMessage = binaryToText(messageBinary);

    setDecodedText(decodedMessage);
  };

  return (
    <div className="container">
      <h1>Decode Text from Image</h1>
      <input type="file" accept="image/png" onChange={handleImageUpload} />
      <button onClick={() => setShowImage(!showImage)}>
        {showImage ? "Hide Preview" : "Show Preview"}
      </button>
      {showImage && imagePreview && (
        <div>
          <h3>Image Preview:</h3>
          <img src={imagePreview} alt="Preview" />
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <button onClick={decodeText}>Decode Text</button>
      <p>Decoded Text: <span>{decodedText}</span></p>
    </div>
  );
};

export default Decode;
