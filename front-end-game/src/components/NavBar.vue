<template>
<b-navbar toggleable="lg" type="light" variant="faded" class="mrgn">
    <b-navbar-brand to="/">
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
        <b-nav-item to="/"><i class="fas fa-home"></i> Домой</b-nav-item>
        <b-nav-item>|</b-nav-item>
        <b-nav-item to="/grade-your-poem"><i class="fas fa-edit"></i> Оцени свой стих</b-nav-item>
        <b-nav-item>|</b-nav-item>
        <b-nav-item to="/join-competition"><i class="fas fa-user-alt"></i><b> & </b><i class="fas fa-robot"></i> Соревнование</b-nav-item>
        <b-nav-item>|</b-nav-item>
        <b-nav-item to="/leaderboard"><i class="fas fa-table"></i> Лидерборд</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<style scoped>
i, b {
  color: #976f4f;
}

img {
  height: 50px;
}

.mrgn {
  margin-bottom: 30px;
}
</style>