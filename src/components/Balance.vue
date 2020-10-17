<template>
  <main class="main-content" >
            <!-- main header -->
            <header>
                <h1 class="page-header">Пополнить баланс</h1>
            </header>
            <!-- auth form -->
            <div class="form-content auth-form">
                <!-- <h3 class="form-subheader">Войдите <span>в свой кабинет</span></h3> -->
                <form action="">
                    <div class="form-group">
                        <div class="form-grop-blocks">
                            <!-- <masked-input
                                :isRequired="false"
                                label="Способ оплаты"
                                name="balance_type"
                                type="select"
                                placeholder="Выберите способ оплаты"
                            ></masked-input>
                             <masked-input
                                :isRequired="true"
                                label="Сумма пополнения"
                                name="balance_sum"
                                placeholder="Укажите сумму"
                                mask="balance_sum"
                            ></masked-input> -->
                        </div>
                        <!-- <router-link :to="'welcome'"> -->
                            
                            <button class="btn btn-active"
                            >Продолжить</button>
                        <!-- </router-link> -->
                    </div>
                </form>
            </div>
            <!-- end auth form -->
        </main>
</template>

<script>

export default {
    data() {
        return {
        }
    },
}
</script>