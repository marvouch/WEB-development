<template>
    <div v-for="job in jobs" :key="job.title">
      <h3>{{ job.title }}</h3>
      <p>{{ job.description }}</p>
      <p><strong>Salary:</strong> {{ job.salary }}</p>
      <p><strong>Date:</strong> {{ job.created_at }}</p>
       <router-link > AFFICHER PLUS DE DETAILS</router-link>
    </div>
  
</template>

<script>
export default {
  name: 'FilterNav',
  data(){
    return{
        jobs:[]
    }
  },
  async mounted() {
    try{
      const response = await fetch("http://localhost:3000/jobs");
      this.jobs = await response.json();
      

    }catch(error){
       console.log("Error fetching",error);
    }

  }, 
  

  
}
</script>
