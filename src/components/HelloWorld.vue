<template>
  <div class="hello">
    <h1>{{ count }}</h1>
    <h1>{{ double }}</h1>
    <button @click="increase">👍+1</button>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, computed, reactive, toRefs} from "vue";


export default defineComponent({
  name: "HelloWorld",
  setup() {
    // ref 是一个函数，它接受一个参数，返回的就是一个神奇的 响应式对象 。我们初始化的这个 0 作为参数包裹到这个对象中去，在未来可以检测到改变并作出对应的相应。
    const count = ref(0)
    const double = computed(() => {
      return count.value * 2
    })
    const increase = () => {
      count.value++
    }
    return {
      count,
      double,
      increase
    }
  }

});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
