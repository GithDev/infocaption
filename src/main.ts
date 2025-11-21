import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import { useErrorHandler } from "@/composables/Error/useErrorHandler";

const app = createApp(App);

// Global error handling
const { showError } = useErrorHandler();

// Vue rendering errors
app.config.errorHandler = (err, instance, info) => {
  console.error("Vue Error:", err, info);
  const message = err instanceof Error ? err.message : "Okänt renderingsfel";
  showError("Renderingsfel", `Ett fel inträffade i applikationen: ${message}`);
};

// Global JavaScript errors
window.addEventListener("error", (event) => {
  console.error("Global Error:", event.error);
  showError("JavaScript-fel", `Oväntat fel: ${event.error?.message || "Okänt fel"}`);
});

// Unhandled Promise rejections
window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled Promise Rejection:", event.reason);
  const message = event.reason?.message || event.reason || "Okänt fel";
  showError("Nätverksfel", `Ett löfte misslyckades: ${message}`);
});

app.use(createPinia());
app.use(router);

app.mount("#app");
