<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        My Cocktail Bar
      </h1>

      <div class="content-wrapper">

        <Box :title="'Your Ingredients'">
          <ul>
            <Ingredient v-for="ingredient in ownedIngredients" :id="ingredient.id" :ingredient="ingredient" :key="ingredient.id" />
          </ul>
          <form>
              <input type="text" placeholder="Ingredient name" v-model="ingredientInput" />
              <button v-on:click="submitNewIngredient">Add ingredient</button>
          </form>
        </Box>

        <!-- <div class="box">
          <div v-for="cocktail in cocktails" :key="cocktail.id">
            <h3>{{cocktail.Name}}</h3>
            <small v-for="ingredient in cocktail.Ingredients" :key="ingredient.id">
              {{ingredient}}, 
            </small>
          </div>
        </div> -->

        <Box :title="'You can make:'">
          <div v-for="cocktail in possibleCocktails" :key="cocktail.Id">
            {{cocktail.data.Name}}
          </div>
        </Box>


      </div>

    </div>
  </div>
</template>

<script>
import db from '../plugins/firebaseinit'
import MyIngredients from '../components/MyIngredients'
import Ingredient from '../components/Ingredient'
import Box from '../components/Box'
export default {
  data () {
    return {
      ingredientInput: ''
    }
  },
  components: {
    MyIngredients,
    Ingredient,
    Box
  },
  // created () {

  //   this.$store.dispatch('fetchCocktails'),
  //   this.$store.dispatch('fetchIngredients')

  // },
  computed: {
    ownedIngredients() {
      return this.$store.state.ingredients.filter(ingredient => ingredient.Owned)
    },
    possibleCocktails() {
      const newList = []
      this.cocktails.forEach(cocktail => {
        const requiredLength = cocktail.data.Ingredients.length
        
        let currentLength = 0
        console.log('----------- ' + cocktail.Name + ' --------------')
        console.log('req length: ', requiredLength)
        this.ownedIngredients.forEach(ownedIngredient => {
          if(cocktail.data.Ingredients.indexOf(ownedIngredient.Name) >= 0){
            currentLength++
            console.log(currentLength)
            console.log(ownedIngredient.Name)
            if(currentLength === requiredLength){
              newList.push(cocktail)
            }
          }
        })
      })
      return newList.filter((v,i,a) => a.findIndex(t => (t.data.Name === v.data.Name)) === i);
    },
    cocktails() {
      return this.$store.state.cocktails
    },
    ingredients() {
      return this.$store.state.ingredients
    },
    ingredientsFromCocktails() {
      let newArr = []
      this.$store.state.cocktails.forEach(cocktail => {
        cocktail.Ingredients.forEach(ingredient => {
          if(!newArr.includes(ingredient)){
            newArr.push(ingredient)
          }
        })
      })
      return newArr
    }
  },
  methods: {
    submitNewIngredient: function(e) {
        e.preventDefault()
        db.collection("Ingredients").add({
            Name: this.ingredientInput.toLowerCase(),
            Owned: true
        }).then(() => {
            console.log('new ingredient added')
        })
    }
  }
}
</script>

<style>
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
</style>
