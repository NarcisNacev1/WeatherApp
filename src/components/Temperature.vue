<template>
    <div class="temp">
        <h3>{{ Math.round(temperature) }}<sup>o</sup>C</h3>
    </div>
</template>

<script>
export default {
    props: ['temperature']
}
</script>

<style scoped>
.temp {
    background-color: rgba(0, 0, 0, 0.5);
    width: 200px;
    height: 200px;
    border-radius: 15px;
    margin: 0 auto;
    text-align: center;
    font-size: 50px;
    font-style: italic;
    font-weight: bold;
    color: white;
    padding-top: 50px;
    margin-top: 230px;
    margin-bottom: 50px;
}
</style>