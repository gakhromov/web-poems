<template>
  <div id="app">
  <!-- FontAwesome -->
  <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
    integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
  <!-- AOS -->
  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Caveat&family=Montserrat&display=swap" rel="stylesheet"> 

  <NavBar/>
  <router-view/>
  <Footer/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: {
    NavBar, Footer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: justify;
  color: black;
  font-family: 'Montserrat', sans-serif;
}

h1 {
  font-family: 'Caveat', sans-serif;
}

.result-notice {
  background: #dcd2cc;
  border: 2px solid #ccafa5;
  color: #78655a;
  border-radius: 5px;
  padding: 2px;
}

.fas {
  color: #976f4f;
}

.regular {
	border-radius: 10px;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
