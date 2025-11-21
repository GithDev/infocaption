<template>
  <nav class="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
    <div class="-mt-px w-0 flex-1 flex">
      <button
        class="border-t-2 border-transparent pr-1 pt-4 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-gray-400 disabled:hover:border-transparent"
        :disabled="currentPage <= 1"
        @click="goToPage(currentPage - 1)"
      >
        <svg class="mr-3 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M7.707 14.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L3.414 9l4.293 4.293a1 1 0 010 1.414z"
            clip-rule="evenodd"
          />
        </svg>
        Föregående
      </button>
    </div>

    <div class="hidden md:-mt-px md:flex">
      <template v-for="(p, index) in pagesToShow" :key="index">
        <span
          v-if="p === '...'"
          class="border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
        >
          ...
        </span>

        <button
          v-else
          class="pt-4 px-4 inline-flex items-center text-sm font-medium border-t-2"
          :class="
            p === currentPage
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          "
          @click="goToPage(p as number)"
        >
          {{ p }}
        </button>
      </template>
    </div>

    <div class="-mt-px w-0 flex-1 flex justify-end">
      <button
        class="border-t-2 border-transparent pl-1 pt-4 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-gray-400 disabled:hover:border-transparent"
        :disabled="currentPage >= totalPages"
        @click="goToPage(currentPage + 1)"
      >
        Nästa
        <svg class="ml-3 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M12.293 5.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L15.586 11l-3.293-3.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { computed } from "vue";

interface Props {
  currentPage: number;
  totalPages: number;
}

interface Emits {
  (e: "change", page: number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const pagesToShow = computed((): (number | string)[] => {
  const pages: (number | string)[] = [];
  const { currentPage, totalPages } = props;

  const add = (p: number | string) => pages.push(p);

  // Always show the first page
  add(1);

  // Show an ellipsis if there's a gap after page 1
  if (currentPage > 4) add("...");

  // Show the 3 pages before and after the current page
  for (let p = currentPage - 2; p <= currentPage + 2; p++) {
    if (p > 1 && p < totalPages) add(p);
  }

  // Show an ellipsis before the last page if needed
  if (currentPage < totalPages - 3) add("...");

  // Show last page
  if (totalPages > 1) add(totalPages);

  return pages;
});

function goToPage(page: number) {
  if (page < 1 || page > props.totalPages) {
    return;
  }
}
</script>
