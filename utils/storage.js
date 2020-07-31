export const dataKey = "RandomRabbitData";
export const getLocalStorage = () => {
  if (window && window.localStorage) {
    return JSON.parse(localStorage.getItem(dataKey));
  } else {
    return null;
  }
};

export const setLocalStorage = (data) => {
  if (window && window.localStorage) {
    localStorage.setItem(dataKey, JSON.stringify(data));
    return true;
  }
  return false;
};
