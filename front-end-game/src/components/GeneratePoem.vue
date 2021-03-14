<template>
  <div class="container">
    <div class="row">
      <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12">
        <h1 data-aos="fade">Сгенерировать стихотворение</h1><br>
        <div data-aos="fade-down">
          <p>
            Здесь Вы можете получить индивидуальный стих, который специально для Вас сгенерирует нейросеть.<br>
            Вы можете получить сколько угодно стихов, которые будут дописываться друг за другом.<br>
            Кто знает, вдруг у нашей нейросети получится целая поэма 😉
          </p>
        </div>
        <div>
          <ol>
            <li data-aos="fade-right" v-for="(poem, index) in poems" :key="index"><pre class="poem">{{poem}}</pre></li>
          </ol>
          <button v-if="poems.length == 0" @click="generatePoem" type="button" class="btn btn-success">Сгенерировать</button>
          <button v-else @click="generatePoem" type="button" class="btn btn-success">Хочу еще</button>
        </div>
      </div>
      <div data-aos="zoom-in" class="col-xl-4 col-lg-4 col-md-12 col-sm-12 d-none d-lg-block">
        <img src="@/assets/generate-poem.jpg" class="regular" height="550px"/>
      </div>
    </div>
  <br><br>
  </div>
</template>

<style scoped>
.poem {
    font-size: medium;
}
</style>

<script>
import axios from 'axios'

export default {
    name: "GeneratePoem",
    data() {
        return {
            poems: [],
        };
    },
    methods: {
        generatePoem() {
            axios.get(`${this.$back}/neuropoem`)
            .then((response) => {
                this.poems.push(response.data.poem);
            })
            .catch((error) => {
                console.log(error);
            });
        },
    },
}
</script>