<template>
<div>
    <h2>Articles avec le tag "{{ currentTag }}" :</h2>
    <ul>
      <li v-for="post in filteredPosts" :key="post.id">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body.substring(0, 50) }}...</p>
      </li>
    </ul>
    <button @click="back">BACK</button>
  </div>
</template>

<script>

export default {
  name: 'fromtarget',
 
  data() {
    return {
      posts: [],
    };
  },
  methods:{
    back(){
        this.$router.back();
    }
   
  },
  computed: {
    currentTag() {
      return this.$route.params.tag;
    },
    filteredPosts() {
      return this.posts.filter(post => post.tags.includes(this.currentTag));
    }
  },
  async mounted (){
    try {
      const response = await fetch('http://localhost:3000/posts');
      this.posts = await response.json();
    } catch (error) {
      console.error('Erreur de chargement des posts', error);
    }

  },

 
}
</script>
