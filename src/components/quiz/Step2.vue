<template>
    <main class="main-content" >
            <div class="step--2-outer">
                <!-- main header -->
                <header>
                    <h1 class="page-header">2. Согласие на обработку персональных данных</h1>
                </header>
                <!-- auth form -->
                <div class="form-content step--2">
                    <form action="">
                        <div class="form-group">
                            <div class="form-group-section-outer">
                                <h3 class="form-subheader">Введите адрес прописки</h3>
                                <div class="form-group-section">
                                    <div class="form-group-block">
                                        <label for="step-2_sity">Город</label>
                                        <div class="input-required">
                                            <input class="required" type="text" name="step-2_sity" placeholder="Введите город">
                                            <div class="pseudo-mark">*</div>
                                        </div>
                                    </div>
                                    <div class="form-group-block">
                                        <label for="step-2_str">Строение</label>
                                        <input class="required" type="text" name="step-2_str" placeholder="Введите номер строения">
                                            
                                    </div>
                                    <div class="form-group-block">
                                        <label for="step-2_street">Улица</label>
                                        <div class="input-required">
                                            <input class="required" type="text" name="step-2_street" placeholder="Введите улицу">
                                            <div class="pseudo-mark">*</div>
                                        </div>
                                    </div>
                                    <div class="form-group-block">
                                        <label for="step-2_apt">Квартира</label>
                                        <div class="input-required">
                                            <input class="required" type="text" name="step-2_apt" placeholder="Введите номер квартиры">
                                            <div class="pseudo-mark">*</div>
                                        </div>
                                    </div>
                                    <div class="form-group-block">
                                        <label for="step-2_build">Дом</label>
                                        <div class="input-required">
                                            <input class="required" type="text" name="step-2_build" placeholder="Введите дом">
                                            <div class="pseudo-mark">*</div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <div class="form-group-section-outer">
                                <h3 class="form-subheader">Введите паспортные данные</h3>
                                <div class="form-group-section">
                                    <div class="form-group-block">
                                        <label for="step-2_sity">Серия</label>
                                        <div class="input-required">
                                            <masked-input type="text" name="step-2_sity" mask="1111" placeholder="Введите серию" />
                                            <!-- <input class="required" type="text" name="step-2_sity" placeholder="Введите серию"> -->
                                            <div class="pseudo-mark">*</div>
                                        </div>
                                    </div>
                                    <div class="form-group-block">
                                        <label for="step-2_str">Кем выдан</label>
                                        <div class="input-required">
                                            <input class="required" type="text" name="step-2_street" placeholder="Наименование органа">
                                            <div class="pseudo-mark">*</div>
                                        </div>
                                            
                                    </div>
                                    <div class="form-group-block">
                                        <label for="step-2_num">Номер</label>
                                        <div class="input-required">
                                            <masked-input type="text" name="step-2_num" mask="111 111" placeholder="Введите номер" />
                                            <!-- <input class="required" type="text" name="step-2_street" placeholder="Введите номер"> -->
                                            <div class="pseudo-mark">*</div>
                                        </div>
                                    </div>
                                    <div class="form-group-block">
                                        <label for="step-2_apt">Дата выдачи</label>
                                        <div class="input-required">
                                            <masked-input type="text" name="step-2_apt" mask="11.11.1111" placeholder="__.__.____г." />
                                            <!-- <input class="required" type="text" name="step-2_apt" placeholder="__ . __ . ____ г."> -->
                                            <div class="pseudo-mark">*</div>
                                        </div>
                                    </div>
                                    <div class="form-group-block">
                                        <label for="step-2_code">Код подразделения</label>
                                        <div class="input-required">
                                            <masked-input type="text" name="step-2_code" mask="111-111" placeholder="___ - ___" />
                                            <!-- <input class="required" type="text" name="step-2_build" placeholder="___ - ___"> -->
                                            <div class="pseudo-mark">*</div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            
                            <div class="btn-group">
                                <button
                                    @click="$emit('onplus')"
                                 class="btn btn-active">Продолжить</button>
                                <button
                                    @click="$emit('onminus')"
                                 class="btn btn-light">Назад</button>
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
}
</script>