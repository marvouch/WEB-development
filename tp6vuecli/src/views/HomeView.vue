<template>
  <div>
    <taglist />
    <postlist />
  </div>
  
</template>

<script>
// @ is an alias to /src

import taglist from '@/components/taglist.vue';

export default {
  name: 'home',
  components: {postlist,taglist}
}
</script>
