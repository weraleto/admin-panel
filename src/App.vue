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
                <a href="/logout" @click.prevent="logout" class="nav-panel-item link" >Выйти</a>
              </div>

              <div class="nav-panel-stats" v-show="userRole === 'seller'">
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
              <router-link class="policy-link" to="/policy">
                Пользовательское соглашение
              </router-link>
                DIZI - EASY DESIGN <span>© 2020</span>
            </footer>
        </aside>
        <div class="mobile-content">
          <transition name="fade" mode="out-in" @before-leave="beforeLeave">
              <router-view></router-view>
          </transition>
        <footer class="footer-mobile">
          <router-link class="policy-link" to="/policy">
                Пользовательское соглашение
              </router-link>
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
        {name: 'Все товары', alias: 'client-base'}
      ],
      userRole: null
    }
  },
  beforeUpdate(){
    this.getUserRole()
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
             this.isAuth = false
             this.showNav = false
             this.setUserRole( null)
             localStorage.removeItem('acs_token')
             localStorage.removeItem('token')
             localStorage.removeItem('role')
             this.$router.push('/auth')
          }
        )
    },
    getUserRole(){
      this.userRole = localStorage.getItem('role')
    },
    setUserRole(x){
      localStorage.setItem('role',x)
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
      return this.userRole === 'admin' ? this.navLinksAdmin : this.navLinksUser
    },
    shopInfo:{
      get: function() {
				return this.$store.state.shopInfo;
			},
			set: function(newValue) {
				this.$store.commit('setShopInfo', newValue)
			}
      
    }
  }
}
</script>

