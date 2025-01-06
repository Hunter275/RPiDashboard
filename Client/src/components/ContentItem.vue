<script setup>
import moment from 'moment';
import LogItem from './LogItem.vue';
import socket from '../socket';
import { getLatestLogs } from "../Services/LogService.js";
import {
  getAuth,
  createLongLivedTokenAuth,
  createConnection,
  subscribeEntities,
  ERR_HASS_HOST_REQUIRED,
} from "home-assistant-js-websocket";
import { ref }  from 'vue';

import HeaderItem from './HeaderItem.vue';
import LogsListItem from './LogsListItem.vue';
import FooterItem from './FooterItem.vue';

const logs = ref([]);
let ha = ref([]);
//props.logs = [{ id: 1, title: "Test logs", msg: "Test message", date: "Today"}];

const created = async () => {
  console.log("STARTING!!!!!!");
  await getLatestLogs(10).then((result) => {
    result.map((r) => {
      logs.value.push(r);
    })
  })


  const entityWhitelist = [""];
  const typeWhiteList = ["switch", "light"];

  const processHA = (ent) => {
    //logs.value.push({id: logs.length, title: "New Logs", msg: "New Log", date: "Today"});
    //console.log(ent);
    if (!ha.value) {
      ha.value = ent;
    }
    else {
      for (const e in ha.value) {
        if (entityWhitelist.includes(e) || typeWhiteList.includes(e.split(".")[0])) {
          if (ha.value[e].state !== ent[e].state && ha.value[e].state !== "unavailable") {
            console.log("Pushing log");
            logs.value.push({ id: logs.length, title: "Home Assistant", msg: `${ent[e].attributes.friendly_name} state changed to ${ent[e].state}` })
          }
        }
      }
      ha.value = ent;
    }
  }

  let auth;
  try {
    const hassUrl = "http://192.168.1.177:8123";
    // Try to pick up authentication after user logs in
    //auth = await getAuth({ hassUrl: "http://192.168.1.177:8123", authCode: import.meta.env.VITE_HATOKEN });
    auth = createLongLivedTokenAuth(hassUrl, import.meta.env.VITE_HATOKEN)
  } catch (err) {
    if (err === ERR_HASS_HOST_REQUIRED) {
      // Redirect user to log in on their instance
      auth = await getAuth({ hassUrl });
    } else {
      alert(`Unknown error: ${err}`);
      return;
    }
  }
  const connection = await createConnection({ auth });
  subscribeEntities(connection, (ent) => processHA(ent));

  socket.on('log', (log) => {
    const parsedLog = JSON.parse(log);
    parsedLog.id = logs.length;
    logs.push(parsedLog);
  });
}

created();
</script>

<template>
    <HeaderItem class="header"></HeaderItem>
    <LogsListItem class="logs"  :logs=logs></LogsListItem>
    <FooterItem class="footer" :ha=ha.value></FooterItem>
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
