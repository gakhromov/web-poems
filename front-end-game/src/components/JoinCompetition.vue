<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="form-group">
          <label for="username">Ваше имя</label>
          <input v-model="username" type="text" class="form-control" id="username">
        </div>
        <button @click="startGame" type="button" class="btn btn-primary">Начать игру</button>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';

export default {
  name: "JoinComponent",
  data() {
    return {
      username: "Игрок",
    };
  },
  methods: {
    startGame() {
      this.$router.push({name: 'Competition', params: {username: this.username}});
    },
  },
}
</script>
