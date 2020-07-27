<template>
  <div class="container">
      <div class="content-wrapper">
          <h1>hi</h1>
          <form>
              <input type="text" placeholder="Ingredient name" v-model="ingredientInput" />
              <input type="checkbox" v-model="ingredientOwned" />
              <button v-on:click="submitNewIngredient">button</button>
          </form>
          <h2 v-for="ingredient in ingredients">fgsdg</h2>
      </div>
  </div>
</template>

<script>
import db from '../plugins/firebaseinit'
export default {
    data () {
        return {
            ingredientInput: '',
            ingredientOwned: false
        }
    },
    props: ['ingredients'],
    methods: {
        submitNewIngredient: function(e) {
            e.preventDefault()
            db.collection("Ingredients").add({
                Name: this.ingredientInput,
                Owned: this.ingredientOwned
            }).then(() => {
                console.log('new ingredient added')
            })
        }
    }
}
</script>

<style>

</style>