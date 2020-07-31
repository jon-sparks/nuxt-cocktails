<template>
  <div class="box">
      <h3 class="box-title">{{title}}</h3>
      <slot></slot>
  </div>
</template>

<script>
export default {
    props: ['title']
}
</script>

<style lang="scss">
.box {
  padding: 25px;
  margin: 10px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 7px 20px -10px rgba(0,0,0,0.3);
  &-title {
    position: relative;
    font-family: 'Caveat';
    font-size: 32px;
    padding-bottom: 10px;
    margin-bottom: 10px;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      background: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%);
      width: 100%;
      height: 1px;
    }
  }
}
</style>