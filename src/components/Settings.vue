<template>
  <main class="main-content">
        <div class="step--1-outer">
            <!-- main header -->
            <header>
                <h1 class="page-header">{{pageName}}</h1>
            </header>
            <!-- auth form -->
            <div class="form-content step--1">
                <form action="">
                    <div class="form-group">
                        <div class="form-grop-blocks">
                            
                            <div class="form-group-block" v-for="(item, index) in fields" :key="index">
                                <masked-input
                                    :isRequired="item.isRequired"
                                    :label="item.label"
                                    :name="item.name"
                                    :placeholder="item.placeholder"
                                ></masked-input>
                            </div>
                            <!-- <div class="form-group-block agreement">
                                <input type="checkbox" name="step-1_agree" id="step-1_agree">
                                <label class="label-checkbox" for="step-1_agree">
                                    Я согласен(на) с условиями <span>договора на оказание услуг.</span>
                                </label>
                            </div> -->
                        </div>
                        
                        <div class="btn-group">
                            <button
                             class="btn btn-active">Сохранить</button>
                            <!-- <router-link :to="{name:'home'}">
                                <button class="btn btn-light">Назад</button>
                            </router-link> -->
                        </div>
                        <div class="remark">
                            * Вся предоставленная информация конфиденциальна <span>и не будет передана третьим лицам.</span>
                        </div>
                    </div>
                </form>
            </div>
            <!-- end auth form -->
        </div>
        
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
                    label:"Email",
                    name:"auth_email",
                    placeholder:"Введите Email",
                },
                {
                    isRequired:true,
                    label:"Пароль",
                    name:"auth_pass",
                    placeholder:"Введите пароль",
                },
                {
                    isRequired:true,
                    label:'Подтверждение пароля',
                    name:"auth_pass_2",
                    placeholder:"Введите пароль",
                },
                {
                    isRequired:true,
                    label:'Название магазина',
                    name:"auth_shop",
                    placeholder:"Название магазина",
                },
                {
                    isRequired:false,
                    label:'Сайт',
                    name:"auth_website",
                    placeholder:"Введите ссылку на сайт",
                }
            ]
        }
    },
    components: {
        MaskedInput
    },
    // mounted(){
    //     console.log(this.$route.name)
    // },
    computed: {
        pageName(){
            let pageName = this.$route.name == 'settings' ? 'Настройки аккаунта' : 'Регистрация'
            return pageName;
        }
    }
}
</script>