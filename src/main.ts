import {createApp} from "vue";
// import App from "./App.vue";
import App from "./App2.vue";

const app = createApp(App);
app.provide("currentUser", {name: "aliyu"});
app.mount("#app");
