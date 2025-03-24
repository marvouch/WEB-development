<template>
    <div class="k">
    <h3>Tags:</h3>
    <ul>
      <li v-for="tag in tagslist" :key="tag">
        <router-link :to="`/home/taglist/fromtarget/${tag}`">{{ tag }}</router-link>
      </li>
    </ul>
    </div>
  
</template>

<script>
import fromtarget from './fromtarget.vue';
export default {
  name: 'taglist',
  components:{fromtarget},
  data(){
    return{
        tagslist:["vue", "javascript", "frontend", "performance", "optimisation", "router", "navigation", "directives", "dom", "firebase", "backend"],


    }
  }
  

}
</script>
<style scoped>
.k{
    display:flex;
    flex-direction: column;
    justify-content: center;
}
</style>