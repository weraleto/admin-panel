<template>
    <main class="main-content" >
            <div class="quiz-finish-outer">
                 <!-- main header -->
                <header>
                    <h1 class="page-header">Клиент добавлен</h1>
                </header>
                <!-- auth form -->
                <div class="form-content quiz-finish">
                    <h3 class="form-subheader">Вот и все!</h3>
                    <div class="quiz-finish-text">
                        <p>Спасибо за ваше время и предоставленные данные. Теперь вы можете приступить к процедурам.</p>
                    </div>
                    <div class="btn-group">
                        <button
                            @click="$emit('onplus')"
                         class="btn btn-active add-cli">Добавить клиента</button>
                        <router-link :to="{name:'client-base'}">
                            <button class="btn btn-light">Поиск по базе</button>
                        </router-link>
                    </div>
                    <router-link :to="{name:'home'}">
                        <button class="btn btn-light">На главную</button>
                    </router-link>
                </div>
                <!-- end auth form -->
                <div class="remark">
                    <div class="remark-inner">* Вся предоставленная информация конфиденциальна <span>и не будет передана третьим лицам.</span></div>
                </div>
            </div>
           
        </main>
</template>

<script>
export default {
    
}
</script>