<script setup>
import LogItem from './LogItem.vue';
import { computed } from 'vue';

const props = defineProps({
  logs: {
    type: Array,
    required: true,
  }
})


</script>

<template>
  <div>
    <LogItem
      v-for="(log, index) in logs.slice().reverse()"
      :key = "log.id"
      :title = "log.title"
      :msg = "log.msg"
      :date = "log.date"
      @remove="props.logs.splice(index, 1)"
    ></LogItem>
  </div>
</template>


<style>
.chat {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.messages {
  flex: 1;
  overflow-y: auto;
}
.message {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
input {
  padding: 10px;
  border: 1px solid #ccc;
  width: 100%;
  box-sizing: border-box;
}
</style>
