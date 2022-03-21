<template>
  <div class="flex justify-center items-center flex-col">
    <!-- 
 -->
    <div class="w-5/6 flex flex-col justify-center items-start gap-3 mt-3">
      <h1 class="text-gray-500 text-sm font-semibold ml-1">Tasks</h1>
      <div v-for="(item, index) in listItems" :key="index" class="w-full">
        <ListItem
          :message="item.title"
          :checked="item.checked"
          :id="item._id"
          @updateList="updateList"
        ></ListItem>
      </div>
    </div>

    <div
      class="w-12 h-12 rounded-full bg-accent fixed bottom-0 right-0 m-5 cursor-pointer transform hover:scale-110 duration-200"
      @click="modalState = true"
    >
      <div
        class="relative rounded-full h-full flex justify-center items-center text-white text-4xl"
      >
        <font-awesome-icon icon="plus" class="text-xl" />
      </div>
    </div>
  </div>
  <transition name="slide">
    <div class="modal modal-open bg-transparent" v-if="modalState" id="modal-bg">
      <div class="modal-box p-2 pb-5" v-if="modalState">
        <div class="w-full flex flex-col justify-center items-center">
          <span class="w-12 h-1 rounded-sm bg-gray-300"></span>
          <h1 class="w-full text-xl font-semibold text-center py-2">Create Task</h1>
          <form
            @submit.prevent="submitNewItem"
            class="w-5/6 flex flex-col justify-center items-center"
          >
            <label class="label w-full">Task title</label>
            <input
              type="text"
              class="input w-full input-bordered"
              v-model="addListItem.title"
              placeholder="Item name..."
            />
            <label for="" class="label w-full">Task description</label>
            <textarea
              placeholder="Description..."
              name=""
              id=""
              cols="30"
              rows="5"
              class="textarea textarea-bordered w-full"
              v-model="addListItem.description"
            ></textarea>
            <div class="modal-action w-full">
              <button for="my-modal" class="btn btn-primary btn-block" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>
<style>
@keyframes slide-in {
  0% {
    transform: translateY(100%);
    opacity: 0%;
  }
  100% {
    transform: translateY(0%);
    opacity: 100%;
  }
}
.slide-enter-active {
  animation: slide-in 0.3s ease-in-out;
}
.slide-leave-active {
  animation: slide-in 0.3s reverse ease-in-out;
}
</style>
<script setup>
import { ref, computed, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import ListItem from "../../components/ListItem.vue";

const addListItem = reactive({
  title: "",
  description: "",
});

const modalState = ref(false);
document.body.addEventListener("click", (e) => {
  if (e.target.id === "modal-bg") {
    modalState.value = false;
  }
});

const store = useStore();
const baseUrl = computed(() => {
  return store.state.baseUrl;
});

onMounted(() => {
  getListItems();
});

let listItems = ref([]);

const submitNewItem = async () => {
  const user = store.state.user;
  const body = {
    uid: user.uid,
    checked: false,
    title: addListItem.title,
    description: addListItem.description,
  };
  console.log(body);
  const response = await fetch(baseUrl.value + "addlistitem/", {
    headers: { "Content-Type": "application/json" },
    method: "post",
    body: JSON.stringify(body),
  });
  getListItems();
  addListItem.description = "";
  addListItem.title = "";
  modalState.value = false;
};

const getListItems = async () => {
  const user = store.state.user;
  const uid = user.uid;

  const response = await fetch(
    baseUrl.value + "getlist?" + new URLSearchParams({ id: uid })
  );
  const list = await response.json();
  //console.log(list);
  listItems.value = list;
  console.log(listItems.value);
};

const updateList = (list) => {
  listItems.value = list;
};
</script>
