<template>
  <main class="main-content" >
            <!-- main header -->
            <header>
                <h1 class="page-header">Авторизация</h1>
            </header>
            <!-- auth form -->
            <div class="form-content auth-form">
                <h3 class="form-subheader">Войдите <span>в свой кабинет</span></h3>
                <form action="">
                    <div class="form-group">
                        <div class="form-grop-blocks">
                            <div class="form-group-block">
                                <label for="auth_login">Логин</label>
                                <input type="text" name="auth_login" placeholder="Введите логин">
                            </div>
                            <div class="form-group-block">
                                <label for="auth_pass">Пароль</label>
                                <input type="text" name="auth_pass" placeholder="Введите пароль">
                            </div>
                        </div>
                        <router-link :to="'welcome'">
                            
                            <button class="btn btn-active"
                            >Войти</button>
                        </router-link>
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