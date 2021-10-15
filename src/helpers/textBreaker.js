
const textBreaker = (text, maxCar, end) => {
  if (!text.length) {
    return "";
  }
  return text.split(" ", maxCar).join(" ") + end;
};
export default textBreaker