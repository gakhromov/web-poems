<template>
  <div class="container">
    <div class="row">
      <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12">
        <h1>Оценка стихотворения</h1><br>
        <p>
        Здесь Вы можете узнать сколько баллов начислит Вам наша нейросеть за Ваше стихотворение и сравнить свой результат с другими игроками. Дополнительные баллы выдаются за: 
        </p>
        <ul>
        <li>Рифмы к другим строками</li>
        <li>Сложные стихотворные стопы (дактиль, амфибрахий, анапест)</li>
        </ul>
        <form>
          <div class="form-group">
            <label for="username">Введите Ваше имя</label>
            <input v-model="username" type="text" class="form-control" id="username" placeholder="Вася">
          </div>
          <div class="form-group">
            <label for="poem">Ваше стихотворение</label>
            <textarea v-model="poem" class="form-control" id="poem" rows="3" placeholder="Люблю грозу в начале мая..."></textarea>
          </div>
          <button @click="sendPoem" type="button" class="btn btn-success">Отправить</button>
          <br><br>
          <div v-if="poemGrade != null">
            <label>Ваш результат:</label><br>
            <label class="result-notice">Количество набранных баллов = <b>{{poemGrade}}</b>. <br>Место в лидерборде = <b>{{rank}}</b></label>
          </div>
        </form>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 d-none d-lg-block">
        <img src="@/assets/grade-your-poem.jpg" class="regular" height="550px"/>
      </div>
    </div>
  <br><br>
  </div>
</template>

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