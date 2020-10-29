<template>
  <div id="app">
    <div class="main-wrapper" v-loading="loading">
      <!-- navigation -->
        <div class="hamburger-icon"
          @click="showNav=true"
          v-show="isAuth"
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
                      class="nav-panel-item link" :to="{name:link.alias}">{{link.name}}</router-link>
                <a href="/logout" @click.prevent="logout" class="nav-panel-item" >Выйти</a>
              </div>

              <div class="nav-panel-stats" v-show="userRole && userRole === 'seller'">
                <div class="nav-panel-item">
                  {{shopInfo.name}}
                </div>
                <div class="nav-panel-item">
                  Баланс: <span>{{shopInfo.balance}} руб.</span>
                </div>
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
                DIZI - EASY DESIGN <span>© 2020</span>
            </footer>
        </aside>
        <div class="mobile-content">
          <transition name="fade" mode="out-in" @before-leave="beforeLeave">
              <router-view></router-view>
          </transition>
        <footer class="footer-mobile">
          DIZI - EASY DESIGN © 2020
        </footer>

        </div>
    </div>
  </div>
</template>

<script>

export default {
  components:{

  },
  name: 'app',
  data () {
    return {
      auth: false,
      showNav: false,
      navLinksUser: [
        {name: 'Все товары', alias: 'client-base'},
        {name: 'Добавить товар', alias: 'add'},
        {name: 'Баланс', alias: 'balance'},
        {name: 'Настройки', alias: 'settings'},
        // {name: 'Помощь', alias: ''},
        // {name: 'Выйти', alias: 'auth'},
      ],
      navLinksAdmin: [
        {name: 'Все товары', alias: 'client-base'},
        {name: 'Настройки', alias: 'settings'},
        // {name: 'Помощь', alias: ''},
        // {name: 'Выйти', alias: 'auth'},
      ]
    }
  },
  methods: {
    beforeLeave(){
      this.showNav=false;
    },
    async logout(){
      this.$http.post('/api/accounts/log_out')
        .then(
          res=>{
             this.$http.defaults.headers.common['Authorization'] = ''
             this.$router.push('/auth')
             this.isAuth = !this.isAuth
             this.showNav = !this.showNav
          }
        )
        .catch(
          err => {
            let errMsg = err.data ? err.data : 'Что-то пошло не так'
            this.$notify.error({
              title: 'Ошибка',
              message: errMsg
            })
            this.showNav = !this.showNav
          }
        )
    }
  },
  computed:{
    isAuth: {
      get: function() {
				return this.$store.state.isAuth;
			},
			set: function(newValue) {
				return this.$store.state.isAuth = newValue;
			}
      
    },
    loading(){
      return this.$store.state.loading
    },
    navLinks(){
      return this.$store.state === 'admin' ? this.navLinksAdmin : this.navLinksUser
    },
    shopInfo(){
      return this.$store.state.shopInfo
    },
    userRole(){
      return this.$store.state.userRole
    }
  }
}
</script>

