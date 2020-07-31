<template>
  <div class="container">
      <div>
          <h1>Recipe page</h1>
      </div>
  </div>
</template>

<script>
import db from '../plugins/firebaseinit'
export default {
    computed: {
        cocktail() {
            return this.$route.query.cocktail
        },
        details() {
            if(this.id.length > 0){
                db.collection('Cocktails').where('__name__', '==' ,`${this.$route.query.cocktail}`).get().then(data => {
                    return data.data()
                }).catch(err => console.log(err))
            }
        }
    }
}
</script>

<style>

</style>