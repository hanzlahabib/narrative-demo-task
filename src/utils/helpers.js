export const addLocalStorageItem = (key, value) => {
    window.localStorage.setItem(key, value);
  };
  
  export const addLocalStorageMultipleItems = items => {
    items.forEach(item => window.localStorage.setItem(item.key, item.value));
  };
  
  export const getLocalStorageItem = key => {
    return window.localStorage.getItem(key);
  };
  
  export const removeLocalStorageItem = key => {
    window.localStorage.removeItem(key);
  };
  
  export const removeLocalStorageMultipleItems = keys => {
    keys.forEach(key => window.localStorage.removeItem(key));
  };
  