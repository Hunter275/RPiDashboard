<script setup>
import moment from 'moment-timezone';
import { computed } from 'vue';


const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  }
})

const convertedDate = computed(() => {
  //return props.date;
  return moment.utc(props.date).utcOffset(-300).format('dddd, MMMM Do, YYYY - hh:mm:ss A');
});
</script>

<template>
    <div class="log">
        <div class="header">
            <div class="title">{{ title }}</div>
            <div class="date">{{ convertedDate }}</div>
        </div>
        <div class="msg">{{ msg }}</div>
    </div>
    <hr>
</template>

<style scoped>
.log {
    display: flex;
    flex-direction: column;
    padding: 2% 2% 2% 2%;

}
.header {
    display: flex;
    order: 0
}
.title {
    color: white;
    order: 0;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 2rem;
    flex-grow: 1;
}
.date {
    color: white;
    order: 1;
    font-size: 1rem;
    align-content: center;
}
.msg {
    color: white;
    order: 1;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.4rem;
}
</style>
