<template>
  <teleport to="#modal">
    <div id="center" v-if="isOpen">
      <h2>
        <slot>this is modal</slot>
      </h2>
      <h2>{{ lang }}</h2>
      <h2>{{ currentUser && currentUser.name }}</h2>
      <button @click="buttonClick">Close</button>
    </div>
  </teleport>
</template>

<script lang="ts">
import {defineComponent, inject} from "vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Modal.vue",
  props: {
    isOpen: Boolean
  },
  emits: {
    "close-modal": null
  },
  setup(props, context) {
    const lang = inject("lang");
    const currentUser = inject<{ name: string }>("currentUser");
    const buttonClick = () => {
      context.emit("close-modal");
    };
    return {
      buttonClick,
      lang,
      currentUser
    };
  }
});
</script>

<style scoped>
#center {
  width: 200px;
  height: 200px;
  border: 2px solid black;
  background: white;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -100px;
  margin-top: -100px;
}
</style>