<template>
 <div>
   <TypeNav/>
   <ListContainer/>
   <Recommed/>
   <Rank/>
   <Like/>
 <Floor v-for="(floor) in reqfloorlist" :key="floor.id" :list="floor"/>
  <Brand/>
 </div>
</template>

<script>
import ListContainer from './ListContainer/index.vue'
import Recommed from './Recommend/index.vue'
import Rank from './Rank/index.vue'
import Like from './Like/index.vue'
import Floor from './Floor/index.vue'
import Brand from './Brand/index.vue'
import {mapState } from 'vuex'
export default {
  mounted() {
    this.$store.dispatch('getfloordata')
    // if (localStorage.getItem('token')) { 
    //   this.$store.dispatch('getuserinfo')
    // }
  },
      computed: {
    ...mapState(
      {
        reqfloorlist: (state) => {
          return state.home.floor_data
        }
      }),
        
  },

  components: {
    ListContainer,
    Recommed,
    Rank,
    Like,
    Floor,
    Brand
  }
}
</script>

<style>

</style>