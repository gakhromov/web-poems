<template>
    <div class="container">
        <h1>Соревнование</h1><br>
        <div class="row">
            <div class="col-9">
                <h5>Игра-соревнование</h5><br>
                <span v-for="line in poemLines" :key="line">
                    <div class="row">
                        <div class="col-2"><p>{{line.author}}</p></div>
                        <div class="col-10">{{line.line}}</div>
                    </div>
                </span>
                <div class="row">
                <div class="col-2"><button @click="recordLine" type="button" class="btn btn-success">✔</button></div>
                <div class="col-10"><input v-model="newLine" type="text" class="form-control"/></div>
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

export default {
    name: "Competition",
    props: ["username"],
    data() {
        return {
            poemLines: [
                {line: "salam", author: "компьютер"}
                ],
            newLine: "",
        };
    },
    methods: {
        recordLine() {
            this.poemLines.push({line: this.newLine, author: this.username});
            this.newLine = "";
        },
    },
}
</script>