<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        My Cocktail Bar
      </h1>

      <div class="content-wrapper">

        <Box :title="'My Ingredients'">

          <div class="new-ingredient">
            <form>
              <input type="text" placeholder="New ingredient..." v-model="ingredientInput" />
              <button v-on:click="submitNewIngredient">
                <svg height="568.889" viewBox="0 0 426.667 426.667" width="568.889" xmlns="http://www.w3.org/2000/svg"><path d="M405.332 192H234.668V21.332C234.668 9.559 225.109 0 213.332 0 201.559 0 192 9.559 192 21.332V192H21.332C9.559 192 0 201.559 0 213.332c0 11.777 9.559 21.336 21.332 21.336H192v170.664c0 11.777 9.559 21.336 21.332 21.336 11.777 0 21.336-9.559 21.336-21.336V234.668h170.664c11.777 0 21.336-9.559 21.336-21.336 0-11.773-9.559-21.332-21.336-21.332zm0 0"/></svg>
              </button>
            </form>
            <div v-if="ingredientInput.length" class="suggestions">
              <p v-for="suggestion in suggested" @click="useSuggested" :data-ingredient="suggestion" :key="suggestion">{{suggestion}}</p>
            </div>
          </div>

          <ul>
            <Ingredient v-for="ingredient in ownedIngredients" :ingredient="ingredient" :key="ingredient.id" />
          </ul>
          
        </Box>

        <Box :title="'My Menu'">
          <div v-for="cocktail in possibleCocktails" :key="cocktail.id">
            <div>
              {{cocktail.Name}}
              <Cocktail :cocktail="cocktail.id" />
            </div>
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
import Cocktail from '../components/Cocktail'
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
    Cocktail,
    Box
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
        this.ownedIngredients.forEach(ownedIngredient => {
          if(cocktail.Ingredients.indexOf(ownedIngredient.Name) >= 0){
            currentLength++
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
            this.ingredientInput = ''
        })
    },
    useSuggested: function(e) {
      this.ingredientInput = e.currentTarget.getAttribute('data-ingredient')
      this.submitNewIngredient(e)
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
  margin: 15px 0;
  form {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  input {
    padding: 10px 15px;
    border: none;
    border-radius: 20px;
    color: #35495d;
    margin-right: 10px;
    box-shadow: 0 5px 8px -4px rgba(0,0,0,0.3);
  }
  button {
    position: relative;
    width: 35px;
    height: 35px;
    padding: 10px;
    background: none;
    border: none;
    border-radius: 50%;
    box-shadow: 0 5px 8px -4px rgba(0,0,0,0.3);
    cursor: pointer;
    svg {
      width: 100%;
      height: 100%;
      fill: #35495d;
      transition: transform ease 0.2s;
    }

    &:hover,
    &:focus {
      svg {
        transform: rotate(90deg)
      }
    }
  }
  .suggestions {
    position: absolute;
    top: calc(100% + 10px);
    left: 0;
    background: #cddbe7;
    padding: 15px;
    border-radius: 5px;
    text-align: left;
    box-shadow: 0 7px 20px -10px rgba(0,0,0,0.3);
    text-transform: capitalize;
    font-weight: bold;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    p {
      position: relative;
      color: #35495e;
      cursor: pointer;
      padding: 3px 0;
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        width: 0;
        background: #35495e;
        transition: width ease 0.2s;
      }
      &:hover,
      &:focus {
        &::after {
          width: 100%;
        }
      }
    }
  }
}
</style>
