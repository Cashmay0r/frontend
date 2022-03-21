<template>
  <div
    class="z-0 w-full h-12 rounded-lg bg-white flex justify-between px-4 items-center shadow-md gap-2"
    :id="id"
  >
    <div class="flex flex-row justify-center items-center gap-2">
      <input
        type="checkbox"
        class="checkbox checkbox-accent rounded-full border-2"
        :checked="details.checked"
        @click="details.checked = !details.checked"
      />
      <p
        v-text="props.message"
        class="text-black text-sm"
        :class="props.checked ? 'line-through' : ''"
      ></p>
    </div>

    <a
      @click="removeListItem"
      class="h-full w-10 flex justify-center items-center cursor-pointer transform duration-200 hover:scale-110"
      ><font-awesome-icon icon="trash" class="text-error w-full"
    /></a>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useStore } from "vuex";
import { computed, defineEmits, watch, ref, reactive } from "vue";
const emit = defineEmits(["updateList"]);
const props = defineProps({
  checked: {
    type: Boolean,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});

const details = reactive({
  checked: props.checked,
});

const baseUrl = computed(() => {
  return store.state.baseUrl;
});
const store = useStore();

watch(details, (checkedState) => {
  console.log("New active state: ", checkedState);
  updateItem(checkedState.checked);
});

const removeListItem = async () => {
  const response = await fetch(baseUrl.value + "removelistitem/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ _id: props.id, uid: store.state.user.uid }),
  });
  const res = await response.json();

  emit("updateList", res);
};

const updateItem = async (checkedState) => {
  const body = {
    uid: store.state.user.uid,
    _id: props.id,
    checked: checkedState,
  };
  const response = await fetch(baseUrl.value + "updatelistitem/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const res = await response.json();

  emit("updateList", res);
  console.log(res);
};
</script>
