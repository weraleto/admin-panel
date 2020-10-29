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
                                    <ValidationProvider class="input" :rules="{ regex:/^\d+$/, required: true, min_value: 10 }"
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
        </main>
</template>

<script>

export default {
    data() {
        return {
            num: null
        }
    },
    methods: {
        proceedPayment(){
            this.$http.post('/api/payments', {amount: this.num.toString()})
        }
    }
}
</script>