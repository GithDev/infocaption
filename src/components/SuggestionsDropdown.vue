<template>
  <BaseDropdown
    v-if="anchor && isVisible"
    :items="suggestions"
    :isVisible="isVisible"
    :anchor="anchor"
    @select="handleSelect"
    @close="hide()"
  />
</template>

<script lang="ts" setup>
import { ref, watch, type Component } from "vue";
import { suggestGuides } from "@/services/icApi";
import BaseDropdown from "@/components/base/BaseDropdown.vue";
import { useErrorHandler } from "@/composables/Error/useErrorHandler";
import type { SuggestResultItem } from "@/types/Types";

const debounceDelayMs = 300;

const { handleError } = useErrorHandler();

interface DropdownItem {
  id: number;
  label: string | HTMLElement | Component;
}

interface Props {
  query: string;
  selectedTypes?: number[];
  anchor: HTMLElement | null;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  select: [suggestion: SuggestResultItem];
}>();

const suggestions = ref<DropdownItem[]>([]);
const originalSuggestions = ref<SuggestResultItem[]>([]);
const isLoadingSuggestions = ref(false);
const isVisible = ref(false);

async function getSuggestions() {
  if (!props.query.trim() || props.query.length < 2) {
    suggestions.value = [];
    hide();
    return;
  }

  isLoadingSuggestions.value = true;
  try {
    const response = await suggestGuides(props.query, {
      types: props.selectedTypes || [],
    });

    originalSuggestions.value = response;

    suggestions.value = response.map((suggestion, index) => ({
      id: index,
      label: suggestion.key,
    }));

    isVisible.value = suggestions.value.length > 0;
  } catch (error) {
    handleError(error, "Kunde inte ladda förslag");

    suggestions.value = [];
    hide();
  } finally {
    isLoadingSuggestions.value = false;
  }
}

function handleSelect(id: number) {
  const suggestItem = originalSuggestions.value[id as number];
  if (suggestItem) {
    emit("select", suggestItem);
  }

  hide();
}

function hide() {
  isVisible.value = false;
}

let timeout: ReturnType<typeof setTimeout>;
watch(
  () => props.query,
  () => {
    hide();
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      getSuggestions();
    }, debounceDelayMs);
  },
);
</script>

<style>
ic-match {
  background-color: #fef08a;
}
</style>
