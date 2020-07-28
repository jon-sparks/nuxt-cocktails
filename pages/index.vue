<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        My Cocktail Bar
      </h1>

      <div class="content-wrapper">

        <div class="box">
          <MyIngredients :ingredients="ingredients" :ownedIngredients="ownedIngredients"/>
        </div>

        <div class="box">
          <div v-for="cocktail in cocktails" :key="cocktail.id">
            <h3>{{cocktail.Name}}</h3>
            <small v-for="ingredient in cocktail.Ingredients" :key="ingredient.id">
              {{ingredient}}, 
            </small>
          </div>
        </div>

        <div class="box">
          <div v-for="cocktail in possibleCocktails" :key="cocktail.Id">
            {{cocktail.Name}}
          </div>
        </div>


      </div>

    </div>
  </div>
</template>

<script>
import db from '../plugins/firebaseinit'
import MyIngredients from '../components/MyIngredients'
export default {
  components: {
    MyIngredients
  },
  created () {

    this.$store.dispatch('fetchCocktails'),
    this.$store.dispatch('fetchIngredients')

  },
  computed: {
    ownedIngredients() {
      return this.$store.state.ingredients.filter(ingredient => ingredient.Owned)
    },
    possibleCocktails() {
      const newList = []
      this.cocktails.forEach(cocktail => {
        const requiredLength = cocktail.Ingredients.length
        
        let currentLength = 0
        console.log('----------- ' + cocktail.Name + ' --------------')
        console.log('req length: ', requiredLength)
        this.ownedIngredients.forEach(ownedIngredient => {
          if(cocktail.Ingredients.indexOf(ownedIngredient.Name) >= 0){
            currentLength++
            console.log(currentLength)
            console.log(ownedIngredient.Name)
            if(currentLength === requiredLength){
              newList.push(cocktail)
            }
          }
        })
      })
      return newList.filter((v,i,a) => a.findIndex(t => (t.Name === v.Name)) === i);
    },
    cocktails() {
      return this.$store.state.cocktails
    }
  }
}
</script>

<style>

</style>
