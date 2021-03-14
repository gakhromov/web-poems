<template>
<b-navbar toggleable="xl" type="light" variant="faded" class="mrgn sticky-top bg-light">
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
        <b-nav-item class="d-none d-xl-block">|</b-nav-item>
        <b-nav-item to="/grade-your-poem"><i class="fas fa-edit"></i> Оцени свой стих</b-nav-item>
        <b-nav-item class="d-none d-xl-block">|</b-nav-item>
        <b-nav-item to="/join-competition"><i class="fas fa-user-alt"></i><b class="fas"> & </b><i class="fas fa-robot"></i> Соревнование</b-nav-item>
        <b-nav-item class="d-none d-xl-block">|</b-nav-item>
        <b-nav-item-dropdown right>
          <template #button-content>
            <i class='fas fa-table'></i> Лидерборд
          </template>
          <b-dropdown-item :to="{path: '/leaderboard', query: {showSingle: true}}">Оцени свой стих</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item :to="{path: '/leaderboard', query: {showSingle: false}}">Соревнование</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item class="d-none d-xl-block">|</b-nav-item>
        <b-nav-item to="/generate-poem"><i class="fas fa-feather-alt"></i><i class="fas fa-robot"></i> Сгенерировать стих</b-nav-item>
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
@media (min-width: 20px){
  .navbar-expand-custom {
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
  .navbar-expand-custom .navbar-nav {
    flex-direction: row;
  }
  .navbar-expand-custom .navbar-nav .nav-link {
    padding-right: .5rem;
    padding-left: .5rem;
  }
  .navbar-expand-custom .navbar-collapse {
    display: flex!important;
  }
  .navbar-expand-custom .navbar-toggler {
    display: none;
  }
}
</style>