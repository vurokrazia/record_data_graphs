<template>
  <div class="about">
    <h1>Registros</h1>
    <div>
      <p>{{ item.day }}</p>
      <input type="date" v-model="item.day" />
      <button @click="createRegister">Crear</button>
    </div>
    <div>
      <ul>
        <li
          v-for="(register, i) in $store.state.registers"
          :key="i"
          @click="findItem(i)"
        >
          <p>
            Fecha:
            <strong>
              {{ `${register.day}` }}
            </strong>
            || Estado:
            <strong>
              {{ `${register.status}` }}
            </strong>
          </p>
        </li>
      </ul>
    </div>
    <display-datos />
  </div>
</template>
<script>
import { getDateTimeNow } from "../mixins/utils";
import DisplayDatos from "./Datos";
export default {
  beforeCreate() {
    this.$store.dispatch("FETCH_REGISTERS", 12).then(() => {
      this.assignItem(0);
    });
  },
  components: { DisplayDatos },
  data() {
    return {
      item: {
        day: getDateTimeNow(),
        status: "Bien"
      }
    };
  },
  methods: {
    createRegister() {
      this.$store.dispatch("CREATE_REGISTER", this.item);
    },
    assignItem(i) {
      let key = Object.keys(this.$store.state.registers)[i];
      this.findItem(key);
    },
    findItem(key) {
      this.$store.commit("SET_RESOURCE", {
        item: this.$store.state.registers[key],
        resource: "register"
      });
    }
  }
};
</script>

<style></style>
