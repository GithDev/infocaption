export const config = {
  apiUrl: import.meta.env.VITE_API_URL || "https://beta3.infocaption.com",
  token: import.meta.env.VITE_API_TOKEN || "",
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};
