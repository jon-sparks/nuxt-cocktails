<template>
  <div class="box">
      <h3>{{title}}</h3>
      <slot></slot>
  </div>
</template>

<script>
export default {
    props: ['title']
}
</script>

<style>
.box {
  padding: 25px;
  margin: 10px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 7px 20px -10px rgba(0,0,0,0.3);
}
</style>