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
                                <div class="tooltip-wrapper">
                                <ValidationProvider name="password" class="input" :rules="{ regex: /^(?=.*?[A-Z])[a-zA-Z0-9]{6,}$/, required: true}"
                                     v-slot="{classes}"
                                >
                                    <input
                                        placeholder="Введите пароль"
                                        id="auth_pass"
                                        type="password"
                                        autocomplete="off"
                                        :class="classes"
                                        v-model="form.new_password"
                                    >
                                    <el-tooltip effect="light" content="Пароль должен быть не короче 6 символов и иметь одну заглавную букву" placement="bottom">
                                            <i class="el-icon-question input-tooltip"></i>
                                    </el-tooltip>        
                                </ValidationProvider>
                                </div>
                                
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
                                        type="password"
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
            confirmPassword:'',
            hrefArgs: {}
        }
    },
    mounted(){
        window.location.search.replace('?','').split('&').forEach(arg=>{
            let tmp = arg.split('=');
            this.hrefArgs[tmp[0]] = tmp[1]
        })
    },
    methods: {
        async clear(){
            await this.$http.post(`/api/accounts/${this.hrefArgs.account_id}/reset_password?reset_token=${this.hrefArgs.token}`, this.form)
                .then(
                    res=>{
                       this.$notify({
                           title: 'Пароль изменен',
                           message: 'Теперь вы можете войти в свой аккаунт'
                       })
                    }
                )
                this.$router.push('/auth')
        },
    }
}
</script>