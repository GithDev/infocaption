import { ref, computed } from "vue";

interface ErrorState {
  title: string;
  message: string;
}

const error = ref<ErrorState>({ title: "", message: "" });

export function useErrorHandler() {
  const isErrorModalOpen = computed(() => error.value.title !== "" || error.value.message !== "");

  const showError = (title: string, message: string) => {
    error.value = { title, message };
  };

  const hideError = () => {
    error.value = { title: "", message: "" };
  };

  const handleError = (err: unknown, fallbackMessage = "Ett oväntat fel inträffade") => {
    console.error("API Error:", err);

    let message = fallbackMessage;

    if (err instanceof Error) {
      message = err.message;
    } else if (typeof err === "string") {
      message = err;
    }

    showError("Något gick fel", message);
  };

  return {
    isErrorModalOpen,
    currentError: error,
    showError,
    hideError,
    handleError,
  };
}
