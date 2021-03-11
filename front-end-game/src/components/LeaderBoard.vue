<template>
  <div class="container">
    <h1 data-aos="fade">Категории</h1>
    <div class="row">
      <div class="col">
        <a v-if="isSingle"><h4 data-aos="fade">Оцени свой стих</h4></a>
        <a href="#" @click="toggleLeaderBoardType" v-else style="color: lightgray"><h4 data-aos="fade">Оцени свой стих</h4></a>
      </div>
      <div class="col">
        <a v-if="!isSingle"><h4 data-aos="fade">Соревнование</h4></a>
        <a href="#" @click="toggleLeaderBoardType" v-else style="color: lightgray"><h4 data-aos="fade">Соревнование</h4></a>
      </div>
    </div>
    <table class="table">
      <thead>
        <tr data-aos="fade">
          <th scope="col">#</th>
          <th scope="col">Текст стихотворения</th>
          <th scope="col">Автор</th>
          <th scope="col">Количество баллов</th>
        </tr>
      </thead>
      <tbody>
        <tr data-aos="fade-down" v-for="(line, index) in leaderboardSingle" :key=line.rank v-show="isSingle">
          <th scope="row">{{index+1}}</th>
          <td>
            <a @click="$refs['single'+index][0].$data.show = !$refs['single'+index][0].$data.show"><pre>{{line.shortPoem}}</pre></a>
            <b-collapse :ref="'single'+index">
            <pre style="margin-top: -18px">{{line.restPoem}}</pre>
            </b-collapse>
          </td>
          <td>{{line.userscores[0].username}}</td>
          <td>{{line.userscores[0].score}}</td>
        </tr>
        <tr data-aos="fade-down" v-for="(line, index) in leaderboardCompetition" :key=line.rank v-show="!isSingle">
          <th scope="row">{{index+1}}</th>
          <td>
            <a @click="$refs['compet'+index][0].$data.show = !$refs['compet'+index][0].$data.show"><pre>{{line.shortPoem}}</pre></a>
            <b-collapse :ref="'compet'+index">
            <pre style="margin-top: -18px">{{line.restPoem}}</pre>
            </b-collapse>
          </td>
          <td>{{line.userscores[0].username}}</td>
          <td>{{line.userscores[0].score}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "LeaderBoard",
  data() {
    return {
      leaderboardSingle: [],
      leaderboardCompetition: [],
      isSingle: true,
      amount: 100,
    };
  },
  created() {
    if (this.$route.query.showSingle !== undefined)
      this.isSingle = (this.$route.query.showSingle === 'true');
    axios.post(`${this.$back}/leaderboard`, {
      single: true,
      amount: this.amount,
    })
    .then((response) => {
      this.leaderboardSingle = response.data.leaderboard;
      for (let i=0; i<this.leaderboardSingle.length; i++) {
        let splits = this.splitPoem(this.leaderboardSingle[i].poem);
        this.leaderboardSingle[i].shortPoem = splits[0];
        this.leaderboardSingle[i].restPoem = splits[1];
      }
    })
    .catch((error) => {
      console.log(error);
    });
    axios.post(`${this.$back}/leaderboard`, {
      single: false,
      amount: this.amount,
    })
    .then((response) => {
      this.leaderboardCompetition = response.data.leaderboard;
      for (let i=0; i<this.leaderboardCompetition.length; i++) {
        let splits = this.splitPoem(this.leaderboardCompetition[i].poem);
        this.leaderboardCompetition[i].shortPoem = splits[0];
        this.leaderboardCompetition[i].restPoem = splits[1];
      }
    })
    .catch((error) => {
      console.log(error);
    });
  },
  methods: {
    toggleLeaderBoardType() {
      this.isSingle = !this.isSingle;
    },
    splitPoem(poem) {
      let lines = poem.split(/\r?\n/);
      return [lines.slice(0, 2).join("\n"), lines.slice(2).join("\n")];
    },
  }
}
</script>