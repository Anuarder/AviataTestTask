<template>
    <div class="result">
        <div 
            class="result__card"
            v-for="item in flights"
            :key="item.id">
            <div class="result__info">
                <div class="result__info-content">
                    <div class="result__carrier">
                        <img 
                            :src="`https://aviata.kz/static/airline-logos/80x80/${item.carrier_code}.png`" 
                            :alt="item.carrier_name">
                        {{item.carrier_name}}
                    </div>
                    <div class="result__itinerary">
                        <div class="result__departure">
                            <h5>{{item.departure_date}}</h5>
                            <h2>{{item.departure_time}}</h2>
                        </div>
                        <div class="result__itinerary-content">
                            <div class="result__itinerary-container">
                                <div class="result__itinerary-origin">
                                    {{item.origin_code}}
                                </div>
                                <div class="result__itinerary-traveltime">
                                    {{item.traveltime}}
                                </div>
                                <div class="result__itinerary-dest">
                                    {{item.dest_code}}
                                </div>
                            </div>
                            <div class="result__itinerary-line">
                                <img src="@/assets/images/line.svg" alt="line">
                            </div>
                            <div class="result__itinerary-stops">
                                <span :style="item.direct ? 'color: #55BB06' : 'color: #FF9900'">
                                    {{item.stops}}
                                </span>
                            </div>
                        </div>
                        <div class="result__arrival">
                            <h5>
                                {{item.arrival_date}} 
                                <span v-if="item.arrival_days_diff">
                                    +{{item.arrival_days_diff}}
                                </span> 
                            </h5>
                            <h2>{{item.arrival_time}}</h2>
                        </div>
                    </div>
                </div>
                <div class="result__info-footer">
                    <div class="result__detail action-link">
                        Детали перелета
                    </div>
                    <div class="result__conditions action-link">
                        Условия тарифа
                    </div>
                    <div class="result__refundable" v-show="!item.refundable">
                        <img src="@/assets/images/refundable.svg" alt="refundable">
                        невозвратный
                    </div>
                </div>
            </div>
            <div class="result__actions">
                <h1>
                    {{item.price}}
                    {{item.currency}}
                </h1>
                <button class="result__buy">Выбрать</button>
                <h5>Цена за всех пассажиров</h5>
                <div class="result__services">
                    <span>Нет багажа</span>
                    <button>+ Добавить багаж</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex"
export default {
    computed: {
        ...mapGetters(['GET_FLIGHTS']),
        flights(){
            return this.GET_FLIGHTS;
        }
    }
}
</script>
<style 
    lang="scss" 
    scoped
    src="./result.scss">
</style>