<script setup>
import ButtonItem from './ButtonItem.vue';

const props = defineProps({
  ha: {
    type: Object,
    required: true,
    default: {}
  }
})

console.log(props.ha);
</script>

<template>
    <div class="buttons">
        <ButtonItem icon="Lightbulb" :isEnabled="false" entity="light.hunters_office"></ButtonItem>
        <ButtonItem icon="Lamp" :isEnabled="false" entity="switch.hunters_office_lamp_switch_0"></ButtonItem>
        <ButtonItem icon="CoachLamp" :isEnabled="false" entity="light.porch"></ButtonItem>
        <ButtonItem icon="DeskLamp" :isEnabled="false" entity="switch.red_lamp_switch_0"></ButtonItem>
    </div>
</template>

<style scoped>
.buttons {
    display: flex;
    justify-content: space-between;
    background-color: rgb(46, 46, 46);
    padding: 2% 2% 2% 2%;
    color: white;
}
</style>
