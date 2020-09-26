<template>
    <main class="main-content">
        <div class="step--1-outer">
            <!-- main header -->
            <header>
                <h1 class="page-header">1. Введите свои данные</h1>
            </header>
            <!-- auth form -->
            <div class="form-content step--1">
                <form action="">
                    <div class="form-group">
                        <div class="form-grop-blocks">
                            <div class="form-group-block">
                                <label for="step-1_name">Имя</label>
                                <div class="input-required">
                                    <input class="required" type="text" name="step-1_name" placeholder="Введите имя">
                                    <div class="pseudo-mark">*</div>
                                </div>
                            </div>
                            <div class="form-group-block">
                                <label for="step-1_birth">Дата рождения</label>
                                <div class="input-required">
                                    <masked-input type="text" name="step-1_birth" mask="11.11.1111" placeholder="__.__.____г." />
                                    <div class="pseudo-mark">*</div>
                                </div>
                            </div>
                            <div class="form-group-block">
                                <label for="step-1_surname">Фамилия</label>
                                <div class="input-required">
                                    <input class="required" type="text" name="step-1_surname" placeholder="Введите фамилию">
                                    <div class="pseudo-mark">*</div>
                                </div>
                            </div>
                            <div class="form-group-block">
                                <label for="step-1_phone">Телефон</label>
                                <div class="input-required">
                                    <masked-input type="text" name="step-1_phone" mask="\+\7(111)111-11-11" placeholder="+7(___)___-__-__" />
                                    <div class="pseudo-mark">*</div>
                                </div>
                            </div>
                            <div class="form-group-block">
                                <label for="step-1_father">Отчество</label>
                                <div class="input-required">
                                    <input class="required" type="text" name="step-1_father" placeholder="Введите отчество">
                                    <div class="pseudo-mark">*</div>
                                </div>
                            </div>
                            <div class="form-group-block">
                                <label for="step-1_insta">Instagram</label>
                                <div class="input-required">
                                    <masked-input type="text" max="30" name="step-1_insta" mask="\@aaaaaaaaaaaaaaaaaa*" placeholder="@" />
                                    <!-- <input class="required" type="text" name="step-1_phone" placeholder="+7(___)___-__-__"> -->
                                    <!-- <div class="pseudo-mark">*</div> -->
                                </div>
                            </div>
                            <div class="form-group-block agreement">
                                <input type="checkbox" name="step-1_agree" id="step-1_agree">
                                <label class="label-checkbox" for="step-1_agree">
                                    Я согласен(на) с условиями <span>договора на оказание услуг.</span>
                                </label>
                            </div>
                        </div>
                        
                        <div class="btn-group">
                            <button
                                @click="$emit('onplus')"
                             class="btn btn-active">Продолжить</button>
                            <router-link :to="{name:'home'}">
                                <button class="btn btn-light">Назад</button>
                            </router-link>
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
import MaskedInput from 'vue-masked-input'
export default {
    components: {
        MaskedInput
    },
    data() {
        return {
            data:{name:'',surname:'',fname:'',birth:'',phone:'',ig:'',agr:''}
        }
    },
}
</script>