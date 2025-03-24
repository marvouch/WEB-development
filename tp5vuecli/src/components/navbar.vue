<template>
    <nav>
    <router-link to="/" class="nav1">Home</router-link> |
    <router-link to="/createpost" class="nav1">Add post</router-link> |
    <router-link class="nav1" to="/edit"> Edit post</router-link>
    
  </nav>

  
</template>

<script>


export default {
  name: 'navbar',
  props: {
    
  }
}
</script>

<style>

nav {
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap : 50px;
  padding: 30px;
  
  
}

.nav1 {
  font-weight: bold;
  color: #a437b9;
  size : 30px;
  text-decoration: underline;
}

</style>
