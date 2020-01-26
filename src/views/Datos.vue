<template>
  <div class="datos">
    <h1>
      {{ register.day }} <strong> {{ `Estado: ${register.status}` }} </strong>
    </h1>
    <div>
      <p>{{ item.time }}</p>
      <input type="time" v-model="item.time" />
      <input type="number" v-model="item.number" />
      <button @click="createRegister">Crear</button>
    </div>
    <div>
      <ul>
        <li v-for="(dato, i) in $store.state.datos" :key="i">
          {{dato}}
          <p>
            Fecha:
            <strong>
              {{ `${dato.time} ${dato.format}` }}
            </strong>
            || Dato:
            <strong>
              {{ `${dato.number}` }}
            </strong>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getTimeNow, getTimeFormatNow } from "../mixins/utils";
import { mapGetters } from "vuex";
export default {
  watch: {
    register() {
      this.findRegisters();
    }
  },
  beforeCreate() {
    //this.$store.dispatch("CREATE_DATOS", this.item);
  },
  data() {
    return {
      item: {
        time: getTimeNow(),
        format: getTimeFormatNow(),
        number: 0
      }
    };
  },
  computed: {
    ...mapGetters(["register"])
  },
  methods: {
    findRegisters() {
      this.$store.dispatch("FETCH_DATOS", 12);
    },
    createRegister() {
      this.$store.dispatch("CREATE_DATOS", this.item);
      this.$store.dispatch("CREATE_NOTIFICATION_PUSH", {uuid:"fjX2u240Tz0:APA91bFeCOdgrDTzHy1We2EbB_fsErjcuam7QQhRvcK4vVA2g57OHd_K9wQLpdT6hll6fIEsDYxnjrC683HpvUREF5X5FQLa3yJyexV9t3jLfsWYTjwL5Qf19vufVBiKALCUzouf8Yr3",resource:this.item});
    }
  }
};
</script>

<style></style>
