<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
}
</script>

<style lang="less">
@import url(~@/assets/style/utils);

*{
  box-sizing: border-box;
  margin: 0;
  letter-spacing: .5px;
}
html{
  font-size: 14px;
}
body{
  background: rgb(43, 62, 79);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: white;
}
</style>
