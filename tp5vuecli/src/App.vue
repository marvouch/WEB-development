<template>
  <div id="app">
  <nav>
    <router-link to="/">HOME</router-link> |
    <router-link to="/adding">
      <button>ADD JOB</button>
    </router-link>|
    <router-link to="/editing">EDIT JOB</router-link> |
  </nav>
  <router-view/>
</div>
</template>

<style>
#app {
  display: flex;
  flex-direction:row;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  justify-content: center;
  

}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #87136e;
}

nav a.router-link-exact-active {
  color: #8b5189;
}
button{
  background-color: #8b5189;
  color:white;
}

</style>
