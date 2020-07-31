<template>
  <nuxt-link :to="`/recipe?cocktail=${cocktail}`">Link</nuxt-link>
</template>

<script>
export default {
    props: ['cocktail']
}
</script>

<style>

</style>