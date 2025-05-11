<script setup lang="ts">
import { TemperatureProps } from "../interfaces/temperatures.interface.ts";

defineProps<TemperatureProps>();
</script>

<template>
    <div class="temp">
        <h3>{{ Math.round(temperature || 0) }}<sup>o</sup>C</h3>
    </div>
</template>

<style scoped>
.temp {
    background-color: rgba(0, 0, 0, 0.5);
    width: 200px;
    height: 200px;
    border-radius: 15px;
    text-align: center;
    font-size: 50px;
    font-style: italic;
    font-weight: bold;
    color: white;
    padding-top: 50px;
    margin: 230px auto 50px;
}
</style>