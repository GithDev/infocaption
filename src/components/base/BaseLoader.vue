<template>
  <div>
    <div class="overlay" :class="{ hide: !modelValue }"></div>
    <div
      class="fadeIn fixed inset-0 z-[999] flex items-center justify-center pointer-events-none"
      :class="{ hide: !modelValue }"
    >
      <div
        class="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  modelValue: boolean;
}

defineProps<Props>();
</script>

<style scoped>
.overlay {
  position: absolute;
  inset: 0;
  backdrop-filter: blur(2px);
  z-index: 10;

  opacity: 1;
  transition: opacity 0.6s ease;
}

.hide {
  opacity: 0 !important;
}

.fadeIn {
  opacity: 1;
  transition: opacity 1s ease;
}
</style>
