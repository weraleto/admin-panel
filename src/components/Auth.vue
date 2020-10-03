<template>
  <main class="main-content" >
            <!-- main header -->
            <header>
                <h1 class="page-header">Авторизация</h1>
            </header>
            <!-- auth form -->
            <div class="form-content auth-form">
                <h3 class="form-subheader">Войдите <span>в свой кабинет</span></h3>
                <ValidationObserver v-slot="{ invalid }" tag="form">

                    <div class="form-group">
                        <div class="form-grop-blocks">
                            <ValidationProvider tag="div" class="form-group-block" :rules="{ regex: /^([a-z][a-z0-9]{5,9})$/, required: true }" v-slot="{classes}">
                                <label for="auth_login">Логин </label>
                                    <input
                                        placeholder="Введите логин"
                                        v-model="form.username"
                                        id="auth_login"
                                        :class="classes"
                                        type="text"
                                    >
                            </ValidationProvider>
                            
                            <div class="form-group-block" >
                                <label for="auth_pass">Пароль </label>
                                <ValidationProvider name="password" class="input" :rules="{ regex: /^(?=.*?[A-Z])[a-zA-Z0-9]{6,}$/, required: true}"
                                     v-slot="{classes}"
                                >
                                    <input
                                        placeholder="Введите пароль"
                                        id="auth_pass"
                                        type="text"
                                        autocomplete="off"
                                        :class="classes"
                                        v-model="form.password"
                                    >

                                </ValidationProvider>
                            </div>
                        </div>
                        <div class="remark">
                                <router-link to="#">
                                    Забыли пароль?
                                 </router-link>
                            </div>
                        <div class="btn-group">
                            
                            <!-- <router-link :to="'client-base'"> -->
                                
                                <button :disabled="invalid" class="btn btn-active"
                                >Войти</button>
                            <!-- </router-link> -->
                            <router-link :to="'reg'">
                                
                                <button class="btn btn-active"
                                >Регистрация</button>
                            </router-link>
                        </div>
                        
                    </div>
                </ValidationObserver>
            </div>
            <!-- end auth form -->
        </main>
</template>

<script>
import MaskedInput from './MaskedInput'
export default {
    data() {
        return {
            form: {
                username: '',
                password: ''
            },
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