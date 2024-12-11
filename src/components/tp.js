const binaryToText = (binary) => {
    return binary
      .match(/.{1,8}/g)
      .map((byte) => String.fromCharCode(parseInt(byte, 2)))
      .join("");
  };
console.log(binaryToText("010011000110010101110100011100110010000001110100011100100111100100100000011100110110111101101101011001010111010001101000011010010110111001100111")) 