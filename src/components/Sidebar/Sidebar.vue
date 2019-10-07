<template>
    <div class="sidebar">
        <v-sidebar-card 
            title="Опции тарифа" 
            class="sidebar__options"
            @reset="reset('tariff_options')"
            :options="tariffOptions">
            <template v-slot:action>
                <label 
                    class="sidebar-card__action" 
                    v-for="item in options" 
                    :key="item.value">
                    <input 
                        type="checkbox" 
                        class="sidebar-card__checkbox"
                        :value="item.value"
                        v-model="tariffOptions">
                    {{ item.title }}
                </label>
            </template>
        </v-sidebar-card>
        <v-sidebar-card 
            title="Авиакомпании" 
            class="sidebar__airlines"
            @reset="reset('airline_options')"
            :options="airlineOptions">
            <template v-slot:action>
                <label
                    @click.prevent="reset('airline_options')"
                    class="sidebar-card__action">
                    <input 
                        type="checkbox" 
                        class="sidebar-card__checkbox"
                        :class="!airline_options_all ? 'sidebar-card__checkbox-indeterminate' : ''"
                        :value="airline_options_all"
                        v-model="airline_options_all">
                    Все
                </label>
                <label 
                    class="sidebar-card__action" 
                    v-for="(value, key) in airlines"
                    :key="key">
                    <input 
                        type="checkbox" 
                        class="sidebar-card__checkbox"
                        :value="key" 
                        @change="chaneAirlineOptions"
                        v-model="airlineOptions">
                    {{ value }}
                </label>
            </template>
        </v-sidebar-card>
        <div 
            class="sidebar__reset action-link" 
            @click="reset">
            Сбросить все фильтры
        </div>
    </div>
</template>
<script>
import {  mapState } from "vuex"
import VSidebarCard from "../SidebarCard/SidebarCard"
export default {
    components: {
        VSidebarCard
    },
    data(){
        return{
            options: [
                {
                    title: "Только прямые",
                    value: "direct"
                },
                {
                    title: "Только с багажом",
                    value: "with_luggage"
                },
                {
                    title: "Только возвратные",
                    value: "refundable"
                },
            ],
        }
    },
    computed: {
        ...mapState([
            'airlines', 
            'airline_options', 
            'airline_options_all', 
            'tariff_options'
        ]),
        airlineOptions: {
            get(){
                return this.airline_options
            },
            set(value){
                this.$store.commit('SET_AIRLINE_OPTIONS', value)
            }
        },
        tariffOptions: {
            get(){
                return this.tariff_options;
            },
            set(value){
                this.$store.commit('SET_TARIFF_OPTIONS', value)
            }
        }
    },
    methods: {
        chaneAirlineOptions(){
            if(this.airlineOptions.length > 0){
                this.$store.commit('SET_AIRLINE_OPTIONS_ALL', false);
            }else{
                this.$store.commit('SET_AIRLINE_OPTIONS_ALL', true);
            }
        },
        reset(action){
            this.$store.commit('RESET_OPTIONS', action)
        }
    }
}
</script>
<style 
    lang="scss" 
    scoped
    src="./sidebar.scss">
</style>