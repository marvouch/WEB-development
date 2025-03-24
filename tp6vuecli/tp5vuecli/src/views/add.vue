<template>
  <div>

    <fieldset>
            <legend>AJOUTER UN EMPLOI</legend>
            <div>
                <label>* TITLE:</label>
                <input type="text" v-model="job.title">
            </div>
            <div>
                <label>* Description : </label>
                <input type="text" v-model="job.description">
            </div>
            <div>
                <label> * Salaire:</label>
                <input type="text" v-model="job.salary">
            </div>
            <div>
                <label> * Date de création:</label>
                <input type="text"  v-model="job.created_at" placeholder="00/00/0000">
            </div>
            <button @click="addPost">Ajouter</button>
        </fieldset>

    
  </div>
</template>

<script>
export default {
  name: 'adding',
  data(){
    return{
      job:{
        title:'',
        description:'',
        salary:'',
        created_at:'',

      }

    }
  },
  methods:{
    async addPost() {
       const newjob = {
        title: this.title,
        description: this.description,
        salary: this.salary,
        created_at : this.created_at
      };
      try {
        await fetch('http://localhost:3000/jobs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newjob),
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
