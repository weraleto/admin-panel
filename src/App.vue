<template>
  <div id="app">
    <div class="main-wrapper">
      <!-- navigation -->
        <div class="hamburger-icon"
          @click="showNav=true"
        >
            <img class="desktop-only" src="../public/svg/Group 20.svg" alt="menu_icon">
            <img class="mobile-only" src="../public/svg/hamb-mobile.svg" alt="menu_icon">
        </div>
        <transition name="fade-nav">
          <div class="nav-panel-wrapper" v-if="showNav">
            <div class="nav-panel-outer"></div>
            <nav class="nav-panel">
                <div class="mobile-only nav-panel-logo">
                  <router-link to="/">
                    <!-- <img src="../public/svg/mobile-nav-logo.svg" alt="menu_icon"> -->
                  </router-link>
                </div>
                <div class="close-btn"
                  @click="showNav=false"
                >
                  <img class="desktop-only" src="../public/svg/close_btn.svg" alt="menu_icon">
                  <img class="mobile-only" src="../public/svg/close-mobile.svg" alt="menu_icon">
                </div>
                
              <div class="nav-panel-inner">
                <router-link v-for="(link, index) in navLinks" 
                      :key="index"
                      class="nav-panel-item" :to="{name:link.alias}">{{link.name}}</router-link>
              </div>
            </nav>
          </div>
        </transition>
        <!-- sidebar -->
        <aside class="sidebar">
            <div class="site-logo">
              <router-link to="/">
                <!-- <img src="../public/svg/Group 18.svg" alt="logo"> -->
              </router-link>
            </div>
            <footer class="sidebar-footer">
                <!-- FACE FIT <span>© 2020</span> -->
            </footer>
        </aside>
        <div class="mobile-content">
          <transition name="fade" mode="out-in" @before-leave="beforeLeave">
              <router-view></router-view>
          </transition>
        <footer class="footer-mobile">
          <!-- FACE FIT © 2020 -->
        </footer>

        </div>
    </div>
  </div>
</template>

<script>
import Auth from './components/Auth'
import Welcome from './components/Welcome'
import Quiz from './components/Quiz'
import CliBase from './components/CliBase'
export default {
  components:{
    Auth,
    Welcome,
    Quiz,
    CliBase
  },
  name: 'app',
  data () {
    return {
      auth: false,
      showNav: false,
      navLinks: [
        {name: 'Все товары', alias: 'client-base'},
        {name: 'Добавить товар', alias: 'add'},
        {name: 'Баланс', alias: 'balance'},
        {name: 'Настройки', alias: 'settings'},
        {name: 'Помощь', alias: ''},
        {name: 'Выйти', alias: 'auth'},
      ]
    }
  },
  methods: {
    beforeLeave(){
      this.showNav=false;
    }
  },
}
</script>

