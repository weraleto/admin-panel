<template>
  <main class="main-content">
        <div class="step--1-outer">
            <!-- main header -->
            <header>
                <h1 class="page-header">Добавить товар</h1>
            </header>
            <!-- auth form -->
            <div class="form-content step--1">
                <form action="">
                    <div class="form-group">
                        <div class="form-grop-blocks">
                            
                            <div class="form-group-block" v-for="(item, index) in fields" :key="index">
                                <masked-input
                                    :isRequired="item.isRequired"
                                    :label="item.label"
                                    :name="item.name"
                                    :type="item.type"
                                    :placeholder="item.placeholder"
                                ></masked-input>
                                
                            </div>
                            <!-- <div class="form-group-block agreement">
                                <input type="checkbox" name="step-1_agree" id="step-1_agree">
                                <label class="label-checkbox" for="step-1_agree">
                                    Я согласен(на) с условиями <span>договора на оказание услуг.</span>
                                </label>
                            </div> -->
                        </div>
                        
                        <div class="btn-group">
                            <button
                             class="btn btn-active">Сохранить</button>
                            <!-- <router-link :to="{name:'home'}">
                                <button class="btn btn-light">Назад</button>
                            </router-link> -->
                        </div>
                        <!-- <div class="remark">
                            * Вся предоставленная информация конфиденциальна <span>и не будет передана третьим лицам.</span>
                        </div> -->
                    </div>
                </form>
            </div>
            <!-- end auth form -->
        </div>
        
    </main>
</template>

<script>
import MaskedInput from './MaskedInput'
export default {
    data() {
        return {
            
            fields:[
                {
                    isRequired:true,
                    label:"Название",
                    name:"item_name",
                    placeholder:"Название товара",
                },
                {
                    isRequired:true,
                    label:"Категория",
                    name:"item_cat",
                    placeholder:"Категория товара",
                    type: 'select'
                },
                {
                    isRequired:true,
                    label:"Подкатегория",
                    name:"item_subcat",
                    placeholder:"Подкатегория товара",
                    type: 'select'
                },
                {
                    isRequired:false,
                    label:"Тип",
                    name:"item_type",
                    placeholder:"Тип товара",
                    type: 'select'
                },
                {
                    isRequired:false,
                    label:"Бренд",
                    name:"item_brand",
                    placeholder:"Бренд товара",
                },
                {
                    isRequired:false,
                    label:"Цвет",
                    name:"item_color",
                    placeholder:"Цвет товара",
                },
                {
                    isRequired:false,
                    label:"Размер",
                    name:"item_size",
                    placeholder:"Размер товара",
                },
                {
                    isRequired:false,
                    label:"Цена",
                    name:"item_price",
                    placeholder:"Цена товара",
                },
                {
                    isRequired:false,
                    label:"Ссылка",
                    name:"item_link",
                    placeholder:"Ссылка на товар",
                },
            ]
        }
    },
    components: {
        MaskedInput
    },
    computed: {
        
    }
}
</script>