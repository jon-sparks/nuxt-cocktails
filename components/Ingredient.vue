<template>
  <li class="ingredient">
    <button @click="deleteIngredient">x</button>
    <h3>{{ingredient.Name}}</h3>
  </li>
</template>

<script>
import db from '../plugins/firebaseinit'
export default {
  props: ['ingredient'],
  methods: {
    deleteIngredient: function(e){
      e.preventDefault()
      db.collection('Ingredients').doc(this.ingredient.id).delete()
    }
  }
}
</script>

<style lang="scss">
.ingredient {
  position: relative;
  display: flex;
  align-items: center;
  button {
    margin-right: 10px;
    position: relative;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: none;
  }
  h3 {
    text-transform: capitalize;
  }
}

</style>