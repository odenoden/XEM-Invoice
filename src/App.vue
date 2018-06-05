<template>
  <div id="app">
    <nav class="navbar navbar-expand-xl navbar-dark bg-dark">
      <a class="navbar-brand" href="#"><img src="./assets/nem_logo_WEB.png" alt="Vue.js PWA"  align="middle">XEM Invoice</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample06" aria-controls="navbarsExample06" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExample06">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">販売管理</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">設定</a>
          </li>
        </ul>
      </div>
    </nav>

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
