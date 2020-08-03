<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        My Cocktail Bar
      </h1>

      <div class='content-wrapper' v-if="isMethodOpen">
        <Box :title="`${currentCocktail.Name} Method`">
          <button @click="toggleMethod" class="box-close">
            <svg height="20" viewBox="0 0 64 64" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M54 30H14.101l15.278-14.552a2 2 0 10-2.759-2.897L9.172 29.171A3.978 3.978 0 008 32c0 1.068.417 2.073 1.207 2.862l17.414 16.586c.387.369.883.552 1.379.552a1.999 1.999 0 001.38-3.448L14.038 34H54a2 2 0 000-4z"/></svg>
            Back
          </button>
          <div class="box-content">
            <div class="box-ingredients">
              <h2>Ingredients</h2>
              <ul>
                <li v-for="ingredient in currentCocktail.Ingredients" :key="ingredient">
                  {{ ingredient }}
                </li>
              </ul>
            </div>
            <div class="box-method">
              <p>{{ currentCocktail.Method }}</p>
            </div>
          </div>
          
        </Box>
      </div>

      <div class="content-wrapper" v-else>

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
            <Ingredient v-for="ingredient in ingredients" :ingredient="ingredient" :key="ingredient.id" />
          </ul>
          
        </Box>

        <Box :title="'My Menu'">
          <button v-for="cocktail in possibleCocktails" :key="cocktail.id" :data-cocktail="cocktail.id" @click="showMethod">{{cocktail.Name}}</button>

          <Modal>

          </Modal>

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
import Modal from '../components/Modal'
export default {
  data () {
    return {
      ingredientInput: '',
      selectedCocktail: null,
      isMethodOpen: false,
      isModalOpen: false
    }
  },
  components: {
    MyIngredients,
    Ingredient,
    Cocktail,
    Box,
    Modal
  },
  computed: {
    possibleCocktails() {
      const newList = []
      this.cocktails.forEach(cocktail => {
        const requiredLength = cocktail.Ingredients.length
        
        let currentLength = 0
        this.ingredients.forEach(ingredient => {
          if(cocktail.Ingredients.indexOf(ingredient.Name) >= 0){
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
    },
    currentCocktail(){
      let currentCocktail = this.cocktails.filter(cocktail => cocktail.id === this.selectedCocktail)
      return currentCocktail[0]
    }
  },
  methods: {
    submitNewIngredient: function(e) {
        e.preventDefault()
        if(this.ingredientInput !== ''){
          db.firestore().collection("Ingredients").add({
              Name: this.ingredientInput.toLowerCase()
          }).then(() => {
              this.ingredientInput = ''
          })
        }

    },
    useSuggested: function(e) {
      this.ingredientInput = e.currentTarget.getAttribute('data-ingredient')
      this.submitNewIngredient(e)
    },
    showMethod: function(e) {
      e.preventDefault()
      this.selectedCocktail = e.currentTarget.getAttribute('data-cocktail')
      this.toggleMethod()
    },
    toggleMethod: function() {
      this.isMethodOpen = !this.isMethodOpen
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
