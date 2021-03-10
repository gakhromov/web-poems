<template>
<b-navbar toggleable="lg" type="dark" variant="dark" class="mrgn">
    <b-navbar-brand href="#">
      <img src="@/assets/logo.png"/>
    </b-navbar-brand>

    <b-navbar-toggle target="navbar-toggle-collapse">
      <template #default="{ expanded }">
        <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
        <b-icon v-else icon="chevron-bar-down"></b-icon>
      </template>
    </b-navbar-toggle>

    <b-collapse id="navbar-toggle-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/">Домашняя страница</b-nav-item>
        <b-nav-item to="/grade-your-poem">Оцени свое стихотворение</b-nav-item>
        <b-nav-item to="/join-competition">Соревнование</b-nav-item>
        <b-nav-item to="/leaderboard">Лидерборд</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<style scoped>
img {
  height: 50px;
}

.mrgn {
  margin-bottom: 30px;
}
</style>