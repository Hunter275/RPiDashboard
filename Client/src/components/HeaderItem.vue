<script setup>
import moment from 'moment';

</script>

<template>
  <div class="header">{{ moment().format('dddd, MMMM Do, YYYY') }}</div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: center;
  background-color: rgb(46, 46, 46);
  color: white;
  font-size: 1.5rem;
}
</style>
