<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        My Cocktail Bar
      </h1>

      <transition name="slide">
        <div class='content-wrapper' key="1" v-if="isMethodOpen">
          <Box :title="`${currentCocktail.Name} Method`" :class="{ __method: isMethodOpen}" >
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

        <div class="content-wrapper" key="2" v-else>

          <Box :title="'My Ingredients'">

            <div class="new-ingredient">
              <form>
                <input type="text" placeholder="New ingredient..." v-on:input="ingredientInput = $event.target.value"  @focus="inputFlag = true" @blur="delayedUnfocus" />
                <button v-on:click="submitNewIngredient">
                  <svg height="568.889" viewBox="0 0 426.667 426.667" width="568.889" xmlns="http://www.w3.org/2000/svg"><path d="M405.332 192H234.668V21.332C234.668 9.559 225.109 0 213.332 0 201.559 0 192 9.559 192 21.332V192H21.332C9.559 192 0 201.559 0 213.332c0 11.777 9.559 21.336 21.332 21.336H192v170.664c0 11.777 9.559 21.336 21.332 21.336 11.777 0 21.336-9.559 21.336-21.336V234.668h170.664c11.777 0 21.336-9.559 21.336-21.336 0-11.773-9.559-21.332-21.336-21.332zm0 0"/></svg>
                </button>
              </form>
                <div v-if="ingredientInput.length && inputFlag" class="suggestions">
                  <div v-if="typeof suggested === 'string'">
                    <p>{{suggested}}</p>
                  </div>
                  <div v-else>
                    <p v-for="suggestion in suggested" @click="useSuggested" :data-ingredient="suggestion" :key="suggestion">{{suggestion}}</p>
                  </div>
                </div>
            </div>

            <client-only>
              <ul v-if="ingredients !== null && ingredients.length !== 0"  :class="{'ingredient-list': !isMethodOpen}">
                <Ingredient v-for="ingredient in ingredients" :ingredient="ingredient" :key="ingredient" v-on:deleteIngredient="updateIngredients($event)" />
              </ul>
              <div v-else class="empty-ingredients">
                <svg height="60" viewBox="0 0 426.667 426.667" width="60" xmlns="http://www.w3.org/2000/svg"><path d="M405.332 192H234.668V21.332C234.668 9.559 225.109 0 213.332 0 201.559 0 192 9.559 192 21.332V192H21.332C9.559 192 0 201.559 0 213.332c0 11.777 9.559 21.336 21.332 21.336H192v170.664c0 11.777 9.559 21.336 21.332 21.336 11.777 0 21.336-9.559 21.336-21.336V234.668h170.664c11.777 0 21.336-9.559 21.336-21.336 0-11.773-9.559-21.332-21.336-21.332zm0 0"/></svg>
                <p>Add your ingredients with the input box above.</p>
              </div>
            </client-only>
            
          </Box>

          <Box :title="'My Menu'">
            <client-only>
              <div v-if="possibleCocktails && possibleCocktails.length > 0">
                <button  class="cocktail-button" v-for="cocktail in possibleCocktails" :key="cocktail.id" :data-cocktail="cocktail.id" @click="showMethod">
                  <svg id="_x31_" enable-background="new 0 0 24 24" height="21" viewBox="0 0 24 24" width="21" xmlns="http://www.w3.org/2000/svg"><path d="m20.5 24h-12c-1.378 0-2.5-1.121-2.5-2.5v-15c0-1.379 1.122-2.5 2.5-2.5h12c1.378 0 2.5 1.121 2.5 2.5v15c0 1.379-1.122 2.5-2.5 2.5zm-12-19c-.827 0-1.5.673-1.5 1.5v15c0 .827.673 1.5 1.5 1.5h12c.827 0 1.5-.673 1.5-1.5v-15c0-.827-.673-1.5-1.5-1.5z"/><path d="m4.5 21h-1c-1.378 0-2.5-1.121-2.5-2.5v-16c0-1.379 1.122-2.5 2.5-2.5h12c1.378 0 2.5 1.121 2.5 2.5 0 .276-.224.5-.5.5s-.5-.224-.5-.5c0-.827-.673-1.5-1.5-1.5h-12c-.827 0-1.5.673-1.5 1.5v16c0 .827.673 1.5 1.5 1.5h1c.276 0 .5.224.5.5s-.224.5-.5.5z"/><path d="m18.5 17h-8c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h8c.276 0 .5.224.5.5s-.224.5-.5.5z"/><path d="m18.5 21h-8c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h8c.276 0 .5.224.5.5s-.224.5-.5.5z"/><path d="m18.5 13h-8c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h8c.276 0 .5.224.5.5s-.224.5-.5.5z"/><path d="m18.5 9h-8c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h8c.276 0 .5.224.5.5s-.224.5-.5.5z"/></svg>
                  {{cocktail.Name}}
                  <svg class="cocktail-arrow" height="20" viewBox="0 0 64 64" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M54 30H14.101l15.278-14.552a2 2 0 10-2.759-2.897L9.172 29.171A3.978 3.978 0 008 32c0 1.068.417 2.073 1.207 2.862l17.414 16.586c.387.369.883.552 1.379.552a1.999 1.999 0 001.38-3.448L14.038 34H54a2 2 0 000-4z"/></svg>
                </button>
              </div>
            
              <div v-else class="no-cocktails">
                <p>You're unable to make any cocktails with your current ingredients.</p>
              </div>
            </client-only>

          </Box>

        </div>

      </transition>


    </div>
  </div>
</template>

<script>
import db from '../plugins/firebaseinit'
import Ingredient from '../components/Ingredient'
import Cocktail from '../components/Cocktail'
import Box from '../components/Box'
export default {
  data () {
    return {
      ingredientInput: '',
      selectedCocktail: null,
      isMethodOpen: false,
      isModalOpen: false,
      ingredients: null,
      inputFlag: false
    }
  },
  components: {
    Ingredient,
    Cocktail,
    Box
  },
  created() {
    // this.newIngredients = JSON.parse(this.window.localStorage.getItem('ingredients'))
    if(process.browser){
      this.ingredients = JSON.parse(localStorage.getItem('ingredients'))
    }
    
  },
  computed: {
    possibleCocktails() {
      if(this.ingredients !== null){
        const newList = []
        this.cocktails.forEach(cocktail => {
          const requiredLength = cocktail.Ingredients.length
          
          let currentLength = 0
          this.ingredients.forEach(ingredient => {
            if(cocktail.Ingredients.indexOf(ingredient) >= 0){
              currentLength++
              if(currentLength === requiredLength){
                newList.push(cocktail)
              }
            }
          })
        })
        return newList.filter((v,i,a) => a.findIndex(t => (t.Name === v.Name)) === i);
      }
    },
    cocktails() {
      return this.$store.state.cocktails
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
      const rawSuggested = this.ingredientsFromCocktails.filter(ingredient => ingredient.includes(this.ingredientInput.toLowerCase())).length > 0 ? this.ingredientsFromCocktails.filter(ingredient => ingredient.includes(this.ingredientInput.toLowerCase())) : ''
      return typeof rawSuggested === 'object' ? rawSuggested.filter(suggestedIngredient => this.ingredients.indexOf(suggestedIngredient) < 0) : 'No results...'
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
          let newArray
          if(this.ingredients !== null) {
            newArray = [...this.ingredients, this.ingredientInput.toLowerCase()]
          } else {
            newArray = [this.ingredientInput.toLowerCase()]
          }
          localStorage.setItem('ingredients', JSON.stringify(newArray))
          this.ingredients = JSON.parse(localStorage.getItem('ingredients'))
        }
        this.ingredientInput = ''
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
    },
    updateIngredients: function(updatedIngredient) {
      console.log(updatedIngredient)
      this.ingredients = updatedIngredient
    },
    delayedUnfocus: function() {
      setTimeout(() => {
        this.inputFlag = false
      }, 300)
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
    > div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
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
.cocktail-button {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  font-family: 'Caveat';
  font-size: 22px;
  font-weight: bold;
  text-transform: capitalize;
  padding: 5px 6px;
  cursor: pointer;
  svg {
    margin-right: 10px;
  }
  .cocktail-arrow {
    transform: scaleX(-1) scale(0);
    opacity: 0;
    transition: all ease 0.2s;
  }
  &:hover,
  &:focus {
    .cocktail-arrow {
      transform: scaleX(-1) scale(1) translateX(-10px);
      opacity: 1;
    }
  }
}
.empty-ingredients {
  max-width: 220px;
  svg {
    border-radius: 50%;
    padding: 10px;
    border: solid #5c7b92 3px;
    margin: 20px 0;
    fill: #5c7b92;
  }
}
.no-cocktails {
  max-width: 220px;
}
.ingredient-list {
  border-radius: 10px;
  max-height: 210px;
  overflow-y: scroll;
  padding: 5px 5px 5px 5px;
  box-shadow: inset 0px -24px 23px -27px rgba(0,0,0,0.2), inset 0px 24px 23px -27px rgba(0,0,0,0.2)
}

.slide-enter-active, .slide-leave-active {
  transition: all ease 0.7s;
}
.slide-enter /* .fade-leave-active below version 2.1.8 */ {
  transform: translateX(150vw);
  position: absolute;
  opacity: 0;
}
.slide-leave-to {
  transform: translateX(-150vw);
  position: absolute;
  opacity: 0;
}
</style>
