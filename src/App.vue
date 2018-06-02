<template>
  <div id="app">
    <header>
      <span>
        <img src="./assets/nem_logo_WEB.png" alt="Vue.js PWA"  align="middle">
        XEM Invoice
      </span>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  padding: 10px;
}

header {
  margin: 0;
  height: 80px;
  padding: 2px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 0;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 2px;
}
</style>
