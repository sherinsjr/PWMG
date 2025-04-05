export const setItemToLocalStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getItemFromLocalStorage = (key) => {
  return JSON.parse(window.localStorage.getItem(key));
};

export const removeItemFromLocalStorage = (key) => {
  window.localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  window.localStorage.clear();
};
