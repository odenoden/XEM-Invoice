<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-dark">
      <a class="navbar-brand" href="#"><img src="./assets/logo.png" alt="Vue.js PWA" align="middle">XEM Invoice</a>

      <div class="row">
        <div class="col col-sm-5 text-white">
          <label>Language</label>
        </div>
        <div class="col col-sm-7">
          <select v-model="language" class="form-control form-control-sm">
            <option>Japanese</option>
          </select>
        </div>
      </div>
<!--
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navMenu" aria-controls="navMenu" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navMenu">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="#">アドレス帳</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">設定</a>
          </li>
        </ul>
      </div>
-->
    </nav>

    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      language:       'Japanese',
    }
  },
  created (){

  },
  updated () {
    localStorage.setItem("lastLanguage", this.language);
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  padding: 5px;
}
</style>
