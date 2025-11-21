<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        @click="closeModal"
      ></div>

      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div
          class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
        >
          <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <!-- Icon slot -->
              <div
                v-if="$slots.icon"
                class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10"
              >
                <slot name="icon"></slot>
              </div>

              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <!-- Title -->
                <h3
                  v-if="title"
                  class="text-base font-semibold leading-6 text-gray-900"
                  id="modal-title"
                >
                  {{ title }}
                </h3>

                <div class="mt-2">
                  <slot></slot>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <slot name="actions">
              <button
                @click="closeModal"
                type="button"
                class="inline-flex w-full justify-center rounded-md bg-white border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 sm:ml-3 sm:w-auto"
              >
                Stäng
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
interface Props {
  modelValue: boolean;
  title?: string;
}

interface Emits {
  (e: "update:modelValue", value: boolean): void;
  (e: "close"): void;
}

defineProps<Props>();

const emit = defineEmits<Emits>();

function closeModal() {
  emit("update:modelValue", false);
  emit("close");
}
</script>
