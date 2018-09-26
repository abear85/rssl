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
        <router-link to="/teams">Teams</router-link> |
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
@import url('https://fonts.googleapis.com/css?family=Comfortaa:400,700|Kanit:400,400i|Montserrat:600|Raleway');
/*
font-family: 'Comfortaa', cursive; 700=nav
font-family: 'Kanit', sans-serif;
font-family: 'Montserrat', sans-serif;
font-family: 'Raleway', sans-serif; any p tags
*/
body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f1f1f1;
  position: relative;
}
header{
  width: 100%;
  //height: 90px;
  background-image:url('assets/large-bg.jpg');
  background-repeat: no-repeat;
  background-position: left -200px top;
  display: block;
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
    padding: 10px 30px;
    background-color: white;
    font-family: 'Comfortaa', cursive;
    font-weight: 700;
    a {
      color: #2c3e50;
      font-size: 16px;
      text-decoration: none;
      &.router-link-exact-active {
        color: #2a91ff;
      }
    }
  }
}
footer{
  width: 100%;
  background-color: #afafaf;
  @media only screen and (min-width: 768px){
    height: 60px;
    // position: absolute;
    // bottom: 0;
  }
  >div{
    max-width: 900px;
    padding: 10px;
    margin:0 auto;
    .left{
      width: 100%;
      text-align: center;
      color: white;
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
.dropdown-wrapper{
  overflow: hidden;
  background: #666;
  position: relative;
  &:after{
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid white;
    position: absolute;
    top: 13px;
    right: 10px;
    transition: all 250ms ease-in-out;
    z-index: 0;
  }
  &.open{
    &:after{
      transform: rotate(-180deg);
    }
    ul{
      max-height: 200px;
      transition: max-height 250ms ease-in-out;
    }
  }
  a{
    display: block;
    color:#fff;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    text-transform: uppercase;
    padding:10px;
    z-index: 1;
    position: relative;
  }
  ul{
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 0;
    transition: max-height 250ms ease-in-out;
    background-color: white;
    li{
        padding: 0;
        margin: 0;
        a{
          background: none;
          color: black;
          font-family: 'Kanit', sans-serif;
          font-size: 14px;
          padding: 0;
          font-weight: normal;
        }
        span{
            display: block;
        }
    }
  }
}
.output-wrapper{
  ul{
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
</style>
