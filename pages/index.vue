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
            <Ingredient v-for="ingredient in ownedIngredients" :ingredient="ingredient" :key="ingredient.id" />
          </ul>
          <div class="new-ingredient">
            <form>
              <input type="text" placeholder="Ingredient name" v-model="ingredientInput" />
              <button v-on:click="submitNewIngredient">Add ingredient</button>
            </form>
            <div v-if="ingredientInput.length" class="suggestions">
              <p v-for="suggestion in suggested" @click="useSuggested" :data-ingredient="suggestion" :key="suggestion">{{suggestion}}</p>
            </div>
          </div>

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
            {{cocktail.Name}}
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
    },
    suggested(){
      return this.ingredientsFromCocktails.filter(ingredient => ingredient.includes(this.ingredientInput))
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
    },
    useSuggested: function(e) {
      this.ingredientInput = e.currentTarget.getAttribute('data-ingredient')
    }
  }
}
</script>

<style lang="scss">
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
.new-ingredient {
  position: relative;
  .suggestions {
    position: absolute;
    top: calc(100% + 10px);
    left: 0;
    background: #cddbe7;
    color: #35495e;
    padding: 15px;
    border-radius: 5px;
    text-align: left;
    box-shadow: 0 7px 20px -10px rgba(0,0,0,0.3);
    text-transform: capitalize;
    font-weight: bold;
  }
}
</style>
