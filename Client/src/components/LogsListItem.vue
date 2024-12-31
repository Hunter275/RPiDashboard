<script>
import moment from 'moment';
import LogItem from './LogItem.vue';
import socket from '../socket';
import homesocket from '../socket';
import { getLatestLogs } from "../Services/LogService.js";
import {
  getAuth,
  createConnection,
  subscribeEntities,
  ERR_HASS_HOST_REQUIRED,
} from "home-assistant-js-websocket";

export default {
  data() {
    return {
      logs: [],
      ha: null,
      newMessage: ''
    };
  },
  async created() {
    this.logs = await getLatestLogs(10);

    const entityWhitelist = [""];
    const typeWhiteList = ["switch", "light"];
    const type = [""];

    const processHA = (ent) => {
      if (!this.ha) {
        this.ha = ent;
      }
      else {
        for (const e in this.ha) {
          //console.log(ent[e].entity_id);
          if (entityWhitelist.includes(e) || typeWhiteList.includes(e.split(".")[0])) {
            if (this.ha[e].state !== ent[e].state) {
              this.logs.push({ id: this.logs.length, title: "Home Assistant", msg: `${ent[e].attributes.friendly_name} state changed to ${ent[e].state}` })
            }
          }
        }
        this.ha = ent;
      }
    }

    let auth;
    try {
      // Try to pick up authentication after user logs in
      auth = await getAuth();
    } catch (err) {
      if (err === ERR_HASS_HOST_REQUIRED) {
        const hassUrl = "http://192.168.1.177:8123";
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
      parsedLog.id = this.logs.length;
      this.logs.push(parsedLog);
    });
  },
  methods: {
    createLog() {
      if (this.newMessage.trim() !== '') {
        socket.emit('log', this.newMessage);
        this.newMessage = '';
      }
    }
  }
};
</script>

<template>
  <div>
    <LogItem
      v-for="(log, index) in logs.slice().reverse()"
      :key = "log.id"
      :title = "log.title"
      :msg = "log.msg"
      :date = "log.date"
      @remove="logs.splice(index, 1)"
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
