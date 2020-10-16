<template>
    <transition name="fade" mode="out-in">
        <main class="main-content" >
            <div class="quiz-welcome-outer">
                 <!-- main header -->
                <header>
                    <h1 class="page-header desktop-only">Добро пожаловать!</h1>
                </header>
                <!-- auth form -->
                <div class="form-content quiz-welcome">
                    <h3 class="form-subheader">Регистрация прошла успешно.</h3>
                    <div class="quiz-welcome-text">
                        <p>Теперь вы можете активировать ваш профиль по ссылке, отправленной на указанный вами электронный адрес</p>
                    </div>
                    <div class="btn-group">
                        <router-link :to="'auth'" class="page-link">

                            <button class="btn btn-active add-cli">Войти</button>
                        </router-link>
                        
                    </div>
                </div>
                <!-- end auth form -->
            </div>
           
        </main>
    </transition>
</template>

<script>
export default {

}
</script>