<template>
  <div>
  <singlepost v-for="post in posts" :key="post.id" :post="post" />
</div>
  
</template>

<script>
import singlepost from './singlepost.vue';
export default {
  components: { singlepost },
  name: 'posting',
  data() {
    return {
      posts:[]
      
    };
  },
  async mounted() {
    try{
      const response = await fetch("http://localhost:3000/posts");
      this.posts = await response.json();
      

    }catch(error){
       console.log("Error fetching",error);
    }

  }, 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div{
  display: flex;
  flex-direction: column;
  border: solid 2px black;
  justify-content: center;
}

</style>
