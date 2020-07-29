<template>
  <div class="container">
      <div class="content-wrapper">
          <h1>hi</h1>
          <form>
              <input type="text" placeholder="Ingredient name" v-model="ingredientInput" />
              <input id="owned-checkbox" type="checkbox" v-model="ingredientOwned" />
              <label for="owned-checkbox">Do you currently have this ingredient?</label>
              <button v-on:click="submitNewIngredient">Add ingredient</button>
          </form>
          
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
    computed: {
        cocktails() {
            return this.$store.state.cocktails
        },
        ingredients() {
            return this.$store.state.ingredients
        }
    },
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