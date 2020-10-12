<template>
  <main class="main-content">
        <div class="step--1-outer">
            <!-- main header -->
            <header>
                <h1 class="page-header">Название товара</h1> 
                
                <el-tooltip effect="light" content="Товар опубликован" placement="bottom">
                    <el-tag type="success" effect="dark"> Опубликовано  <i class="el-icon-question"></i></el-tag>
                </el-tooltip>
            </header>
            <!-- auth form -->
            <div class="form-content step--1">
                <form action="">
                <ValidationObserver v-slot="{ invalid }" tag="form">
 
                <!-- uploading files -->
                    <ValidationProvider class="input" :rules="{ required: true }"
                    >
                        <label>Изображение для приложения <span>*</span> </label>
                        <FileUpload v-model="pngImg" :isMultiple="false" fileFormat=".png" @onfileupload="$event => pngImg = $event" />
                        
                    </ValidationProvider>

                    <ValidationProvider class="input" :rules="{ required: true }"
                    >
                        <label>Изображения для каталога товаров <span>*</span> </label>
                        <FileUpload v-model="images" :isMultiple="true" fileFormat=".jpeg, .jpg" @onfileupload="$event => images = $event" />

                    </ValidationProvider>
                <!-- end uploading files -->


                    <div class="form-group">
                        <div class="form-grop-blocks">
                            
                            <div class="form-group-block" >
                                <label for="item_name">Название <span>*</span> </label>
                                <ValidationProvider class="input" :rules="{ regex:/^.{1,100}$/, required: true }"
                                     v-slot="{classes}"
                                >
                                    <input
                                        placeholder="Название товара"
                                        v-model="form.name"
                                        id="item_name"
                                        :class="classes"
                                        type="text"
                                    >

                                </ValidationProvider>
                            </div>
                            <div class="form-group-block" >
                                <label for="item_subcat">Категория <span>*</span> </label>
                                 <v-select label="name" 
                                 :options="categoriesData" 
                                 v-model="currentCats.cat" 
                                 placeholder="Категория товара"></v-select>
                            </div>

                            <div class="form-group-block" >
                                <label for="item_subcat">Подкатегория <span>*</span> </label>
                                 <v-select label="name" :options="subCatList ? subCatList : []" 
                                 :disabled="!currentCats.cat"
                                 :resetOnOptionsChange="true"
                                 v-model="currentCats.subcat" placeholder="Подкатегория товара"></v-select>
                            </div>

                            <div class="form-group-block" 
                                v-for="(field, index) in productSpecs.data" :key="index"
                            >
                                <label >{{field.name}} <span v-if="field.is_required">*</span> </label>

                                
                            
                                 <ValidationProvider  :rules="{ required: field.is_required,
                                 min_value: field.validator.min ? +field.validator.min : false }"
                                     v-slot="{classes}"
                                >
                                    <v-select :options="field.validator.data" 
                                    v-if="field.validator.type == 'inclusion_validator'"
                                    :resetOnOptionsChange="true"
                                    v-model="form.attrs.data[field.name]" 
                                    :placeholder="field.name">
                                    </v-select>
                                    
                                    
                                    <input
                                         v-else
                                        :placeholder="field.name"
                                         v-model="form.attrs.data[field.name]"
                                        :class="classes"
                                        type="text"
                                    >

                                </ValidationProvider>
                            </div>
                            
                            <div class="form-group-block" >
                                <label for="item_price">Цена <span>*</span> </label>
                                <ValidationProvider class="input" :rules="{ min_value: 0.01, required: true, regex:/^\d+$/ }"
                                     v-slot="{classes}"
                                >
                                    <input
                                        placeholder="Цена товара"
                                        v-model="form.price"
                                        id="item_price"
                                        :class="classes"
                                        type="text"
                                    >

                                </ValidationProvider>
                            </div>
                            
                        </div>
                        
                        <div class="btn-group">
                            <button
                            :disabled="invalid"
                            @click.prevent="sendData"
                             class="btn btn-active">Сохранить</button>
                            
                            <button @click.prevent="$router.go(-1)" class="btn btn-light">Назад</button>
                            
                        </div>
                        
                    </div>
                 </ValidationObserver>
                </form>

            </div>
            <!-- end auth form -->
        </div>
        
    </main>
</template>

<script>
import FileUpload from './fileUpload'

export default {
    data() {
        return {
            images: [],
            pngImg: '',
            categoriesData: [],
            currentCats: {
                cat:null,
                subcat: null
            },
            form: {
                attrs:{
                    data: {}
                }
            },
            
        }
    },
    components: {
        FileUpload
    },
    mounted(){
        this.$http.get('/api/shops/product_categories')
            .then(
                res=>{
                    this.categoriesData = res.data;
                    console.log(this.categoriesData)
                }
            )
    },
    computed: {
        subCatList(){
            return this.currentCats.cat ? this.currentCats.cat.subcategories : [];
        },
        productSpecs(){
            return this.currentCats.subcat ? this.currentCats.subcat.product_specs : [];
        },
    },
    methods: {
        // uploadHandler(e){
        //     console.log(e)
        // },
        sendData(){
            let imgArray = this.images.map(item=>{
                return item.base.replace('data:image/jpeg;base64,','')
            })
            this.form.images = imgArray;
            console.log(imgArray)
            this.form.attrs.specs_name = this.productSpecs.name
            this.$http.post('/api/shops/products', this.form)
                .then(
                    res=>{
                        this.$notify({
                            'title': 'Готово',
                            'message': 'Товар добавлен в Ваш список товаров',
                            type: 'success'
                        })
                    }
                )
        }

    }
    
}
</script>