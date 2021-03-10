<template>
  <div class="container">
    <h1>Участвовать в соревновании</h1><br>
    <div class="row">
      <div class="col">
        <div class="form-group">
          <label for="username">Ваше имя</label>
          <input v-model="username" type="text" class="form-control" id="username" placeholder="Вася">
        </div>
        <button @click="startGame" type="button" class="btn btn-success">Начать игру</button>
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
      username: "",
    };
  },
  methods: {
    startGame() {
      if (this.username == "")
        alert("Введите имя!");
      else
        this.$router.push({name: 'Competition', params: {username: this.username}});
    },
  },
}
</script>
