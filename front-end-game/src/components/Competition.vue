<template>
    <div class="container">
        <h1>Соревнование</h1><br>
        <div class="row">
            <div class="col-9">
                <h5>Игра-соревнование</h5><br>
                <span v-for="line in poemLines" :key="line.line">
                    <div v-if="line.player == null" class="row">
                        <div class="col-3"><p>Компьютер</p></div>
                        <div class="col-9">{{line.line}}</div>
                    </div>
                    <div v-else-if="typeof line.line === 'string'" class="row">
                        <div class="col-3"><p>{{username}}</p></div>
                        <div class="col-9">{{line.line}}</div>
                    </div>
                    <div v-else></div>
                </span>
                <div v-if="poemLines[poemLines.length-2].line == null" class="row" style="margin-bottom: 10px">
                    <div class="col-3"><button @click="recordFirstLine" type="button" class="btn btn-success">✔</button></div>
                    <div class="col-9"><input v-model="firstLine" type="text" class="form-control"/></div>
                </div>
                <div v-if="poemLines[poemLines.length-1].line == null" class="row" style="margin-bottom: 10px">
                    <div v-if="typeof poemLines[poemLines.length-2].line === 'string'" class="col-3"><button @click="recordSecondLine" type="button" class="btn btn-success">✔</button></div>
                    <div v-else class="col-3"><button @click="recordSecondLine" type="button" disabled class="btn btn-success">✔</button></div>
                    <div class="col-9"><input v-model="secondLine" type="text" class="form-control"/></div>
                </div>
                <div v-if="gameFinished">
                    <h4>Поздравляем, <b>соревнование</b> завершено!</h4><br>
                    <label>Ваш результат:</label>
                    <label class="result-notice">Количество набранных баллов = <b>{{score}}</b>. <br>Место в лидерборде = <b>{{rank}}</b></label>
                </div>
            </div>
            <div class="col-3">
                <h5>Имя игрока</h5><br>
                <ul class="list-group">
                    <li>{{username}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
p {
    color: darkgray;
}
</style>

<script>
import axios from 'axios'

export default {
    name: "Competition",
    props: ["username"],
    data() {
        return {
            poemLines: [],
            firstLine: "",
            secondLine: "",
            sessionId: null,
            writtenLines: [],
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
            this.poemLines[this.poemLines.length-2].line = this.firstLine;
        },
        recordSecondLine() {
            this.poemLines[this.poemLines.length-1].line = this.secondLine;
            this.getNewLines();
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