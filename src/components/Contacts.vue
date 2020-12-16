<template>
    <transition name="fade" mode="out-in">
        <main class="main-content" >
            <div class="quiz-welcome-outer">
                 <!-- main header -->
                <header>
                    <h1 class="page-header">Контакты</h1>
                </header>
                <!-- auth form -->
                <div class="form-content quiz-welcome policy">
                    <div class="policy-paragraph">
                        <h3>Контакты:</h3>
                        Тел: <a href="tel:+79219181066">+79219181066</a>
                        Email: <a href="mailto:info@mydizi.design">info@mydizi.design</a>
                    </div>
                    
                    <div class="policy-paragraph">
                        <h3>Реквизиты:</h3>
                        ИП Игольникова Ляля Назифовна
                        ИНН 781418473741
                        Р/С (₽) 40802810508500024055
                        Банк получателя
                        ТОЧКА ПАО БАНКА "ФК ОТКРЫТИЕ"
                        БИК 044525999
                        К/С 30101810845250000999
                    </div>
                </div>
                <!-- end auth form -->
            </div>
           
        </main>
    </transition>
</template>

<script>
export default {
    data(){
        return {
        }
    }
}
</script>