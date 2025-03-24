<template>
  <div>
    <FilterNav/>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import FilterNav from '@/components/FilterNav.vue';



export default {
  name: 'HomeView',
  components: {
    FilterNav
  }
}
</script>
