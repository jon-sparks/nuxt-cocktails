<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        Hello
      </h1>
      
      <div v-for="cocktail in cocktails">
        <h3>{{cocktail.Name}}</h3>
        <small v-for="ingredient in cocktail.Ingredients">
          {{ingredient}}, 
        </small>
      </div>

    </div>
  </div>
</template>

<script>
import db from '../plugins/firebaseinit'
export default {

  data () {
    return {
      cocktails: []
    }
  },
  created () {
    db.collection('Cocktails').get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        this.cocktails = [...this.cocktails, doc.data()]
      })
    })
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
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
</style>
