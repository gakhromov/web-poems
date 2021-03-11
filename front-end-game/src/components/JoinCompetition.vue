<template>
  <div class="container">
    <div class="row">
      <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12">
        <h1>Участвовать в соревновании</h1><br>
        <p>Здесь Вы можете попрактиковаться в написании стихотворений, но не просто, а с помощью нейросети!<br>
        <p>Компьютер будет генерировать по две стихотворные строки, а Вы должны будете дополнить их двумя своими.<br>
        <p>Игра ведется до <b>16</b> строк. Затем нейросеть начислит вам очки за Ваши строки и покажет какое место среди других игроков Вы заняли.<br>
        <p>Если ваше творчество войдет в топ-100 лучших стихов, то оно будет опубликовано таблице лидеров 🙂</p><br>
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
      <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 d-none d-lg-block">
        <img src="@/assets/competition.jpg" class="regular" height="550px"/>
      </div>
    </div>
  <br><br>
  </div>
</template>

<style scoped>
li {
  list-style: none;
}
</style>

<script>

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
