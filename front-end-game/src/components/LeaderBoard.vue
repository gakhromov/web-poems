<template>
  <div class="container">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Текст стихотворения</th>
          <th scope="col">Автор</th>
          <th scope="col">Количество баллов</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(line, index) in leaderboard" :key=line.rank>
          <th scope="row">{{index+1}}</th>
          <td>
            <a href="#" @click="toggleShortLong($event, index)" v-if="line.showShort"><pre>{{line.shortPoem}}<span> ...</span></pre></a>
            <a href="#" @click="toggleShortLong($event, index)" v-else><pre>{{line.poem}}</pre></a>
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
      leaderboard: [],
      isSingle: true,
      amount: 100,
    };
  },
  created() {
    axios.post(`${this.$back}/leaderboard`, {
      single: this.isSingle,
      amount: this.amount,
    })
    .then((response) => {
      this.leaderboard = response.data.leaderboard;
      for (let i=0; i<this.leaderboard.length; i++) {
        this.leaderboard[i].shortPoem = this.showPartOfPoem(this.leaderboard[i].poem);
        this.leaderboard[i].showShort = true;
      }
    })
    .catch((error) => {
      console.log(error);
    });
  },
  methods: {
    showPartOfPoem(poem) {
      let lines = poem.split(/\r?\n/);
      return lines.slice(0, 2).join("\n");
    },
    toggleShortLong(event, index) {
      this.leaderboard[index].showShort = !this.leaderboard[index].showShort;
      this.$forceUpdate();
    },
  }
}
</script>