const DEFAULT_ITEMS_PER_PAGE = 10;

export const getItemsPerPage = () => {
  const saved = localStorage.getItem("itemsPerPage");
  const parsed = parseInt(saved, 10);
  return isNaN(parsed) || parsed < 1 ? DEFAULT_ITEMS_PER_PAGE : parsed;
};

export const setItemsPerPage = (value) => {
  const num = parseInt(value, 10);
  if (!isNaN(num) && num > 0) {
    localStorage.setItem("itemsPerPage", num.toString());
  }
};