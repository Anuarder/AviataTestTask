<template>
    <div id="app" class="app">
        <div class="app__container">
            <div class="app__sidebar">
                <v-sidebar></v-sidebar>
            </div>
            <div class="app__content">
                <v-result></v-result>
            </div>
        </div>
    </div>
</template>
<script>
import "./assets/css/root.scss"
import "./assets/css/layout.scss"
import { mapGetters } from 'vuex'
import VSidebar from "./components/Sidebar/Sidebar"
import VResult from "./components/Result/Result"
export default {
    components: {
        VSidebar,
        VResult
    },
    data(){
        return{
            data: null
        }
    },
    created(){
        this.$store.dispatch('GET_DATA');
    },
    computed: {
        ...mapGetters(['GET_FLIGHTS'])
    },
    methods: {
        ls(){
            // Для вычисления времени
            
        }
    }
}
</script>