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

</template>

<script lang="ts">
import {computed, defineComponent, reactive, toRefs, onMounted, onUpdated, onRenderTriggered, watch, ref} from "vue";
import useMousePosition from "@/hooks/useMousePosition";

interface DataProps {
  count: number;
  double: number;
  increase: () => void;
}

export default defineComponent({
  name: "App",
  setup: function () {
    const RefUseMousePosition = toRefs(useMousePosition());
    console.log(RefUseMousePosition);
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
    return {
      ...refData,
      greetings,
      updateGreeting,
      ...RefUseMousePosition
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
