<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <h1>{{ count }}</h1>
  <h1>{{ double }}</h1>
  <button @click="increase">+1</button>

  <h1>{{ greetings }}</h1>
  <button @click="increase">+1</button>
  <button @click="updateGreeting">update title</button>

  <h2>----------改写reactive版本----------</h2>
  <h1>X: {{ x }}</h1>
  <h1>Y: {{ y }}</h1>

  <h2>----------模块化难度上升------------</h2>
  <h1 v-if="loading">Loading!---</h1>
  <img v-if="loaded" :src="result[0].url" alt="">

  <h2>--------------Teleport---------------</h2>
  <button @click="openModal">Open Modal</button>
  <Modal :is-open="modalIsOpen" @close-modal="onModalClose">My Modal !!!!</Modal>

  <h1>---------------suspense-------------------</h1>
  <p>{{ errorMessage }}</p>
  <Suspense>
    <template #default>
      <!--      [Vue warn]: ＜Suspense＞ slots expect a single root node.-->
      <div>
        <AsyncShow></AsyncShow>
        <DogShow></DogShow>
      </div>
    </template>
    <template #fallback>
      <h1>Loading!!!!!!!!!!</h1>
    </template>
  </Suspense>

  <h1>------------------provide----------------</h1>
  <button @click="changeLang('en')">英文</button>
  <button @click="changeLang('cn')">中文</button>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  onUpdated,
  onRenderTriggered,
  watch,
  ref,
  onErrorCaptured,
  provide
} from "vue";
import useMousePosition from "@/hooks/useMousePosition";
import useURLLoader from "@/hooks/useURLLoader";
import Modal from "@/components/Modal.vue";
import AsyncShow from "@/components/AsyncShow.vue";
import DogShow from "@/components/DogShow.vue";

interface DataProps {
  count: number;
  double: number;
  increase: () => void;
}

interface DogResult {
  message: string;
  status: string;
}

interface CatResult {
  id: string;
  url: string;
  width: number;
  height: number;
}

export default defineComponent({
  name: "App",
  components: {Modal, AsyncShow, DogShow},
  setup: function () {
    const {x, y} = useMousePosition();
    // const {result, loading, loaded} = useURLLoader<DogResult>("https://dog.ceo/api/breeds/image/random");
    const {result, loading, loaded} = useURLLoader<CatResult[]>("https://api.thecatapi.com/v1/images/search");

    // provide 提供数据
    const lang = ref("en");
    provide("lang", lang);
    const changeLang = (type: string) => {
      lang.value = type;
    };


    const errorMessage = ref(null);
    onErrorCaptured((err: any) => {
      errorMessage.value = err;
      return true;
    });
    watch(result, () => {
      if (result.value) {
        console.log(result.value[0].url);
      }
    });
    onMounted(() => {
      console.log("mounted");
    });
    onUpdated(() => {
      console.log("updated");
    });
    onRenderTriggered((event) => {
      console.log(event);
    });

    const data: DataProps = reactive({
      count: 0,
      increase: () => {
        data.count++;
      },
      double: computed(() => data.count * 2)
    });
    const greetings = ref("");
    const updateGreeting = () => {
      greetings.value += "Hello!";
    };
    // watch 多个值，返回的也是多个值的数组
    watch([greetings, () => data.count], (newValue, oldValue) => {
      console.log("old", oldValue);
      console.log("new", newValue);
      document.title = "updated" + greetings.value + data.count;
    });
    const refData = toRefs(data);
    const modalIsOpen = ref(false);
    const openModal = () => {
      modalIsOpen.value = true;
    };
    const onModalClose = () => {
      modalIsOpen.value = false;
    };
    return {
      ...refData,
      greetings,
      updateGreeting,
      x,
      y,
      result,
      loading,
      loaded,
      modalIsOpen,
      openModal,
      onModalClose,
      errorMessage,
      lang,
      changeLang
    };
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
