<template>
  <li class="ingredient">
    <button @click="deleteIngredient">

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477.867 477.867"><path d="M443.733 68.267H324.267V51.2c0-28.277-22.923-51.2-51.2-51.2H204.8c-28.277 0-51.2 22.923-51.2 51.2v17.067H34.133c-9.426 0-17.067 7.641-17.067 17.067S24.708 102.4 34.133 102.4h18.551l32.649 359.953c.805 8.814 8.216 15.55 17.067 15.514h273.067c8.851.037 16.261-6.699 17.067-15.514L425.182 102.4h18.552c9.426 0 17.067-7.641 17.067-17.067s-7.642-17.066-17.068-17.066zm-256-17.067c0-9.426 7.641-17.067 17.067-17.067h68.267c9.426 0 17.067 7.641 17.067 17.067v17.067h-102.4V51.2zm172.152 392.533H117.982L87.04 102.4h303.872l-31.027 341.333z"/><path d="M187.738 391.392l-.005-.07-17.067-238.933c-.669-9.426-8.853-16.524-18.278-15.855-9.426.669-16.524 8.853-15.855 18.278L153.6 393.745c.637 8.949 8.095 15.878 17.067 15.855h1.229c9.403-.653 16.496-8.805 15.842-18.208zM238.933 136.533c-9.426 0-17.067 7.641-17.067 17.067v238.933c0 9.426 7.641 17.067 17.067 17.067S256 401.959 256 392.533V153.6c0-9.426-7.641-17.067-17.067-17.067zM325.478 136.533c-9.426-.669-17.609 6.429-18.278 15.855l-17.067 238.933c-.691 9.4 6.369 17.581 15.769 18.272l.086.006h1.212c8.972.023 16.43-6.906 17.067-15.855l17.067-238.933c.669-9.425-6.43-17.608-15.856-18.278z"/></svg>

    </button>
    <p>{{ingredient}}</p>
  </li>
</template>

<script>
import db from '../plugins/firebaseinit'
export default {
  props: ['ingredient'],
  methods: {
    deleteIngredient: function(e){
      e.preventDefault()

      const currentIngredients = JSON.parse(localStorage.getItem('ingredients'))
      const removedIngredient = currentIngredients.splice(currentIngredients.indexOf(this.ingredient), 1)
      const newIngredients = currentIngredients
      localStorage.setItem('ingredients', JSON.stringify(newIngredients))

      this.$emit('deleteIngredient', newIngredients)

      // db.collection('Ingredients').doc(this.ingredient.id).delete()

    }
  }
}
</script>

<style lang="scss">
.ingredient {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 0;
  p {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-transform: capitalize;
  font-family: 'Caveat';
  font-size: 22px;
  font-weight: bold;
  padding-right: 5px;
    &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 1px;
      background: #c50000;
      transition: width ease 0.2s;
      top: 50%;
    }
  }
  button {
    margin-right: 10px;
    position: relative;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: none;
    background: none;
    cursor: pointer;
    svg {
      fill: #c50000
    }
    &:hover,
    &:focus {
      & + p {
        &::after {
          width: 100%;
        }
      }
    }
  }

}

</style>