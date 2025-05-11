<template>
    <div class="address"><span>{{ address }}</span></div>

    <div class="date"><span>{{ formattedDate }}</span></div>
</template>

<script>
export default {
    props: ['address', 'formattedDate']
}
</script>

<style scoped>
div {
    color: rgb(251, 251, 251);
}

.address {
    width: 350px;
    margin: 0 auto;
    text-align: center;
    font-size: 30px;
}

.date {
    font-size: 25px;
    width: 300px;
    margin: 0 auto;
    font-style: italic;
    text-align: center;
    margin-bottom: 50px;
}
</style>