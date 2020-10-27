<template>
  <main class="main-content" >
            <!-- main header -->
            <header>
                <h1 class="page-header">DIZI - EASY DESIGN</h1>
            </header>
            <!-- auth form -->
            <div class="form-content auth-form">
                <h3 class="form-subheader">Войдите <span>в свой кабинет</span></h3>
                <ValidationObserver v-slot="{ invalid }" tag="form">

                    <div class="form-group">
                        <div class="form-grop-blocks">
                            <div class="form-group-block" >
                                <label for="auth_email">Email  </label>
                                <ValidationProvider class="input" :rules="{ regex: /^.+@.+\.+./, required: true }"
                                     v-slot="{classes}"
                                >
                                    <input
                                        placeholder="Введите Email"
                                        v-model="form.email_address"
                                        id="auth_email"
                                        :class="classes"
                                        type="email"
                                    >

                                </ValidationProvider>
                            </div>
                            
                            <div class="form-group-block" >
                                <label for="auth_pass">Пароль </label>
                                <ValidationProvider name="password" class="input" :rules="{ regex: /^(?=.*?[A-Z])[a-zA-Z0-9]{6,}$/, required: true}"
                                     v-slot="{classes}"
                                >
                                    <input
                                        placeholder="Введите пароль"
                                        id="auth_pass"
                                        type="password"
                                        autocomplete="off"
                                        :class="classes"
                                        v-model="form.password"
                                    >

                                </ValidationProvider>
                            </div>
                        </div>
                        <div class="remark">
                                <router-link :to="{name:'respass'}">
                                    Забыли пароль?
                                 </router-link>
                            </div>
                        <div class="btn-group">
                            
                            <!-- <router-link :to="'client-base'"> -->
                                
                                <button @click.prevent="auth" :disabled="invalid" class="btn btn-active"
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
export default {
    data() {
        return {
            form: {
                email_address: '',
                password: ''
            },
        }
    },
    methods: {
        async auth(){
            await this.$http.post('/api/accounts/log_in', this.form)
                .then(
                    res=>{
                        const token = res.data.access_token;
                        this.$http.defaults.headers.common['Authorization'] = `Bearer ${token}`
                        // this.$http.defaults.headers.common['refresh_token'] = res.data.refresh_token
                        this.$store.state.isAuth = true;
                        // this.$store.state.access_token = token;
                        this.$store.state.refresh_token = res.data.refresh_token
                        this.$store.state.userRole = res.data.role
                        this.$router.push('base')
                    }
                )
                .catch(
                    err=>{
                        if (err.response.status == 422 && err.response.data.type === 'unverified_email_address') {
                            this.$confirm('Аккаунт не активирован. Подтвердите регистрацию пройдя по ссылке отправленной на Ваш email', 'Ошибка', {
                                confirmButtonText: 'Отправить повторно',
                                cancelButtonText: 'Закрыть',
                                type: 'warning'
                                }).then(() => {
                                    this.$http.post('/api/accounts/accounts/resend_email_address_verification_message', {email_address: this.form.email_address})
                                    .then(() => {
                                        this.$message({
                                            type: 'success',
                                            message: 'Письмо отправлено'
                                        });
                                        }).catch(() => {
                                        this.$message({
                                            type: 'info',
                                            message: 'Что-то пошло не так. Попробуйте еще раз'
                                        });          
                                        });
                                })
                        }
                        
                    }
                )
        }
    }
}
</script>