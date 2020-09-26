<template>
    <main class="main-content" >
            <div class="client-base-outer">
                <!-- main header -->
                <header>
                    <h1 class="page-header">Карточка товара</h1>
                </header>

                <div class="form-content client-base client-base-block">
                    <form action="" @submit="event.preventDefault()">
                        <div class="form-group">
                            <div class="form-group-section-outer">
                                <h3 class="form-subheader">Данные клиента</h3>
                                <div class="form-group-section">
                                    <div class="form-group-block">
                                        <label for="cb_surname">Фамилия</label>
                                        <div class="input-required">
                                            <input class="required" v-model="data.surname" type="text" name="cb_surname" placeholder="Введите фамилию">
                                            <div class="pseudo-mark">*</div>
                                        </div>
                                    </div>
                                    <div class="form-group-block">
                                        <label for="cb_birth">Дата рождения</label>
                                        <div class="input-required">
                                            <masked-input type="text" v-model="data.birth" name="cb_birth" mask="11.11.1111" placeholder="__.__.____г." />
                                            <div class="pseudo-mark">*</div>
                                        </div>
                                    </div>
                                    <div class="form-group-block">
                                        <label for="cb_name">Имя</label>
                                        <div class="input-required">
                                            <input class="required" v-model="data.name" type="text" name="cb_name" placeholder="Введите имя">
                                            <div class="pseudo-mark">*</div>
                                        </div>
                                    </div>
                                    <div class="form-group-block">
                                        <label for="cb_phone">Телефон</label>
                                        <div class="input-required">
                                            <masked-input type="text" v-model="data.phone" name="cb_phone" mask="\+\7(111)111-11-11" placeholder="+7(___)___-__-__" />
                                            <div class="pseudo-mark">*</div>
                                        </div>
                                    </div>
                                    <div class="form-group-block">
                                        <label for="cb_father">Отчество</label>
                                        <div class="input-required">
                                            <input class="required" v-model="data.fname" type="text" name="cb_father" placeholder="Введите отчество">
                                            <div class="pseudo-mark">*</div>
                                        </div>
                                    </div>
                                    <div class="form-group-block">
                                        <label for="cb_insta">Instagram</label>
                                            <masked-input type="text" v-model="data.ig" name="cb_insta"  mask="\@aaaaaaaaaaaaaaaaaa*" placeholder="@" />

                                        <!-- <input type="text" value="@ivanovvv" name="cb_insta" placeholder="@"> -->
                                    </div>
                                    <div class="form-group-block">
                                        <label for="cb_insta">Дата регистрации</label>
                                        <input disabled type="text" value="10.01.2020" name="cb_insta" placeholder="@">
                                    </div>
                                </div>

                            </div>
                            

                            <div class="btn-group">
                                <button class="btn btn-active save-edit"
                                    @click="$emit('closedata')"
                                >Сохранить</button>
                            </div>
                        </div>
                    </form>
                </div>
                
                <div class="form-content client-base client-base-block">
                    <form action="" @submit="event.preventDefault()">
                        <div class="form-group">
                            <div class="form-group-section-outer">
                                <h3 class="form-subheader">Адрес прописки</h3>
                                <div class="form-group-section">
                                    <div class="form-group-block">
                                        <label for="cb_sity">Город</label>
                                        <div class="input-required">
                                            <input class="required" value="Москва" type="text" name="cb_sity"
                                                placeholder="Введите город">
                                            <div class="pseudo-mark">*</div>
                                        </div>
                                    </div>
                                    <div class="form-group-block">
                                        <label for="cb_str">Строение</label>
                                        <input class="required" type="text" value="12" name="cb_str"
                                            placeholder="Введите номер строения">

                                    </div>
                                    <div class="form-group-block">
                                        <label for="cb_street">Улица</label>
                                        <div class="input-required">
                                            <input class="required" type="text" value="Строителей" name="cb_street"
                                                placeholder="Введите улицу">
                                            <div class="pseudo-mark">*</div>
                                        </div>
                                    </div>
                                    <div class="form-group-block">
                                        <label for="cb_apt">Квартира</label>
                                        <div class="input-required">
                                            <input class="required" type="text" value="388" name="cb_apt"
                                                placeholder="Введите номер квартиры">
                                            <div class="pseudo-mark">*</div>
                                        </div>
                                    </div>
                                    <div class="form-group-block">
                                        <label for="cb_build">Дом</label>
                                        <div class="input-required">
                                            <input class="required" type="text" value="176" name="cb_build"
                                                placeholder="Введите дом">
                                            <div class="pseudo-mark">*</div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div class="btn-group">
                                <button class="btn btn-active save-edit"
                                    @click="$emit('closedata')"
                                >Сохранить</button>
                            </div>
                            
                        </div>
                    </form>
                </div>

                <div class="form-content client-base client-base-block">
                    <form action="" @submit="event.preventDefault()">
                        <div class="form-group">
                            <div class="form-group-section-outer">
                                <h3 class="form-subheader">Паспортные данные</h3>
                                <div class="form-group-section">
                                    <div class="form-group-block">
                                        <label for="cb_sity">Серия</label>
                                        <div class="input-required">
                                            <masked-input type="text" v-model="data.passS" name="cb_sity" mask="1111" placeholder="Введите серию" />
                                            
                                            <div class="pseudo-mark">*</div>
                                        </div>
                                    </div>
                                    <div class="form-group-block">
                                        <label for="cb_str">Кем выдан</label>
                                        <div class="input-required">
                                            <input class="required" type="text" value="ОУФМС РФ по Самарской области" name="cb_street"
                                                placeholder="Наименование органа">
                                            <div class="pseudo-mark">*</div>
                                        </div>

                                    </div>
                                    <div class="form-group-block">
                                        <label for="cb_num">Номер</label>
                                        <div class="input-required">
                                            <masked-input type="text" v-model="data.passN" name="cb_num" mask="111 111" placeholder="Введите номер" />
                                            
                                            <div class="pseudo-mark">*</div>
                                        </div>
                                    </div>
                                    <div class="form-group-block">
                                        <label for="cb_apt">Дата выдачи</label>
                                        <div class="input-required">
                                            <masked-input type="text" v-model="data.passD" name="cb_apt" mask="11.11.1111" placeholder="__.__.____г." />
                                            <div class="pseudo-mark">*</div>
                                        </div>
                                    </div>
                                    <div class="form-group-block">
                                        <label for="cb_build">Код подразделения</label>
                                        <div class="input-required">
                                            <masked-input type="text" v-model="data.passC" name="cb_build" mask="111-111" placeholder="___ - ___" />
                                            <!-- <input class="required"  value="630-003" type="text" name="cb_build"
                                                placeholder="___ - ___"> -->
                                            <div class="pseudo-mark">*</div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div class="btn-group">
                                <button class="btn btn-active save-edit"
                                    @click="$emit('closedata')"
                                >Сохранить</button>
                            </div>
                            
                        </div>
                    </form>
                </div>

                <div class="form-content client-base client-base-block">
                    <form action="" @submit="event.preventDefault()">
                        <div class="form-group">
                            <h3 class="form-subheader form-subheader-cb">Данные анкеты</h3>

                            <div class="btn-group">
                                <button class="btn btn-light cli-base-sub">Перейти</button>
                            </div>
                            
                        </div>
                    </form>
                </div>

                <div class="form-content client-base client-base-block">
                    <form action="" @submit="event.preventDefault()">
                        <div class="form-group">
                            <h3 class="form-subheader form-subheader-cb">Документы на печать</h3>

                            <div class="btn-group btn-group-flex">
                                <button class="btn btn-light btn-flex">Договор на оказание услуг</button>
                                <button class="btn btn-light btn-flex">Медицинская анкета</button>
                            </div>
                            
                        </div>
                    </form>
                </div>
                
                <div class="client-base-ending">
                    <div class="btn-group">
                        <!-- <router-link to="../base" class="page-link"> -->
                            <button @click="$emit('closedata')" class="btn btn-active go-back">Назад</button>
                        <!-- </router-link> -->
                        <router-link to="/" class="page-link">
                            <button class="btn btn-light cli-base-sub">На главную</button>
                        </router-link>
                    </div>
                    <div class="remark">
                        * Вся предоставленная информация конфиденциальна <span>и не будет передана третьим лицам.</span>
                    </div>
                </div>
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
            data:{
                name:'Константин',
                surname:'Константинопольский',
                fname:'Константинович',
                birth:'17.02.1990',
                phone:'9255266765',
                ig:'ivanovvv',
                passS:'3611',
                passN:'291738',
                passD:'24.06.2011',
                passC:'630003'
                }
        }
    },
}
</script>