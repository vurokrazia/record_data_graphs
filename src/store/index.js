import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import Axios from "axios";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    services: {},
    rooms: {},
    registers: {},
    register: {},
    datos: {},
    dato: {}
  },
  getters: {
    register: function(state) {
      return state.register;
    }
  },
  mutations: {
    SET_ITEM(state, { item, id, resource }) {
      const newItem = item;
      newItem[".key"] = id;
      if (item) Vue.set(state[resource], id, newItem);
    },
    SET_RESOURCE(state, { item, resource }) {
      state[resource] = item;
    }
  },
  actions: {
    CREATE_NOTIFICATION_PUSH({ state, commit }, { uuid, resource }) {
      resource[
        "name"
      ] = `Dato: ${resource.number} || Hora:${resource.time} ${resource.format}`;
      Axios({
        method: "post",
        url: "https://fcm.googleapis.com/fcm/send",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization:
            "key=AAAAayW5TcE:APA91bFIa8Ob8HNPXbElJLDsLAtctz8BDmXQxLDAjIqouJ0Qtp74YKqx6eqOeHv70bf5R4ans4tri5KvPdBzo1wmsuO1tTDYiuhbbwoNzZRbbmCjZtJ6aH4pJq6C5CE98F1hFvL2HfJD"
        },
        data: {
          to: uuid,
          notification: { title: "TEst vue", body: "lorem" },
          data: resource
        }
      }).then(result => {
        commit("SET_ITEM", result.data);
        state.ok = true;
      });
    },
    CREATE_REGISTER: ({ state, commit }, register) => {
      const newRegister = { ...register };
      const registerId = firebase
        .database()
        .ref("registers")
        .push().key;
      console.log(state == null);
      const updates = {};
      updates[`registers/${registerId}`] = newRegister;
      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          commit("SET_ITEM", {
            resource: "registers",
            id: registerId,
            item: newRegister
          });
          return Promise.resolve(state.registers[registerId]);
        });
    },
    CREATE_DATOS: ({ state, commit }, register) => {
      if (!state.register) return;
      const newRegister = { ...register };
      const datoId = firebase
        .database()
        .ref("datos")
        .push().key;
      const updates = {};
      const key = state.register[".key"];
      updates[`datos/${key}/${datoId}`] = newRegister;
      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          commit("SET_ITEM", {
            resource: "datos",
            id: datoId,
            item: newRegister
          });
          return Promise.resolve(state.datos[datoId]);
        });
    },
    CREATE_ROOM: ({ state, commit }, room) => {
      const newRoom = room;
      const roomId = firebase
        .database()
        .ref("rooms")
        .push().key;
      delete newRoom[".key"];

      newRoom.userId = "s";
      console.log(state == null);
      const updates = {};
      updates[`rooms/${roomId}`] = newRoom;
      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          commit("SET_ITEM", {
            resource: "rooms",
            id: roomId,
            item: newRoom
          });
          return Promise.resolve(state.rooms[roomId]);
        });
    },
    FETCH_ROOMS: ({ state, commit }, limit) =>
      new Promise(resolve => {
        let instance = firebase.database().ref("rooms");
        if (limit) {
          instance = instance.limitToFirst(limit);
        }
        instance.once("value", snapshoot => {
          const rooms = snapshoot.val();
          Object.keys(rooms).forEach(roomId => {
            const room = rooms[roomId];
            commit("SET_ITEM", { resource: "rooms", id: roomId, item: room });
          });
          resolve(Object.values(state.rooms));
        });
      }),
    FETCH_REGISTERS: ({ state, commit }, limit) =>
      new Promise(resolve => {
        let instance = firebase.database().ref("registers");
        if (limit) {
          instance = instance.limitToFirst(limit);
        }
        instance.once("value", snapshoot => {
          const registers = snapshoot.val();
          Object.keys(registers).forEach(registerId => {
            const room = registers[registerId];
            commit("SET_ITEM", {
              resource: "registers",
              id: registerId,
              item: room
            });
          });
          resolve(Object.values(state.registers));
        });
      }),
    FETCH_DATOS: ({ state, commit }, limit) =>
      new Promise(resolve => {
        const key = state.register[".key"];
        let instance = firebase.database().ref(`datos/${key}`);
        if (limit) {
          instance = instance.limitToFirst(limit);
        }
        instance.once("value", snapshoot => {
          const datos = snapshoot.val();
          console.log(snapshoot.exists());
          if (snapshoot.exists()) {
            Object.keys(datos).forEach(datoId => {
              if (datos) {
                const room = datos[datoId];
                console.log({
                  resource: "datos",
                  id: datoId,
                  item: room
                });
                commit("SET_ITEM", {
                  resource: "datos",
                  id: datoId,
                  item: room
                });
              }
            });
          } else {
            state.datos = {};
          }
          resolve(Object.values(state.datos));
        });
      })
  },
  modules: {}
});
