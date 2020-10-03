<template>
  <main class="main-content" >
            <!-- main header -->
            <header>
                <h1 class="page-header">Авторизация</h1>
            </header>
            <!-- auth form -->
            <div class="form-content auth-form">
                <h3 class="form-subheader">Войдите <span>в свой кабинет</span></h3>
                <form action="">
                    <div class="form-group">
                        <div class="form-grop-blocks">
                            <div class="form-group-block" v-for="(item, index) in fields" :key="index">
                                <label :for="item.label">{{item.label}}</label>
                                <input type="text" :name="item.label" :placeholder="item.placeholder">
                            </div>
                        </div>
                        <div class="remark">
                                <router-link to="#">
                                    Забыли пароль?
                                 </router-link>
                            </div>
                        <div class="btn-group">
                            
                            <router-link :to="'client-base'">
                                
                                <button class="btn btn-active"
                                >Войти</button>
                            </router-link>
                            <router-link :to="'reg'">
                                
                                <button class="btn btn-active"
                                >Регистрация</button>
                            </router-link>
                        </div>
                        
                    </div>
                </form>
            </div>
            <!-- end auth form -->
        </main>
</template>

<script>
import MaskedInput from './MaskedInput'
export default {
    data() {
        return {
            fields:[
                {
                    isRequired:true,
                    label:"Логин",
                    name:"auth_login",
                    placeholder:"Введите логин",
                },
                {
                    isRequired:true,
                    label:"Пароль",
                    name:"auth_pass",
                    placeholder:"Введите пароль",
                },
                
            ]
        }
    },
    components: {
        MaskedInput
    }
}
</script>