// import {reactive, onMounted, onUnmounted, toRefs} from "vue";
//
// function useMousePosition() {
//     const data = reactive({
//         x: 0,
//         y: 0,
//         UpdateMouse: (e: MouseEvent) => {
//             data.x = e.pageX;
//             data.y = e.pageY;
//         },
//         onMounted: onMounted(() => {
//             document.addEventListener("click", data.UpdateMouse);
//         }),
//         onUnMounted: onUnmounted(() => {
//             document.addEventListener("click", data.UpdateMouse);
//         })
//     });
//     const result = toRefs(data);
//     return {
//         ...result
//     };
// }
//
// export default useMousePosition;


import {ref, onMounted, onUnmounted} from "vue";

function useMousePosition() {
    const x = ref(0);
    const y = ref(0);
    const updateMouse = (e: MouseEvent) => {
        x.value = e.pageX;
        y.value = e.pageY;
    };
    onMounted(() => {
        document.addEventListener("click", updateMouse);
    });
    onUnmounted(() => {
        document.removeEventListener("click", updateMouse);
    });
    return {x, y};
}

export default useMousePosition;