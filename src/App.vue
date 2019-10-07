<template>
    <div id="app" class="app">
        <div class="app__container">
            <div class="app__sidebar">
                <v-sidebar></v-sidebar>
            </div>
            <div class="app__content">
                
            </div>
        </div>
    </div>
</template>
<script>
import "./assets/css/root.scss"
import "./assets/css/layout.scss"
import { mapGetters } from 'vuex'
import VSidebar from "./components/Sidebar/Sidebar"
export default {
    components: {
        VSidebar
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
        ...mapGetters(['GET_AIRLINES', 'GET_FLIGHTS'])
    },
    methods: {
        ls(){
            var sec = 90900 ;
            function getTimeString(sec){
                var cd = 24 * 60 * 60, ch = 60 * 60,
                    days = Math.floor(sec / cd),
                    hours = ''+Math.floor((sec - days * cd) / ch)
                    minutes = '0' + Math.round((sec - days * cd - hours * ch) / 60)

                //return (days > 0 ? days + ' '+v_days+' ' : '') + hours.substr(-2) + ' '+v_hours+' ' + (minutes.substr(-2) != '00' ? minutes.substr(-2) + ' '+ v_mins : '')
                console.log(days + "д " +  hours.substr(-2) + "ч " +  minutes.substr(-2) + "м ")
            }
            function dateDiffInDays(departure, arrival) {
            // https://stackoverflow.com/a/15289883
            var a = new Date(departure)
            var b = new Date(arrival)
            // Discard the time and time-zone information.
            var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
            var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())
            var msPerDay = 1000 * 60 * 60 * 24

            return Math.floor((utc2 - utc1) / msPerDay)
            }
            console.log(dateDiffInDays("2019-08-30T17:45:00+03:00", "2019-08-30T19:05:00+03:00"))
            getTimeString(sec)

            // Для вычисления времени
            var dep = journey.segments[0].dep_time
            var arr = journey.segments[journey.segments.length-1].arr_time

            var dep_s = dep.indexOf(',')
            var arr_s = arr.indexOf(',')
            var weekday_constant = 4
            var dep_date = dep.slice(0, dep_s + weekday_constant)
            var arr_date = arr.slice(0, arr_s + weekday_constant)
            var dep_time =  dep.slice(dep_s + weekday_constant)
            var arr_time =  arr.slice(arr_s + weekday_constant)
        }
    }
}
</script>