export const formatPhoneDisplay = (value: string) => {
  let num = value;
  if (num[1] === "8" || num[1] === "7") {
    num = "7" + num.slice(2);
  }

  if (num.length === 1) {
    return "+7";
  } else if (num.length <= 4) {
    return `+7 (${num.slice(1, 4)}`;
  } else if (num.length <= 7) {
    return `+7 (${num.slice(1, 4)}) ${num.slice(4, 7)}`;
  } else if (num.length <= 9) {
    return `+7 (${num.slice(1, 4)}) ${num.slice(4, 7)}-${num.slice(7, 9)}`;
  } else {
    return `+7 (${num.slice(1, 4)}) ${num.slice(4, 7)}-${num.slice(7, 9)}-${num.slice(9, 11)}`;
  }
};
