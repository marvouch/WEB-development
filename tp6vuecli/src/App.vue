<template>
  <div id="app">

    <navbar/>
    <router-view/>
  </div>
  
  
</template>
<script>

// @ is an alias to /src
import navbar from '@/components/navbar.vue';

export default {
  name : 'app',
  components: {navbar},


}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
