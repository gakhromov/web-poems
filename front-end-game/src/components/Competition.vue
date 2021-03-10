<template>
    <div class="container">
        <div class="row">
            <div class="col-10">
                <span v-for="line in poemLines" :key="line">{{line}}<br></span>
                <div class="row">
                <div class="col-10"><input v-model="newLine" type="text" class="form-control"/></div>
                <div class="col-2"><button @click="recordLine" type="button" class="btn btn-success">✔</button></div>
                </div>
            </div>
            <div class="col-2">
                <ul class="list-group">
                    <li>{{username}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "Competition",
    props: ["username"],
    data() {
        return {
            poemLines: ["salam", "aleykum", "pisani"],
            newLine: "",
        };
    },
    methods: {
        recordLine() {
            this.poemLines.push(this.newLine);
            this.newLine = "";
        },
    },
}
</script>