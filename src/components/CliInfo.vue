<template>
  <main class="main-content">
        <div class="step--1-outer">
            <!-- main header -->
            <header>
                <h1 class="page-header">{{form.name}}</h1> 
                
                <template v-if="productStatus == 'disapproved'">
                    <el-tooltip effect="light" :content="form.state.reason"  placement="bottom">
                        <el-tag effect="dark" v-if="productStatus"  :type="statuses[productStatus].t" > {{statuses[productStatus].name}}  
                                <i class="el-icon-question"></i>
                        </el-tag>
                    </el-tooltip>
                </template>
                <template v-else>
                    <el-tag effect="dark" v-if="productStatus"  :type="statuses[productStatus].t" > {{statuses[productStatus].name}}  
                    </el-tag>
                </template>
            </header>
            <!-- auth form -->
            <div class="form-content step--1">
                <form action="">
                <ValidationObserver v-slot="{ invalid }" tag="form">



                    <div class="form-group">
                        <div class="btn-group">
                            <button v-if="productStatus === 'placed'"
                            @click.prevent="stopProduct"
                             class="btn btn-active">Приостановить размещение</button>

                            <button v-if="productStatus === 'approved'||productStatus=== 'placement_paused'"
                            @click.prevent="publishItem"
                             class="btn btn-active">Опубликовать</button>

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
                                v-model="currentCats.cat"
                                 placeholder="Категория товара"></v-select>
                            </div>

                            <div class="form-group-block" >
                                <label for="item_subcat">Подкатегория <span>*</span> </label>
                                 <v-select label="name" :options="subCatList ? subCatList : []" 
                                 :resetOnOptionsChange="true"
                                  v-model="currentCats.subcat"
                                 placeholder="Подкатегория товара"></v-select>
                            </div>

                            <div class="form-group-block" 
                                v-for="(field, index) in productSpecs.data ? productSpecs.data : []" :key="index"
                            >
                                <label >{{isMetric(field.name)}}  </label>

                                
                            
                                 <ValidationProvider  :rules="{
                                 min_value: field.type == 'decimal_spec' ? +field.validation_opts.min : false }"
                                     v-slot="{classes}"
                                >
                                    <v-select :options="field.allowed_values" 
                                    v-if="field.type == 'default_spec'"
                                    :resetOnOptionsChange="true"
                                    v-model="form.attrs.data[field.name]" 
                                    :placeholder="field.name">
                                    </v-select>

                                    <el-color-picker
                                    v-model="form.attrs.data[field.name]" 
                                    v-else-if="field.type == 'color_spec'"
                                    color-format="hex"
                                    :class="classes"
                                    :predefine="field.allowed_values">
                                    </el-color-picker>
                                    
                                    
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
                                <label for="item_url">Ссылка на товар  </label>
                                <ValidationProvider class="input" :rules="{  regex:/^.{1,}$/ }"
                                     v-slot="{classes}"
                                >
                                    <input
                                        placeholder="Ссылка на товар"
                                        v-model="form.url"
                                        id="item_url"
                                        :class="classes"
                                        type="text"
                                    >

                                </ValidationProvider>
                            </div>
                            <div class="form-group-block" >
                                    <ValidationProvider class="input" :rules="{ required: true }"
                                >
                                    <label>Изображения для каталога товаров <span>*</span> </label>
                                    <FileUpload v-model="images" :makeChanges="makeChanges2" :imgs="images" :isMultiple="true" fileFormat=".jpeg, .jpg, .png" @onfileupload="$event => images = $event" @filechange="makeChanges2=true" />

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
                cat: null,
                product_specs:null,
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
                }
            )
            .then(()=>{
                return this.getProduct()
            }

            )
    },
    computed: {
        subCatList(){
            return this.currentCats.cat ? this.currentCats.cat.subcategories : [];
        },
        productSpecs(){
            let a = this.currentCats.subcat ? this.currentCats.subcat[0] ? this.currentCats.subcat[0].product_specs : this.currentCats.subcat.product_specs : [];

            return a
        },
        productId: {
            get: function(){
                return this.$store.state.currItemId
            },
            set: function(val){
                this.$store.state.currItemId = val
            }
        },
        statuses(){
            return this.$store.state.productStatuses
        },
        productStatus(){
            return this.form.state ? this.form.state.type : '';
        }
    },
    methods: {
        isMetric(it){
            return ['Длина', 'Ширина', 'Высота', 'Глубина'].includes(it)  ? it += ' (мм)' : it
        },
        filterCats(arr, filter_name){
            return arr.filter(it=>{
                        return it.name === filter_name
                    })
        },
        getProduct(){

            this.$http.get(`/api/shops/products/${this.productId}/for_edit`)
            .then(
                res=>{
                    this.form = res.data
                    this.pngImg = `/api/shops/products/editor_images/${res.data.editor_image_id}`
                    this.images = res.data.catalog_image_ids.map(it=>{
                        return `/api/shops/products/catalog_images/${it}`
                    })

                    this.currentCats.cat = this.filterCats(this.categoriesData, res.data.category_name)[0]
                    this.currentCats.product_specs = res.data.specs_data
                    
                    return res
                }
            )
            .then(res=>{
                this.currentCats.subcat = this.filterCats(this.currentCats.cat.subcategories, res.data.subcategory_name)
            })
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
        replaceBase(item, format){
          return item.replace(`data:image/${format};base64,`,''); 
        },
        sendData(){
            let rJPG = new RegExp('data:image/jpeg;base64,')
            let rPNG = new RegExp('data:image/png;base64,')
            let imgArray = this.makeChanges2 ? 
                this.images.map(item=>{
                    
                    let data = {}
                    if (rJPG.test(item.base) ) {
                       data.data =  this.replaceBase(item.base, 'jpeg')
                       data.type = 'new'
                    }else if (rPNG.test(item.base) ) {
                       data.data =  this.replaceBase(item.base, 'png')
                       data.type = 'new'
                    
                    }else{
                        let idArr = item.base.split('/')
                        data.id = idArr[idArr.length-1]
                        data.type = 'existing'
                    }
                    return data

                }) : 
                this.form.catalog_image_ids.map(item=>{
                    return {id: item, type: 'existing'}
                })

                this.form.attrs.data['Цвет'] = this.form.attrs.data['Цвет'] ? this.form.attrs.data['Цвет'].toLowerCase() : null


           
    
            this.$http.post(`/api/shops/products/${this.productId}/edit`, {
                attrs: this.form.attrs,
                catalog_images: imgArray,
                editor_image: rPNG.test(this.pngImg) ? this.pngImg.replace('data:image/png;base64,','') : null,
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