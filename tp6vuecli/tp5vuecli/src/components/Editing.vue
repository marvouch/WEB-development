<template>
  <div>
    <fieldset>
            <legend>EMPLOI</legend>
            <div>
                <label>* TITLE:</label>
                <input type="text" v-model="title">
            </div>
            <div>
                <label>* Description : </label>
                <input type="text" v-model="description">
            </div>
            <div>
                <label> * Salaire:</label>
                <input type="text" v-model="salary">
            </div>
            <div>
                <label> * Date de création:</label>
                <input type="text"  v-model="created_at" placeholder="00/00/0000">
            </div>
        </fieldset>
  <button @click="supprimer">DELETE JOB</button>
  <button @click="update">EDIT JOB</button>
  </div>
  
</template>

<script>
export default {
  name: 'Editing',
  props:{},
  data(){
    return {
      title: '',
      description:'',
      salary: '',
      created_at : '',
    }
  },
  methods:{
    async supprimer(){
      const x = prompt("voulez vous bien supprimer ce travail (yes/no?");
      if (x=="yes"){
      try {
        await fetch('http://localhost:3000/jobs/${this.$route.params.id}', {method:'DELETE'})

        this.$router.push('/');
      } catch (error) {
        console.error('Erreur:', error);
      }
  }

      },
      async update(){
        const updatedjob = {
        title: this.title,
        description: this.description,
        salary: this.salary,
        created_at : this.created_at
      };
      try {
        await fetch('http://localhost:3000/jobs/${this.$route.params.id}', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedjob),
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

    }
    }
    


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
