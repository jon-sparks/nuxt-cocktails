<template>
  <div>
    <div v-for="ingredient in ownedIngredients" :key="ingredient.id">{{ingredient.Name}}</div>
    <!-- <Ingredient v-for="ingredient in ingredients" :key="ingredient.id" :ingredient="ingredient" /> -->
  </div>
</template>

<script>
import db from '../plugins/firebaseinit'
import Ingredient from './Ingredient'

export default {
    props: ['ingredients', 'ownedIngredients'],
    components: {
        Ingredient
    }
}
</script>

<style scoped>

</style>