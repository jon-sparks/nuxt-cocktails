<template>
  <li class="ingredient">
    <button>x</button>
    <h3>{{ingredient.Name}}</h3>
  </li>
</template>

<script>

export default {
  props: ['ingredient'],
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
}

</style>