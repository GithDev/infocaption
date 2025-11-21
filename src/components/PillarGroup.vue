<template>
  <button
    v-for="item in items"
    :key="item.id"
    @click="toggle(item.id)"
    :class="[
      'px-3 py-1 rounded-full text-sm border transition',
      modelValue.includes(item.id)
        ? 'bg-blue-100 text-blue-700 border-blue-300'
        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100',
    ]"
  >
    {{ item.label }}
  </button>
</template>

<script lang="ts" setup>
import { type Component } from "vue";

interface Item {
  id: number;
  label: string | HTMLElement | Component;
}

interface Props {
  items: Item[];
  modelValue: number[];
}

interface Emits {
  (e: "update:modelValue", value: number[]): void;
  (e: "change"): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

function toggle(id: number) {
  const exists = props.modelValue.includes(id);
  if (exists) {
    emit(
      "update:modelValue",
      props.modelValue.filter((item) => item !== id),
    );
  } else {
    emit("update:modelValue", [...props.modelValue, id]);
  }

  emit("change");
}
</script>
