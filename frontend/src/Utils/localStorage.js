// Memoized function to get favorites from localStorage
let cachedFavorites = null;

export const getFavoritesFromLocalStorage = () => {
  if (cachedFavorites === null) {
    const favoritesJSON = localStorage.getItem("favorites");
    cachedFavorites = favoritesJSON ? JSON.parse(favoritesJSON) : [];
  }
  return cachedFavorites;
};

// Add product to localStorage
export const addProductInLocalStorage = (product) => {
  const favorites = getFavoritesFromLocalStorage();
  if (!favorites.some((f) => f._id === product._id)) {
    const updatedFavorites = [...favorites, product];
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    cachedFavorites = updatedFavorites; // Update cache
  }
};

// Remove product from localStorage
export const removeProductFromLocalStorage = (product) => {
  const favorites = getFavoritesFromLocalStorage();
  const updatedFavorites = favorites.filter((f) => f._id !== product._id);
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  cachedFavorites = updatedFavorites; // Update cache
};
