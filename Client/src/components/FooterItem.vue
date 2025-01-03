<script setup>
import ButtonItem from './ButtonItem.vue';
</script>

<template>
    <div class="buttons">
        <ButtonItem icon="Lightbulb" isEnabled entity="light.hunters_office"></ButtonItem>
        <ButtonItem icon="Lamp" entity="switch.hunters_office_lamp_switch_0"></ButtonItem>
        <ButtonItem icon="CoachLamp" isEnabled entity="light.porch"></ButtonItem>
        <ButtonItem icon="DeskLamp" isEnabled entity="switch.red_lamp_switch_0"></ButtonItem>
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
