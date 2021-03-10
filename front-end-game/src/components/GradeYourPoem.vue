<template>
  <div class="container">
    <form>
      <div class="form-group">
        <label for="username">Введите Ваше имя</label>
        <input v-model="username" type="text" class="form-control" id="username">
      </div>
      <div class="form-group">
        <label for="poem">Ваше стихотворение</label>
        <textarea v-model="poem" class="form-control" id="poem" rows="3"></textarea>
      </div>
      <button @click="sendPoem" type="button" class="btn btn-success">Отправить</button>
      <br><br>
      <label v-if="poemGrade != null" class="result">Количество набранных баллов = <b>{{poemGrade}}</b>. Место в лидерборде = <b>{{rank}}</b></label>
    </form>
  </div>
</template>

<style scoped>
.result {
  background: lightblue;
  border: 2px solid darkcyan;
  border-radius: 5px;
}
</style>

<script>
import axios from 'axios'

export default {
  name: "GradeYourPoem",
  data() {
    return {
      username: "",
      poem: "",
      poemGrade: null,
      rank: null,
    };
  },
  methods: {
    sendPoem() {
      axios.post(`${this.$back}/poem-info`, {
        username: this.username,
        poem: this.poem,
      })
      .then((response) => {
        this.poemGrade = response.data.grades.poem;
        this.rank = response.data.rank;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    },
  },
}
</script>