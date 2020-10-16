<template>
  <main class="main-content" >
            <!-- main header -->
            <header>
                <h1 class="page-header">Сбросить пароль</h1>
            </header>
            <!-- form -->
            <div class="form-content auth-form">
                <h3 class="form-subheader">Введите <span>новый пароль</span></h3>
                <ValidationObserver v-slot="{ invalid }" tag="form">

                    <div class="form-group">
                        <div class="form-grop-blocks">
                            <div class="form-group-block" >
                                <label for="auth_pass">Пароль <span>*</span> </label>
                                <ValidationProvider name="password" class="input" :rules="{ regex: /^(?=.*?[A-Z])[a-zA-Z0-9]{6,}$/, required: true}"
                                     v-slot="{classes}"
                                >
                                    <input
                                        placeholder="Введите пароль"
                                        id="auth_pass"
                                        type="text"
                                        autocomplete="off"
                                        :class="classes"
                                        v-model="form.new_password"
                                    >

                                </ValidationProvider>
                            </div>
                            <div class="form-group-block" >
                                <label for="auth_pass_2">Подтверждение пароля <span>*</span> </label>
                                <ValidationProvider class="input" :rules="{required: true, password: '@password'  }"
                                     v-slot="{classes}"
                                >
                                    <input
                                        placeholder="Введите пароль"
                                        id="auth_pass_2"
                                        :class="classes"
                                        autocomplete="off"
                                        type="text"
                                        v-model="confirmPassword"
                                    >

                                </ValidationProvider>
                            </div>
                            
                        </div>
                        
                        <div class="btn-group">
                                
                                <button @click.prevent="clear" :disabled="invalid" class="btn btn-active"
                                >Сменить пароль</button>
                                
                                <button @click.prevent="$router.go(-1)" class="btn btn-light"
                                >Отмена</button>
                                
                        </div>
                        
                    </div>
                </ValidationObserver>
            </div>
            <!-- end form -->
        </main>
</template>

<script>
export default {
    data() {
        return {
            form: {
                new_password: '',
            },
            confirmPassword:''
        }
    },
    methods: {
        async clear(){
            await this.$http.post('/api/accounts/request_password_reset', this.form)
                .then(
                    res=>{
                       this.$notify({
                           title: 'Проверьте почту',
                           message: 'На вашу почту отправлено письмо для смены пароля'
                       })
                    }
                )
                .catch(
                    err=>{
                        this.notification(err.response.data.type)
                    }
                );
        },
        notification(msg){
            this.$notify.error({
                title: 'Ошибка',
                message: msg
            })
        }
    }
}
</script>