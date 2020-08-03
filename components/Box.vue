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
  position: relative;
  padding: 25px;
  margin: 10px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 7px 20px -10px rgba(0,0,0,0.3);
  max-width: 900px;
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
  &-content {
    display: flex;
    padding: 5%;
  }
  &-method {
    text-align: left;
    p {
      line-height: 25px;
    }
  }
  &-ingredients {
    text-align: left;
    min-width: 150px;
    margin-right: 25px;
    border-right: solid 1px lightgrey;
    h2 {
      margin: 0 20px 10px 0;
      padding-bottom: 10px;
      border-bottom: solid 1px lightgrey;
      font-family: 'Caveat';
      font-size: 28px;
    }
    ul {
      list-style-type: circle;
      padding-left: 20px;
      margin-right: 20px;
      font-family: 'Caveat';
      font-size: 23px;
      li {
        
      }
    }
  }
  &-close {
    position: absolute;
    top: 25px;
    left: 25px;
    display: flex;
    align-items: center;
    font-size: 16px;
    line-height: 5px;
    background: 0;
    border: none;
    cursor: pointer;
    svg {
      margin-right: 10px;
      transition: transform ease 0.2s;
    }
    &:hover,
    &:focus {
      svg {
        transform: translateX(-10px);
      }
    }
  }
}
</style>