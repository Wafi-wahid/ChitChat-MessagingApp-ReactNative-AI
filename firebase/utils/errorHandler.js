//firebase/utils/errorHandler.js
export const handleError = (error) => {
  console.error("An error occurred:", error.message);
  alert("Something went wrong. Please try again.");
};
