<template>
    <div>
    <h2>{{ post.title }}</h2>
    <p>Tags: {{ post.tags.join(', ') }}</p>
    <p>{{ post.body.substring(0, 50) }}...</p>
    <button @click="goToDetails(post)">PLUS DE DETAILS</button>

</div>
  
</template>

<script>

export default {

  name: 'singlepost',
  
  props:{
    post: {
       type:Object,
       required : true,


  }

  },
  methods: {
    async goToDetails(post) {
      this.$router.push(`/home/posting/singlepost/postdetail/${post.id}`);
    }
  }

 
}
</script>