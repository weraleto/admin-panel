<template>
    <transition name="fade" mode="out-in">
        <main class="main-content" >
            <div class="quiz-welcome-outer">
                 <!-- main header -->
                <header>
                    <h1 class="page-header desktop-only">Готово!</h1>
                </header>
                <!-- auth form -->
                <div class="form-content quiz-welcome">
                    <h3 class="form-subheader">{{subheaders[$route.name]}}</h3>
                    <div class="quiz-welcome-text">
                        <p>{{message[$route.name]}}</p>
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
    data(){
        return {
            subheaders: {
                email: 'Email успешно подтвержден.',
                welcome: 'Регистрация прошла успешно.'
            },
            message: {
                email: 'Теперь вы можете войти в свой аккаунт',
                welcome: 'Теперь вы можете активировать ваш профиль по ссылке, отправленной на указанный вами электронный адрес'
            },
        }
    }
}
</script>