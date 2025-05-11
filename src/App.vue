<template>
  <div class="main">
    <Weather></Weather>
  </div>
</template>

<script setup>
import Weather from './components/Weather.vue';
</script>

<style>
.main {
  background-image: url(../src/assets/blue.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  height: 100vh;
}
</style>