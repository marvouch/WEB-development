<template>
    
        <fieldset>
            <legend>AJOUTER UN ARTICLE</legend>
            <div>
                <label>* ID :</label>
                <input type="text" v-model="id">
            </div>
            <div>
                <label>* Titre : </label>
                <input type="text" v-model="title">
            </div>
            <div>
                <label> * Corps :</label>
                <textarea rows="15" cols="18"  v-model="body"></textarea>
            </div>
            <div>
                <label> * Tags (sépare par des virgules ):</label>
                <input type="text"  v-model="tags" placeholder="['vue', 'js']">
            </div>
            <button @click="addPost">Ajouter</button>
        </fieldset>

    
  
</template>

<script>
export default {
  name: 'createpost',
  data(){
    return {
        id:'',
        title:'',
        body:'',
        tags:'', 
    }
  },
  methods:{
    async addPost() {
  const tagsArray = this.tags.split(',').map(tag => tag.trim());
  const newPost = {
    title: this.title,
    body: this.body,
    tags: tagsArray,
  };
  try {
    await fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost),
    });
    
    this.title = '';
    this.body = '';
    this.tags = '';
    this.id = '';
    
    this.$router.push('/');
  } catch (error) {
    console.error('Erreur:', error);
  }
}

}}
</script>
<style scoped>
div{
    display: flex;
    margin-top:2%;
    justify-content: space-around;
    flex-direction: row;
    gap: 50px;
    margin-bottom: 40px;
}
fieldset{
    margin-top:10%;
    margin-left: 10%;
    margin-right:20% ;
}

label{
    color: rgb(99, 67, 130);

    font-size: 20px;
    font-weight: bold;
}
legend{
    color:rgb(69, 11, 124);
    text-decoration: underline;
    font-weight: bold;
    font-size : 30px;
}

</style>