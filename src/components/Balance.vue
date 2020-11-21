<template>
  <main class="main-content" >
            <!-- main header -->
            <header>
                <h1 class="page-header">Пополнить баланс</h1>
            </header>
            <!-- auth form -->
            <div class="form-content auth-form">
                <!-- <h3 class="form-subheader">Войдите <span>в свой кабинет</span></h3> -->
                <ValidationObserver v-slot="{ invalid }" tag="form">
                    <form action="">
                        <div class="form-group">
                            <div class="form-grop-blocks">
                                <div class="form-group-block" >
                                    <label for="item_name">Сумма пополнения (руб.) <span>*</span> </label>
                                    <ValidationProvider class="input" :rules="{ regex:/^\d+$/, required: true, min_value: 100 }"
                                        v-slot="{classes}"
                                    >
                                        <input
                                            placeholder="Укажите сумму в рублях"
                                            v-model="num"
                                            id="item_name"
                                            :class="classes"
                                            type="text"
                                        >

                                    </ValidationProvider>
                                </div>
                            </div>
                            <!-- <router-link :to="'welcome'"> -->
                                
                                <button class="btn btn-active"
                                    :disabled="invalid"
                                    @click.prevent="proceedPayment"
                                >Продолжить</button>
                            <!-- </router-link> -->
                        </div>
                    </form>
                </ValidationObserver>
            </div>
            <!-- end auth form -->
            <div class="form-content auth-form" v-show="showPayLink">
                <p>Вы будете автоматически перенаправлены на страницу оплаты. </p>
                <p>В случае, если переход на произошел, вы можете перейти самостоятельно по ссылке ниже для завершения оплаты. </p>

                <a :href="paylink" target="_blank" rel="noopener noreferrer">
                    <button class="btn btn-active"
                    >Заверить оплату</button>
                </a>
            </div>
        </main>
</template>

<script>

export default {
    data() {
        return {
            num: null,
            paylink: '',
            showPayLink: false
        }
    },
    methods: {
        proceedPayment(){
            this.$http.post('/api/payments', {amount: this.num.toString()})
                .then(res=>{
                    const paylink = res.data.confirmation_url;
                    window.open(paylink, '_blank')
                    this.paylink = paylink
                    this.showPayLink = true;
                })
        }
    }
}
</script>