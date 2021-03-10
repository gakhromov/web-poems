<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="form-group">
          <label for="username">Ваше имя</label>
          <input v-model="username" type="text" class="form-control" id="username">
        </div>
        <div class="form-group">
          <label for="sessionId">Номер сессии</label>
          <input v-model="sessionId" type="text" class="form-control" id="sessionId">
          <small id="sessionIdHelp" class="form-text text-muted">Вам не нужно вводить id сессии, если вы хотите ее создать</small>
        </div>
        <button @click="startGame" type="button" class="btn btn-primary">Начать игру</button>
        
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "JoinComponent",
  data() {
    return {
      username: "Игрок",
      sessionId: "",
    };
  },
  methods: {
    startGame() {
      if (this.sessionId === "") {
        // new game
        axios.post(`${this.$back}/game/new`, {
          username: this.username,
        })
        .then((response) => {
          this.sessionId = response.data.session_id;
          // start game
        }, (error) => {
          console.log(error);
        });
      }
      else {
        // join game
        axios.post(`${this.$back}/game/join`, {
          username: this.username,
          session_id: this.sessionId,
        })
        .then(() => {
          // start game
        }, (error) => {
          alert("Неверный код комнаты!");
          console.log(error);
        });
      }
    }
  },
}
</script>
