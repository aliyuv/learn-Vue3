import {ref} from "vue";
import axios from "axios";

function useURLLoader<T>(url: string) {
    const result = ref<T | null>(null);
    const loading = ref(true);
    const loaded = ref(false);
    const errorMessage = ref(null);

    axios.get(url).then((rawData) => {
        loading.value = false;
        loaded.value = true;
        result.value = rawData.data;
    }).catch(e => {
        errorMessage.value = e;
        loading.value = false;
    });

    return {
        result,
        loading,
        errorMessage,
        loaded
    };
}

export default useURLLoader;
