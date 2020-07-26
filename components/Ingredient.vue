<template>
  <div>
    <h3 :style="ingredient.Owned ? 'color: blue' : 'color: red'">{{ingredient.Name}}</h3>   
  </div>
</template>

<script>

export default {
    props: ['ingredient'],
}
</script>

<style>

</style>