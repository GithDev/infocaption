<template>
  <button
    v-bind="$attrs"
    :disabled="isLoading || !!$attrs.disabled"
    class="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md disabled:opacity-50 transition"
  >
    <SimpleSpinner v-show="isLoading" />
    <div :class="{ invisible: isLoading }">
      <slot></slot>
    </div>
  </button>
</template>

<script lang="ts" setup>
import SimpleSpinner from "@/components/base/BaseSpinner.vue";

interface Props {
  isLoading?: boolean;
}

withDefaults(defineProps<Props>(), {
  isLoading: false,
});
</script>
