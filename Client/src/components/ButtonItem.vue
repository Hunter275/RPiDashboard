<script setup>
import { toggle, getState } from '@/Services/HomeAssistantService';
import '@jamescoyle/svg-icon'

const toggleEntity = async (entity_id, event) => {
  toggle(entity_id);
  const state = await getState(entity_id);
  if (state.state === 'on') {
    event.srcElement.class = `${event.class} enabled`;
    return true;
  }
  return false;
};
defineProps({
  entity: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true,
  },
  isEnabled: {
    type: Boolean,
    required: false,
  },
})
</script>

<template>
    <div class="button" @click="toggleEntity(entity, $event)">
      <div class="icon"><mdicon :name=icon size="130"/></div>
      <div class="status" :class="{ enabled: isEnabled }"></div>
    </div>
</template>

<style scoped>
.button {
    width: 150px;
    height: 150px;
    background-color: rgb(140, 140, 140);
    border-radius: 5%;
    display: flex;
    flex-direction: column;
}
.icon {
  display: flex;
  justify-content: center;
}
.status {
  width: 130px;
  height: 10px;
  margin-left: 10px;
  border-radius: 5%;
  background-color: rgb(80, 80, 80);
}
.enabled {
  background-color: yellow;
}
</style>
