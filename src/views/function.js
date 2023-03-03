import { _URL } from "./const";
export const getData = () =>
  fetch(_URL, {
    method: "POST",
  }).then((response) => response.json());

export const getDetailCoin = (symbol) => {
  const form_data = new FormData();
  form_data.append("symbol", symbol);
  return fetch(_URL, {
    method: "POST",
    body: form_data,
    redirect: "follow",
  }).then((response) => response.json());
};

export function getStatus(status, id) {
  const idx = this.data_table.findIndex((item) => item.id == id);
  if (idx > -1) {
    if (status == true) {
      return "changed";
    }
  }
  return "normal";
}
export function getColor(color_val) {
  if (Number(color_val) >= 0) {
    return "color-green";
  } else {
    return "color-red";
  }
}
export function getRsiColor(color_val) {
  if (Number(color_val) > 70) {
    return "color-green";
  } else if (Number(color_val) < 30) {
    return "color-red";
  } else {
    return "color-orange";
  }
}
export function getSrc(src) {
  return (
    "https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/" +
    src.toLowerCase() +
    ".png"
  );
}

export function getMACD(macd_hist) {
  if (macd_hist < 0) return "Bearish";
  return "Bullish";
}
export function getColorMACD(value) {
  if (value == "Bullish") {
    return "color-green";
  } else {
    return "color-red";
  }
}
export function getColorBB(value) {
  if (value == "Above") return "color-green";
  if (value == "Below") return "color-red";
  return "color-orange";
}

export function getBB(price, up, low) {
  if (price > up) return "Above";
  if (price < low) return "Below";
  return "Inside";
}
const list_number = [1, 2, 3, 4, 5, 6, 7, 8, 9];
function checkNumbertoArray(arrar) {
  let tempt = 0;
  arrar.forEach((element) => {
    list_number.includes(Number(element)) && tempt++;
  });
  return tempt;
}

export function flooNumber(number) {
  if (parseFloat(number) > 1) {
    return Math.floor(number * 100) / 100;
  }
  let [arr, _number] = [[], String(number)];
  for (let index = 0; index < _number.length; index++) {
    const element = _number[index];
    if (element == "." || element == "0") {
      arr.push(element);
    } else {
      if (checkNumbertoArray(arr) < 2) {
        arr.push(element);
      } else {
        if (Number(element) >= 5) {
          arr[arr.length - 1] = Number(arr[arr.length - 1]) + 1;
        } else {
          arr[arr.length - 1] = Number(arr[arr.length - 1]) - 1;
        }
        return arr.join("");
      }
    }
  }
}

export function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
