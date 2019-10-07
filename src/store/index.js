import Vue from "vue";
import Vuex from "vuex";
import ApiResult from "./api/results.json";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        airlines: null,
        flights: null,
        airline_options: [],
        tariff_options: [],
        airline_options_all: true
    },
    getters: {
        GET_FLIGHTS(state) {
            return state.flights;
        }
    },
    mutations: {
        SET_AIRLINES(state, airlines) {
            state.airlines = airlines;
        },
        SET_FLIGHTS(state, flights) {
            state.flights = flights;
        },
        SET_AIRLINE_OPTIONS(state, options) {
            state.airline_options = options;
        },
        SET_AIRLINE_OPTIONS_ALL(state, value) {
            state.airline_options_all = value;
        },
        SET_TARIFF_OPTIONS(state, options) {
            state.tariff_options = options;
        },
        RESET_OPTIONS(state, action) {
            if (action === "tariff_options") {
                state.tariff_options = [];
            } else if (action === "airline__options") {
                state.airline_options_all = true;
                state.airline_options = [];
            } else {
                state.airline_options_all = true;
                state.tariff_options = [];
                state.airline_options = [];
            }
        }
    },
    actions: {
        async GET_DATA({ commit }) {
            // Имитация получение данных с Api
            try {
                commit("SET_AIRLINES", ApiResult.airlines);
                commit("SET_FLIGHTS", ApiResult.flights);
            } catch (err) {
                console.log(err);
            }
        }
    }
});
