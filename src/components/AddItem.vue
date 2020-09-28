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
                    <div class="upload-file__wrapper ">
                        <draggable v-model="images" class="upload-file__wrapper">


                            <div class="upload-file__item bg-white" v-for="(item, index) in images" :key="index">
                                <div class="upload-file__del-icon" @click="deleteImage(item,index)">
                                    <img :src="require('../../public/svg/times-circle-solid.svg')" alt="Удалить изображение">
                                </div>
                                <!-- {{item.baseData}} -->
                                <img class="upload-file__uploaded" :src="item.base" alt="Изображение">
                                <!-- <div class="upload_icon__wrapper" v-if="image.length<1" @click="initFileUpload">
                                    <img  
                                        class="upload_icon" 
                                        src="../../public/svg/plus-circle-solid.svg" alt="">
                                </div> -->
                            </div>
                        </draggable>
                        
                        <div class="upload-file__item bg-white"  v-if="images.length<=4" @click="initFileUpload">
                            <!-- <img class="upload-file__uploaded" :src="item.baseData" alt=""> -->
                            <div class="upload_icon__wrapper">
                                <img  
                                    class="upload_icon" 
                                    src="../../public/svg/plus-circle-solid.svg" alt="">
                            </div>
                        </div>

                    </div>

                    <div class="upload-file__actions">

                        <input ref="inputField" style="display:none" type="file" accept=".png" @change="handleImage" multiple>
                        <button @click.prevent="initFileUpload" class="btn btn-active btn-upload">Загрузить изображения ( {{ this.images.length }} / 5 )</button>
                        <div class="remark">
                            * Максимальный размер фото - 500 kb. Формат .png
                        </div>
                    </div>

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
import draggable from 'vuedraggable'
export default {
    data() {
        return {
            maxFileSize: 500000,
            image: '',
            images: [],
            files: [],
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
        MaskedInput,
        draggable
    },
    methods: {
        // handleImage(e){
        //     const selectedImage = e.target.files[0];
        //     this.createBaseImage(selectedImage);
            
        // },
        createBaseImage(fileObj, i){
            
            const reader = new FileReader();
            reader.onload = (e) => {
                this.images.push({ base: e.target.result, el: i});
                
            }
            reader.readAsDataURL(fileObj);
            
        },
        handleImage(e){
            let uploadedFiles = this.$refs.inputField.files;

            Object.keys(uploadedFiles).forEach(el=>{

                if(+el < 5 && uploadedFiles[el].size <= this.maxFileSize ) {

                    this.files.push(uploadedFiles[el])
                    this.createBaseImage(uploadedFiles[el], el)
                }
            })
            
        },
        initFileUpload(){
            this.$refs.inputField.click()
        },
        deleteImage(image, i) {
            console.log(this.files)
            this.images.splice(i,1);
            delete this.files[image.el]
            console.log(this.files)


        }
    }
}
</script>