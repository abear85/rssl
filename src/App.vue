<template>
  <div id="app">
    <header>
      <figure>
        <img src="./assets/rssl-logo.png" alt="R.S.S.L" title="R.S.S.L"/>
      </figure>
      <figure class="leaf">
        <img src="./assets/leaf.png"/>
      </figure>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/seasons">Seasons</router-link>
      </div>
    </header>
    <router-view/>
    <footer>
      <div>
        <div class="left">
          albertobonora.ca &copy; 2018
        </div>
        <div class="right">
          <p>built &amp; powered using:</p>
          <figure class="vuejs">
            <img src="./assets/logo.png" alt="vuejs" title="vuejs"/>
          </figure>
          <figure class="wp">
            <img src="./assets/wp-logo.png" alt="wordpress" title="wordpress"/>
          </figure>
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="scss">
body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
header{
  width: 100%;
  //height: 90px;
  background-image:url('assets/large-bg.jpg');
  background-repeat: no-repeat;
  background-position: left -200px top;
  display: inline-block;
  position: relative;
  overflow: hidden;
  figure{
    margin: 10px 0 0 10px;
    padding: 0;
    width: 70px;
    img{
      width: 100%;
    }
    &.leaf{
      position: absolute;
      top: 0;
      right:0;
      width: 51px;
      margin: 0;
    }
  }
  #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
}
footer{
  width: 100%;
  background-color:lightgrey;
  
  @media only screen and (min-width: 768px){
    height: 60px;
    position: absolute;
  bottom: 0;
  }
  >div{
    max-width: 900px;
    padding: 10px;
    .left{
      width: 100%;
      text-align: center;
      color: darkslategray;
      font-size: 11px;
      @media only screen and (min-width: 768px){
        width: 50%;
        line-height: 40px;
        display: inline-block;
        text-align: left;
        float: left;
      }
    }
    .right{
      width: 100%;
      text-align: center;
      color: darkslategray;
      font-size: 11px;
      p{
        margin-bottom: 0;
        @media only screen and (min-width: 768px){
          display: inline-block;
          margin: 0;
        }
      }
      figure{
        display: inline-block;
        margin: 0;
        padding: 0;
        vertical-align: -webkit-baseline-middle;
        width: 30px;
        img{
          width:100%;
        }
        &.wp img{
          width: 112%;
        }
      }
      @media only screen and (min-width: 768px){
        width: 50%;
        line-height: 40px;
        display: inline-block;
        text-align: right;
        float: right;
      }
    }
  }
}
</style>
