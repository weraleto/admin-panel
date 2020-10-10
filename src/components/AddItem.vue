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
                <ValidationObserver v-slot="{ invalid }" tag="form">
 
 
                <ValidationProvider class="input" :rules="{ required: true }"
                >
                    <!-- uploading files -->
                    <FileUpload v-model="images" @onfileupload="$event => images = $event" />
                    <!-- end uploading files -->

                </ValidationProvider>
                


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
                                 min_value: field.validators[0].min ? +field.validators[0].min : false }"
                                     v-slot="{classes}"
                                >
                                    <v-select :options="field.validators[0].data" 
                                    v-if="field.validators[0].type == 'inclusion_validator'"
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
        FileUpload
    },
    mounted(){
        this.$http.get('/api/shops/product_categories')
            .then(
                res=>{
                    this.categoriesData = res.data;
                    
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
                return item.base
            })
            this.form.images = imgArray;
            this.form.attrs.specs_name = this.productSpecs.type
            this.$http.post('/api/shops/products', this.form)
                .then(
                    res=>{
                        console.log(res)
                    }
                )
        }

    }
    
}
</script>