<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <section class="max-w-4xl mx-auto">
      <div
        class="bg-white rounded-2xl shadow-md shadow-gray-200/60 border border-gray-100 p-8 space-y-6"
      >
        <form @submit.prevent="runSearch()" class="flex gap-4">
          <input
            ref="inputRef"
            v-model="query"
            type="text"
            placeholder="Sök guider…"
            @keydown.esc="query = ''"
            class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />

          <BaseButton
            type="submit"
            class="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
            :isLoading="isLoading"
          >
            Sök
          </BaseButton>

          <SuggestionsDropdown
            :query="query"
            :selected-types="selectedGuideTypes"
            :anchor="inputRef"
            @select="handleSuggestionSelect"
          />
        </form>

        <div class="flex flex-wrap gap-2">
          <PillarGroup
            :items="GuideTypePillarItems"
            v-model="selectedGuideTypes"
            @change="runSearch()"
          ></PillarGroup>
        </div>
      </div>
    </section>

    <section class="max-w-4xl mx-auto relative pt-5 pb-10">
      <BaseLoader v-model="isLoadingNewPage" />

      <div class="mb-4 text-gray-600" :class="{ invisible: totalHits === 0 }">
        Resultat: {{ totalHits }} st.
      </div>

      <div v-if="results && results.length > 0" class="space-y-4">
        <GuideCard
          v-for="guide in results"
          :key="guide.id"
          :guide="guide"
          class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition flex gap-4"
        />
      </div>
      <div v-else-if="isInitialLoad" class="text-center text-gray-500 py-8">Laddar guider...</div>
      <p v-else-if="!isLoading && results !== null" class="text-gray-500">Inga guider hittades.</p>
    </section>

    <section>
      <BasePagination
        v-if="isPaginationVisible"
        :total-pages="totalPages"
        :current-page="currentPage"
        @change="runSearch($event)"
      ></BasePagination>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { getFilterOptions, searchGuides } from "@/services/icApi";
import type { FilterOptionsResponse, GuideSearchHit, SuggestResultItem } from "@/types/Types";
import { useErrorHandler } from "@/composables/Error/useErrorHandler";
import BaseButton from "@/components/base/BaseButton.vue";
import BasePagination from "@/components/base/BasePagination.vue";
import GuideCard from "@/components/GuideCard.vue";
import PillarGroup from "@/components/PillarGroup.vue";
import BaseLoader from "@/components/base/BaseLoader.vue";
import SuggestionsDropdown from "@/components/SuggestionsDropdown.vue";

const { handleError } = useErrorHandler();

const query = ref("");
const currentPage = ref(1);
const totalPages = ref(1);
const totalHits = ref(0);

const lastQuery = ref("");
const results = ref<GuideSearchHit[] | null>(null);

const inputRef = ref(null);
const filterOptions = ref<FilterOptionsResponse>({} as FilterOptionsResponse);
const selectedGuideTypes = ref<number[]>([]);

const isLoading = ref(false);
const isLoadingNewPage = ref(false);

const isPaginationVisible = computed(() => {
  return results.value && results.value.length !== 0;
});

const GuideTypePillarItems = computed(() => {
  if (!filterOptions.value?.guideTypes) {
    return [];
  }

  return filterOptions.value.guideTypes.map((guideType: { id: number; name: string }) => ({
    id: guideType.id,
    label: guideType.name,
  }));
});

const isInitialLoad = computed(() => results.value === null && isLoading.value);

async function runSearch(page = 1) {
  if (lastQuery.value != query.value) {
    // New search
  } else if (page !== currentPage.value) {
    // Another page
    isLoadingNewPage.value = true;
  }

  lastQuery.value = query.value;
  isLoading.value = true;
  currentPage.value = page;

  try {
    const {
      results: searchResults,
      totalPages: searchTotalPages,
      totalHits: searchTotalHits,
    } = await searchGuides({
      searchQuery: query.value,
      page: page,
      types: selectedGuideTypes.value,
    });

    results.value = searchResults;
    totalPages.value = searchTotalPages;
    totalHits.value = searchTotalHits;
  } catch (error) {
    handleError(error, "Kunde inte ladda sökresultat");
    results.value = [];
    totalHits.value = 0;
  } finally {
    isLoading.value = false;
    isLoadingNewPage.value = false;
  }
}

async function getFilterOptionsData() {
  try {
    const filterOptionsData = await getFilterOptions();
    filterOptions.value = filterOptionsData;
  } catch (error) {
    handleError(error, "Kunde inte ladda filteralternativ");
  }
}

function handleSuggestionSelect(suggestItem: SuggestResultItem) {
  window.open(suggestItem.fullURL, "_blank");
}

onMounted(() => {
  getFilterOptionsData();
});
</script>
