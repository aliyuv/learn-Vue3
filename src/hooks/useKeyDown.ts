import {ref, onMounted, onUnmounted} from "vue";

/*
*   1可以在事件对象 event.key 上面拿到对应的按键名称
    2可以尝试在 keydown 和 keyup 两个 DOM 事件触发对应的修改
* */
const useKeyPress = (targetKeyCode: string) => {
    //定义变量确定某个键是否按下
    const keyPressed = ref(false);

    const keyDownHandler = (e: KeyboardEvent) => {
        if (e.key === targetKeyCode) {
            keyPressed.value = true;
        }
    };

    const keyUpHandler = (e: KeyboardEvent) => {
        if (e.key === targetKeyCode) {
            keyPressed.value = false;
        }
    };

    onMounted(() => {
        document.addEventListener("keydown", keyDownHandler);
        document.addEventListener("keyup", keyUpHandler);
    });

    onUnmounted(() => {
        document.addEventListener("keydown", keyDownHandler);
        document.addEventListener("keyup", keyUpHandler);
    });

    return keyPressed;
};

export default useKeyPress;