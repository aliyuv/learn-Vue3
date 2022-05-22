<template>
  <div class="app-2">
    <h1>{{ hello }}</h1>
    <h2>{{ count }}</h2>
    <button @click="count++">+1</button>
    <hello-world msg="hello world"></hello-world>
    <div v-if="hPress">h键被按下啦~</div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import HelloWorld from "@/components/HelloWorld.vue";
import useKeyDown from "@/hooks/useKeyDown";
const hello = "hello world!";
const count = ref(0);
const hPress = useKeyDown('h');
</script>

<style scoped>

</style>