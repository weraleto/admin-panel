<template>
  <main class="main-content">
        <div class="step--1-outer">
            <!-- main header -->
            <header>
                <h1 class="page-header">{{form.name}}</h1> 
                
                <!-- <el-tooltip effect="light" content="Товар опубликован" placement="bottom"> -->
                    <el-tag effect="dark" v-if="productStatus"  :type="statuses[productStatus].t" > {{statuses[productStatus].name}}  
                        <!-- <i class="el-icon-question"></i> -->
                    </el-tag>
                <!-- </el-tooltip> -->
            </header>
            <!-- auth form -->
            <div class="form-content step--1">
                <form action="">
                <ValidationObserver v-slot="{ invalid }" tag="form">



                    <div class="form-group">
                        <div class="btn-group">
                            <button v-if="productStatus === 'published'"
                            @click.prevent="stopProduct"
                             class="btn btn-active">Приостановить размещение</button>

                            <button v-if="productStatus === 'approved'"
                            @click.prevent="stopProduct"
                             class="btn btn-active">Приостановить размещение</button>

                            <button v-if="productStatus === 'draft'"
                            @click.prevent="sendProduct"
                             class="btn btn-active">Отправить на проверку</button>

                            <button
                            @click.prevent="deleteProduct"
                             class="btn btn-active">Удалить товар</button>
                            
                        </div>

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
                                <ValidationProvider class="input" :rules="{ required: true }"
                                >
                                    <label>Изображение для приложения <span>*</span> </label>
                                    <FileUpload v-model="pngImg" :makeChanges="makeChanges1" :imgs="[pngImg]" :isMultiple="false" fileFormat=".png" @onfileupload="$event => pngImg = $event" @filechange="makeChanges1=true" />
                                    
                                </ValidationProvider>
                            </div>
                            <div class="form-group-block" >
                                <label for="item_subcat">Категория <span>*</span> </label>
                                 <v-select label="name" 
                                 :options="categoriesData" 
                                 disabled
                                 :value="form.category_name"
                                 placeholder="Категория товара"></v-select>
                            </div>

                            <div class="form-group-block" >
                                <label for="item_subcat">Подкатегория <span>*</span> </label>
                                 <v-select label="name" :options="subCatList ? subCatList : []" 
                                 disabled
                                 :value="form.subcategory_name"
                                 placeholder="Подкатегория товара"></v-select>
                            </div>

                            <div class="form-group-block" 
                                v-for="(field, index) in form.specs" :key="index"
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
                            <div class="form-group-block" >
                                    <ValidationProvider class="input" :rules="{ required: true }"
                                >
                                    <label>Изображения для каталога товаров <span>*</span> </label>
                                    <FileUpload v-model="images" :makeChanges="makeChanges2" :imgs="images" :isMultiple="true" fileFormat=".jpeg, .jpg" @onfileupload="$event => images = $event" @filechange="makeChanges2=true" />

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
            makeChanges1: false,
            makeChanges2: false,
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
        
        this.getProduct()

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
        productId(){
            return this.$store.state.currItemId
        },
        statuses(){
            return this.$store.state.productStatuses
        },
        productStatus(){
            return this.form.state ? this.form.state.type : '';
        }
    },
    methods: {
        async getProduct(){
            await this.$http.get(`/api/shops/products/${this.productId}/for_edit`)
            .then(
                res=>{
                    this.form = res.data
                    this.pngImg = `https://dizi.foresco.site/api/shops/products/editor_images/${res.data.editor_image_id}`
                    this.images = res.data.catalog_images_ids.map(it=>{
                        return `https://dizi.foresco.site/api/shops/products/catalog_images/${it}`
                    })
                    this.imagesCataTms = res.data.catalog_images_ids
                    this.pngtmp = res.data.editor_image_id
                }
            )
        },
        stopProduct(){
            this.$http.post(`/api/shops/products/${this.productId}/pause_placement`)
                .then(
                    res=>{
                        this.$notify({
                           'title': 'Готово',
                            'message': 'Размещение товара приостановлено',
                            type: 'success' 
                        })
                    }
                )
                .then(
                    res=>{
                        this.getProduct()
                    }
                )
        },
        sendProduct(){
            this.$http.post(`/api/shops/products/${this.productId}/send_to_review`)
                .then(
                    res=>{
                        this.$notify({
                           'title': 'Готово',
                            'message': 'Товар отправлен на проверку',
                            type: 'success' 
                        })
                    }
                )
                .then(
                    res=>{
                        this.getProduct()
                    }
                )
        },
        deleteProduct(){
            this.$http.delete(`/api/shops/products/${this.productId}`)
                .then(
                    res=>{
                        this.$notify({
                           'title': 'Готово',
                            'message': 'Товар удален',
                            type: 'success' 
                        })
                        this.$router.push('/base')
                    }
                )
        },
        sendData(){
            let imgArray = this.makeChanges2 ? 
                this.images.map(item=>{
                    return {data: item.base.replace('data:image/jpeg;base64,',''), type: 'new'}
                }) : 
                this.form.catalog_images_ids.map(item=>{
                    return {id: item, type: 'existing'}
                })
                
            this.$http.post(`/api/shops/products/${this.productId}/edit`, {
                attrs: this.form.attrs,
                catalog_images: imgArray,
                editor_image: this.makeChanges1 ? this.pngImg.replace('data:image/jpeg;base64,','') : null,
                name: this.form.name,
                price: this.form.price
            })
                .then(
                    res=>{
                        this.$notify({
                            'title': 'Готово',
                            'message': 'Товар отредактирован',
                            type: 'success'
                        })
                        this.getProduct()
                    }
                )
        },
        publishItem(){
            this.$http.post('/api/shops/products/place', [this.productId])
                .then(
                    res=>{
                        this.$notify({
                            type: 'success',
                            title: 'Товар опубликован'
                        })
                    }
                )
        }

    }
    
}
</script>