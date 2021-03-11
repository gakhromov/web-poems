<template>
    <div class="container">
        <h1 data-aos="fade">Соревнование</h1><br>
        <div class="row">
            <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12">
                <h5>Игра-соревнование</h5><br>
                <span v-for="(line, index) in poemLines" :key="index">
                    <div v-if="line.player == null" class="row">
                        <div data-aos="fade-right" class="col-3"><p>Компьютер</p></div>
                        <div data-aos="fade-right" class="col-9">{{line.line}}</div>
                    </div>
                    <div v-else-if="typeof line.line === 'string'" class="row">
                        <div data-aos="fade-right" class="col-3"><p>{{username}}</p></div>
                        <div data-aos="fade-right" class="col-9">{{line.line}}</div>
                    </div>
                    <div v-else></div>
                </span>
                <div v-if="poemLines[poemLines.length-2].line == null" class="row" style="margin-bottom: 10px">
                    <div data-aos="fade-right" class="col-3 text-right"><button @click="recordFirstLine" type="button" class="btn btn-success">✔</button></div>
                    <div data-aos="fade-right" class="col-9"><input v-model="firstLine" type="text" class="form-control"/></div>
                </div>
                <div v-if="poemLines[poemLines.length-1].line == null" class="row" style="margin-bottom: 10px">
                    <div data-aos="fade-right" v-if="typeof poemLines[poemLines.length-2].line === 'string'" class="col-3 text-right"><button @click="recordSecondLine" type="button" class="btn btn-success">✔</button></div>
                    <div data-aos="fade-right" v-else class="col-3 text-right"><button @click="recordSecondLine" type="button" disabled class="btn btn-success">✔</button></div>
                    <div data-aos="fade-right" class="col-9"><input v-model="secondLine" type="text" class="form-control"/></div>
                </div>
                <div v-if="gameFinished">
                    <h4 data-aos="fade-right">Поздравляем, <b>соревнование</b> завершено!</h4>
                    <label data-aos="fade-right">Ваш результат:</label><br>
                    <label data-aos="fade-right" class="result-notice">Количество набранных баллов = <b>{{score}}</b>. <br>Место в лидерборде = <b>{{rank}}</b></label>
                </div>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 d-none d-md-block">
                <h5 data-aos="fade">Имя игрока</h5><br>
                <p data-aos="fade" class="username"><b>{{username}}</b></p>
                <br><br>
                <iframe data-aos="zoom-in" src="https://giphy.com/embed/WRRL1EKo9rNe12S4zh" width="240" height="180" frameBorder="0" class="giphy-embed regular"></iframe>
            </div>
            <br><br>
        </div>
    <br><br>
    </div>
</template>

<style scoped>
p {
    color: darkgray;
}
p.username {
    color: #976f4f;
    font-size: 20px;
}
</style>

<script>
import axios from 'axios'

export default {
    name: "Competition",
    props: ["username"],
    data() {
        return {
            poemLines: [{line: "", player: null}, {line: "", player: null}],
            firstLine: "",
            secondLine: "",
            sessionId: null,
            gameFinished: false,
        };
    },
    created() {
        axios.post(`${this.$back}/game/start`, {username: this.username})
        .then((response) => {
            this.sessionId = response.data.session_id;
            this.poemLines = response.data.lines;
        })
        .then((error) => {
            console.log(error);
        });
    },
    methods: {
        recordFirstLine() {
            if (this.firstLine != "")
                this.poemLines[this.poemLines.length-2].line = this.firstLine;
        },
        recordSecondLine() {
            if (this.secondLine != "") {
                this.poemLines[this.poemLines.length-1].line = this.secondLine;
                this.getNewLines();
            }
        },
        getNewLines() {
            axios.post(`${this.$back}/game/submit`, {
                session_id: this.sessionId,
                line1: this.firstLine,
                line2: this.secondLine,
            })
            .then((response) => {
                if (response.status == 200) {
                    this.poemLines = response.data.lines;
                    this.firstLine = "";
                    this.secondLine = "";
                }
                else if (response.status == 201){
                    this.rank = response.data.rank;
                    this.score = response.data.score;
                    this.gameFinished = true;
                }
            })
            .catch((error) => {
                console.log(error);
            })
        },
    },
}
</script>