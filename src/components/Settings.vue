<template>
  <main class="main-content">
        <div class="step--1-outer">
            <!-- main header -->
            <header>
                <h1 class="page-header">{{pageName}}</h1>
            </header>
            <!-- auth form -->
            <div class="form-content step--1">
                <ValidationObserver v-slot="{ invalid }" tag="form">
                    
                <!-- <form @submit.prevent="onSubmit"> -->
                    <div class="form-group">
                        <div class="form-grop-blocks">

                            
                            <div class="form-group-block">
                                <label for="auth_email">Email <span>*</span> </label>
                                

                                
                                <ValidationProvider class="input" :rules="{ regex: /^.+@.+\.+./, required: true }"
                                     v-slot="{classes}"
                                >
                                    <input
                                    v-if="isSetting"
                                        placeholder="Введите Email"
                                        v-model="form.account_email_address"
                                        id="auth_email"
                                        :class="classes"
                                        type="email"
                                        :disabled="isSetting"
                                    >
                                    <input
                                    v-else
                                        placeholder="Введите Email"
                                        v-model="form.email_address"
                                        id="auth_email"
                                        :class="classes"
                                        type="email"
                                        :disabled="isSetting"
                                    >

                                </ValidationProvider>
                            </div>
                            <template v-if="!isSetting">
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
                                            v-model="form.password"
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
                            </template>
                            <div class="form-group-block" >
                                <label for="auth_shop">Название магазина <span>*</span> </label>
                                <ValidationProvider class="input" :rules="{ regex: /^.{1,20}$/, required: true}"
                                     v-slot="{classes}"
                                >

                                    <input
                                        placeholder="Название магазина"
                                        id="auth_shop"
                                        :class="classes"
                                        type="text"
                                        v-model="form.shop.name"
                                    >

                                </ValidationProvider>
                            </div>
                            <div class="form-group-block" >
                                <label for="auth_website">Сайт </label>
                                <ValidationProvider class="input" :rules="{ regex: /^.{1,}$/}"
                                     v-slot="{classes}"
                                >
                                    <input
                                        placeholder="Сайт"
                                        id="auth_website"
                                        type="text"
                                        :class="classes"
                                        v-model="form.shop.website_url"
                                    >
                                </ValidationProvider>
                                
                            </div>
                            <div class="form-group-block" >
                                <label for="auth_whatsapp">Номер телефона WhatsApp </label>
                                <ValidationProvider class="input" 
                                >

                                    <masked-input
                                        placeholder="Номер телефона WhatsApp"
                                        id="auth_whatsapp"
                                        v-model="form.shop.whats_app_phone_number"
                                        type="tel"
                                        :mask="['+','7',' ','(', /[9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
                                        :guide="true"
                                    >
                                    </masked-input>

                                </ValidationProvider>
                                    
                            </div>
                            <!-- <div v-if="!isSetting" class="form-group-block agreement"> -->
                                <ValidationProvider v-if="!isSetting" class="form-group-block agreement" :rules="{required:{ allowFalse: false }}">
                                <input v-model="confirmPolicy" type="checkbox" name="step-1_agree" id="step-1_agree" >
                                <label class="label-checkbox" for="step-1_agree">
                                    Я согласен(на) с условиями <span> Политики конфиденциальности. </span>
                                </label>
                                </ValidationProvider>
                            <!-- </div> -->
                        </div>
                        <!-- <div class="btn-group">
                            

                        </div> -->
                        <div class="btn-group">
                            <button
                            @click.prevent="sendForm"
                            :disabled="invalid"
                             class="btn btn-active">{{submitName}}</button>
                            
                                <button
                                v-if="isSetting"
                            @click.prevent="$router.push({name:'authpass'})"

                             class="btn btn-active">Изменить пароль</button>

                            <button
                            @click.prevent="$router.go(-1)"
                             class="btn btn-light">Назад</button>

                        </div>
                        
                        <div class="remark">
                            * Вся предоставленная информация конфиденциальна <span>и не будет передана третьим лицам.</span>
                        </div>
                    </div>
                <!-- </form> -->
                </ValidationObserver>
            </div>


            <!-- end auth form -->
        </div>
        
    </main>
</template>

<script>
import MaskedInput from 'vue-text-mask'
export default {
    components: { MaskedInput },
    data() {
        return {
            confirmPassword: '',
            confirmPolicy: false,
            form: {
                email_address:'',
                password: '',
                shop: {
                    name: '',
                    website_url: null,
                    whats_app_phone_number: null
                },
                username: ''
            },

        }
    },
    methods: {
        async sendForm(){
            let url = this.isSetting ? '/api/edit_shop' : '/api/register';
           let formRequest = {} 
           Object.assign(formRequest, this.form);
           const {shop} = formRequest;
           let ph = shop.whats_app_phone_number.replace(/[-\+\(\)\s]/g,'');

           formRequest.shop = {
                name: shop.name,
                website_url: shop.website_url,
                whats_app_phone_number: ph && ph.length > 0 ? ph : null
           }
           formRequest = this.isSetting ? formRequest.shop : formRequest;
            await this.$http.post(url, formRequest)
                .then(response => {
                    if(this.isSetting){
                        this.$notify({
                            title: 'Готово',
                            type: 'success',
                            message: 'Профиль успешно изменен'
                        })
                    }else{
                        this.$router.push('welcome');
                    }
                })
                .then(()=>{
                    this.getUserSettings()
                })
        },
        getUserSettings(){

            if (this.isSetting) {
                this.$http.get('/api/get_settings')
                .then(res=>{
                    this.form = res.data
                })
            }
        }
    },
    computed: {
        pageName(){
            let pageName = this.$route.name == 'settings' ? 'Настройки аккаунта' : 'Регистрация'
            return pageName;
        },
        submitName(){
            return this.$route.name == 'settings' ? 'Сохранить' : 'Регистрация'
        },
        isSetting(){
            return this.$route.name == 'settings';
        }
    },
    mounted(){
        this.getUserSettings()
    }
}
</script>

<style>

    

</style>