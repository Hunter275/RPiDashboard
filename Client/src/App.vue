<script setup>
import ContentItem from './components/ContentItem.vue';
import FooterItem from './components/FooterItem.vue'
import HeaderItem from './components/HeaderItem.vue';
import LogsListItem from './components/LogsListItem.vue'

</script>

<template>
  <div class="page">
    <ContentItem></ContentItem>
  </div>
</template>

<style scoped>
.header {
  position: fixed;
  width: 100%;
}
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: rgb(31, 35, 40);
}
.logs {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  order: 1;
  overflow: scroll;
  padding-top: 5%;
  padding-bottom: 25%;
}
.footer {
  order: 2;
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
