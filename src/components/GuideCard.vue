<template>
  <a
    :href="guide.fullURL"
    target="_blank"
    class="border border-gray-200 rounded-lg p-4 flex gap-4 shadow-sm group flex gap-4 rounded-lg border overflow-hidden bg-white shadow-sm hover:shadow-md transition"
  >
    <div class="w-1 bg-blue-500 group-hover:bg-blue-600 transition"></div>

    <div class="p-4 flex gap-4 flex-1">
      <img
        v-if="guide.thumbnailURL"
        :src="`https://beta3.infocaption.com/${guide.thumbnailURL}`"
        alt=""
        class="w-20 h-20 object-cover rounded-md"
      />
      <img v-else src="/src/assets/fallback-guide.svg" alt="" class="w-20 h-20 rounded-md" />

      <div class="flex-1">
        <h2
          class="font-semibold text-lg leading-tight mb-1 transition-colors group-hover:text-blue-700"
        >
          {{ guide.name }}
        </h2>

        <p class="text-sm text-gray-600 line-clamp-2">
          {{ guide.summary }}
        </p>
      </div>
    </div>
  </a>
</template>

<script lang="ts" setup>
import type { GuideSearchHit } from "@/types/Types";

interface Props {
  guide: GuideSearchHit;
}

defineProps<Props>();
</script>
