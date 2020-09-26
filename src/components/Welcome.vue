<template>
    <transition name="fade" mode="out-in">
        <main class="main-content" >
            <div class="quiz-welcome-outer">
                 <!-- main header -->
                <header>
                    <h1 class="page-header desktop-only">Анкета клиента</h1>
                </header>
                <!-- auth form -->
                <div class="form-content quiz-welcome">
                    <h3 class="form-subheader">Добро пожаловать!</h3>
                    <div class="quiz-welcome-text">
                        <p>Перед началом процедуры предлагаем заполнить небольшую анкету.</p>
                        <p>Мы сделали ее в электронном виде, чтобы она заполнялась максимально быстро и удобно для вас.</p>
                    </div>
                    <div class="btn-group">
                        <router-link :to="'quiz'" class="page-link">

                            <button class="btn btn-active add-cli">Добавить клиента</button>
                        </router-link>
                        <router-link :to="'base'" class="page-link">
                            <button class="btn btn-light">Поиск по базе</button>
                        </router-link>
                    </div>
                </div>
                <!-- end auth form -->
                <div class="remark">
                    * Вся предоставленная информация конфиденциальна и не будет передана третьим лицам.
                </div>
            </div>
           
        </main>
    </transition>
</template>

<script>
export default {

}
</script>