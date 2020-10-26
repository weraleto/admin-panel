<template>
  <div>
      <template v-if="userRole == 'seller'">
          <Clibase />
      </template>
      <template v-else>
          <AdminList />
      </template>
      
  </div>
</template>

<script>
import Clibase from './CliBase'
import AdminList from './adminItemList'
export default {    
    components: {Clibase,AdminList},
    computed: {
        userRole(){
            return this.$store.state.userRole
        }
    }
}
</script>

<style>

</style>