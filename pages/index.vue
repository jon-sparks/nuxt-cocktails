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
  data () {
    return {
      cocktails: [],
      ingredients: []
    }
  },
  created () {
    db.collection('Cocktails').get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        this.cocktails = [...this.cocktails, doc.data()]
      })
    }),
    db.collection('Ingredients').get()
    .then(snapshot => {
        snapshot.docs.forEach(doc => {
            this.ingredients = [...this.ingredients, doc.data()]
        })
    })
  },
    computed: {
        ownedIngredients() {
          return this.ingredients.filter(ingredient => ingredient.Owned)
        },
        possibleCocktails() {
          return this.cocktails.filter(cocktail =>
            this.ownedIngredients.some(ingredient => cocktail.Ingredients.includes(ingredient.Name))
          )
        }
    }
}
</script>

<style>
.box {
  padding: 25px;
  margin: 10px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 7px 20px -10px rgba(0,0,0,0.3);
  /* background: linear-gradient(309deg, rgba(250,200,255,1) 0%, rgba(255,214,161,1) 100%); */
}
.container {
  margin: 0 auto;
  padding: 50px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
  background: rgb(245,245,245);
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
  margin-bottom: 50px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.content-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
}
</style>
