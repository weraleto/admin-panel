<template>
  <main class="main-content" >
            <!-- main header -->
            <header>
                <h1 class="page-header">Сбросить пароль</h1>
            </header>
            <!-- form -->
            <div class="form-content auth-form">
                <h3 class="form-subheader">Введите <span>свой email</span></h3>
                <ValidationObserver v-slot="{ invalid }" tag="form">

                    <div class="form-group">
                        <div class="form-grop-blocks">
                            <div class="form-group-block" >
                                <label for="auth_email">Email <span>*</span> </label>
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
                            
                        </div>
                        
                        <div class="btn-group">
                                
                                <button @click.prevent="clear" :disabled="invalid" class="btn btn-active"
                                >Сбросить пароль</button>
                                <router-link :to="'auth'">
                                    <button class="btn btn-light"
                                    >Отмена</button>
                                </router-link>
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
                email_address: '',
                method_type: 'via_email_address'
            }
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