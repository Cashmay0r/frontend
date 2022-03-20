<template>
  <div class="flex justify-center items-center flex-col">
    <div class="w-full flex flex-col justify-start items-center">
      <form @submit.prevent="submitNewItem" class="w-5/6 flex flex-col justify-center items-center text-white">
        <label class="label text-black w-full">Enter new Item</label>
        <input type="text" class="input w-full" v-model="addListItem" placeholder="Item name..." />
        <input type="submit" hidden />
      </form>
    </div>

    <div class="w-5/6 flex flex-col justify-center items-start gap-1 mt-3">
      <h1 class="text-black text-xl font-semibold">List Items:</h1>
      <div v-for="(item, index) in listItems" :key="index" class="w-full">
        <ListItem :message="item.message" :active="item.active"></ListItem>
      </div>
    </div>
  </div>
</template>
<script setup>
  import {ref, computed, onMounted, reactive} from 'vue';
  import {useStore} from 'vuex';
  import ListItem from '../../components/ListItem.vue';
  const addListItem = ref('');

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
      active: true,
      message: addListItem.value,
    };
    console.log(body);
    const response = await fetch(baseUrl.value + 'addlistitem/', {headers: {'Content-Type': 'application/json'}, method: 'post', body: JSON.stringify(body)});
    getListItems();
    addListItem.value = '';
  };

  const getListItems = async () => {
    const user = store.state.user;
    const uid = user.uid;

    const response = await fetch(baseUrl.value + 'getlist?' + new URLSearchParams({id: uid}));
    const list = await response.json();
    //console.log(list);
    listItems.value = list;
  };
</script>
