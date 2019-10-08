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
            const timeToString = sec => {
                const day_sec = 24 * 3600;
                const hour_sec = 3600;
                const days = Math.floor(sec / day_sec);
                const hours =
                    "" + Math.floor((sec - days * day_sec) / hour_sec);
                const minutes =
                    "0" +
                    Math.round((sec - days * day_sec - hours * hour_sec) / 60);
                return `${days > 0 ? days + " д " : ""}${hours.substr(-2)} ч ${
                    minutes.substr(-2) != "00" ? minutes.substr(-2) + " м" : ""
                }`;
            };
            const diffInDays = (departure, arrival) => {
                const date1 = new Date(departure);
                const date2 = new Date(arrival);
                const utc1 = Date.UTC(
                    date1.getFullYear(),
                    date1.getMonth(),
                    date1.getDate()
                );
                const utc2 = Date.UTC(
                    date2.getFullYear(),
                    date2.getMonth(),
                    date2.getDate()
                );
                const msPerDay = 1000 * 60 * 60 * 24;
                return Math.floor((utc2 - utc1) / msPerDay);
            };
            const flights = [];
            for (let flight of state.flights) {
                const itinerary = flight.itineraries[0][0];

                const first_segment = itinerary.segments[0];
                const last_segment =
                    itinerary.segments[itinerary.segments.length - 1];

                const stops_quantity = itinerary.stops;
                const stop_time = timeToString(itinerary.layovers[0]);

                const dep_time = first_segment.dep_time;
                const dep_s = dep_time.indexOf(",");

                const arr_time = last_segment.arr_time;
                const arr_s = arr_time.indexOf(",");

                const diffDay = diffInDays(
                    first_segment.dep_time_iso,
                    last_segment.arr_time_iso
                );

                let stops_origin = "";
                if (itinerary.segments.length === 1) {
                    stops_origin = "прямой рейс";
                } else if (itinerary.segments.length > 2) {
                    stops_origin = `${stops_quantity} пересадки`;
                } else {
                    stops_origin = `через ${first_segment.dest}, ${stop_time}`;
                }

                flights.push({
                    id: flight.id,
                    carrier_code: itinerary.carrier,
                    carrier_name: itinerary.carrier_name,
                    refundable: itinerary.refundable,
                    price: itinerary.price.amount,
                    currency: "₸",
                    traveltime: timeToString(itinerary.traveltime),
                    origin: first_segment.origin,
                    origin_code: first_segment.origin_code,
                    dest: last_segment.dest,
                    dest_code: last_segment.dest_code,
                    departure_date: dep_time.slice(0, dep_s + 4),
                    departure_time: dep_time.slice(dep_s + 4),
                    arrival_date: arr_time.slice(0, arr_s + 4),
                    arrival_time: arr_time.slice(arr_s + 4),
                    arrival_days_diff: diffDay,
                    stops: stops_origin,
                    direct: stops_origin === "прямой рейс",
                    with_luggage: true // не особо понял про багаж
                });
            }

            return flights.filter(el => {
                const with_luggage = state.tariff_options.includes(
                    "with_luggage"
                ) ? state.tariff_options.includes("with_luggage") && el.with_luggage : true;
                const direct = state.tariff_options.includes(
                    'direct'
                ) ? state.tariff_options.includes("direct") && el.direct : true;
                const refundable = state.tariff_options.includes(
                    'refundable'
                ) ? state.tariff_options.includes('refundable') && el.refundable : true;

                const airlines = state.airline_options.length !== 0 ?
                    state.airline_options.includes(el.carrier_code) : true;
                    
                return with_luggage && direct && refundable && airlines;
            });
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
            } else if (action === "airline_options") {
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
