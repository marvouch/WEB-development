<template>
  <div>
    <label>PLUS DE DETAILS</label>
    {{post.id }}{{ post.title }}
    <p>{{ post.body }}</p>
    <button @click="back">BACK</button>

    

  </div>
  
</template>

<script>
export default {
  name: 'postdetail',
  
  data() {
    return {
      post: {
        id: null,
        title: null,
        body : null,
      }
    };
  },
  async created() {
    const id = this.$route.params.id
    const res = await fetch('http://localhost:3000/posts/${id}');
    const data = await res.json();
    this.post.id = data[0].id;
    this.post.title = data[0].title;
    this.post.body = data[0].body;
},
methods:{
    back(){
        this.$router.back();
    }


}}

</script>