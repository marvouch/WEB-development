<template>
    <div>
        {{ title }}
        {{ description }}
        {{ salary }}
        {{ created_at }}

    </div>
  
</template>

<script>
export default {
  name: 'jobdetail',
  props:['id','title','description','salary','created_at'],
  data(){
    return{
        id:this.$route.id,
        title:this.$route.title,
        salary : this.$route.salary,
        created_at : this.$route.created_at,
        description : this.$route.description

    }
  }
  
}
</script>
