<template>
  <div class="about">
    <h1 @click="createRoom">This is an about page</h1>
    <p v-for="(room,i) in $store.state.rooms" :key="i">
      {{room}}
    </p>
  </div>
</template>
<script>
export default {
  beforeCreate() {
    this.$store.dispatch('FETCH_ROOMS', 12);
  },
  mounted(){
    console.log(this.$store.state.rooms);
  },
  methods:{
    createRoom(){
      console.log(this.$store.state.rooms['-KxxSnNltjgIvlwAjmW9'])
      this.$store.dispatch('CREATE_ROOM', this.$store.state.rooms['-KxxSnNltjgIvlwAjmW9']);
    }
  }
}
</script>

<style>

</style>