<template>
    <div class="r">
     <posting />
      <taglist />
      
    </div>
    
  </template>
  
  <script>
  // @ is an alias to /src
  
  import taglist from '@/components/taglist.vue';
  import posting from '@/components/posting.vue';
  
  export default {
    name: 'home',
    components: {posting,taglist}
  }
  </script>
  <style scoped>
  .r{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  </style>
  