<template>
  <Teleport to="body">
    <div
      v-if="visible && items.length > 0"
      class="absolute bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden"
      :style="dropdownStyles"
      ref="dropdownRef"
    >
      <ul class="max-h-64 overflow-auto">
        <li
          v-for="item in items"
          :key="item.id"
          class="px-4 py-2 cursor-pointer hover:bg-gray-100"
          @click="handleSelect(item.id)"
        >
          <slot name="item" :item="item">
            <span v-html="item.label"></span>
          </slot>
        </li>
      </ul>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, onBeforeUnmount, nextTick, type Component } from "vue";

interface DropdownItem {
  id: number;
  label: string | HTMLElement | Component;
}

interface Props {
  items: DropdownItem[];
  visible: boolean;
  anchor: HTMLElement | null;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  select: [item: number];
  close: [];
}>();

const dropdownRef = ref<HTMLElement | null>(null);
const dropdownStyles = ref<Record<string, string>>({});

const updatePosition = () => {
  if (!props.anchor) {
    return;
  }

  const rect = props.anchor.getBoundingClientRect();

  dropdownStyles.value = {
    position: "absolute",
    top: 3 + rect.bottom + window.scrollY + "px",
    left: rect.left + window.scrollX + "px",
    width: rect.width + "px",
  };
};

const handleClickOutside = (e: MouseEvent) => {
  const isOutside =
    dropdownRef.value &&
    !dropdownRef.value.contains(e.target as Node) &&
    props.anchor &&
    !props.anchor.contains(e.target as Node);

  if (isOutside) {
    emit("close");
  }
};

watch(
  () => props.visible,
  async (isVisible) => {
    if (isVisible) {
      await nextTick();
      updatePosition();
    }
  },
);

onMounted(() => {
  window.addEventListener("click", handleClickOutside);
  window.addEventListener("resize", updatePosition);
  updatePosition();
});

onBeforeUnmount(() => {
  window.removeEventListener("click", handleClickOutside);
  window.removeEventListener("resize", updatePosition);
});

function handleSelect(id: number) {
  emit("select", id);
}
</script>
