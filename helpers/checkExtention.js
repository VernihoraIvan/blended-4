const checkExtention = (fileName) => {
  const EXTENTIONS = ["txt", "js", "json", "html", "css"];
  const arrExtentions = fileName.split(".");
  const extention = arrExtentions[arrExtentions.length - 1];
  const isPresent = EXTENTIONS.includes(extention);

  return { extention, isPresent };
};

// returns extention - розширення result- bool
//filename = 'dsnsjdnsdn'.'dsfdsn'.'xml'
module.exports = checkExtention;
