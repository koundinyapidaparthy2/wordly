export const checkValidArray = (arr, index = 0) => {
  return arr && Array.isArray(arr) && arr.length > index;
};

export const buttonList = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];
