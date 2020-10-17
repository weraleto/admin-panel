<template>
    <div>

    <transition name="fade" mode="out-in" >
            <!-- v-if="!showInfo" -->
        <main
            key="base"
        class="main-content table-content">
                <div class="client-base-list">
                    <!-- main header -->
                    <header class="client-base-header">
                        <h1 class="page-header">
                            Список товаров
                        </h1>
                    </header>
                    
                    <div class="client-base-search">
                        <input type="text" v-model="searchIn" placeholder="Поиск">
                    </div>
                    <div class="client-base-filtration">
                        <div class="btn-group">
                            <button class="client-base-filtration-link btn"
                            :class="item.name===filtrationName?'btn-active':'btn-light'"
                            @click="filtrationName=item.name; getCatalog()"
                            v-for="(item, index) in filtrationCategories" :key="index"
                            >{{item.label}}</button>
                        </div>
                        
                    </div>
                    <div class="client-base-table">
                        <table>
                            <thead>
                                <tr>
                                    <th class="client-base-table-cell cli-number">
                                        
                                    </th>
                                    <th class="client-base-table-cell cli-fio">Фото</th>
                                    <th class="client-base-table-cell cli-birth">
                                        Название
                                            
                                    </th>
                                    <th class="client-base-table-cell cli-phone">
                                        Статус публикации
                                    </th>
                                    <th class="client-base-table-cell cli-date">Срок публикации</th>
                                    <th class="client-base-table-cell aside"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(item, index) in itemsData.products" :key="index"
                                    
                                    
                                >
                                    <td class="client-base-table-cell cli-number">
                                        <template v-if="item.state.type==='approved'">
                                            <input type="checkbox" v-model="itemsForConfirm[item.id]" :name="`base-${index}`" :id="`base-${index}`" >
                                            <label class="label-checkbox" :for="`base-${index}`"
                                            >                                               
                                            </label>
                                        </template>
                                    </td>
                                    <td class="client-base-table-cell cli-fio" @click="showItemCard(item.id); $store.state.currItemId = item.id"><div>
                                        <img :src="`https://dizi.foresco.site/api/shops/products/editor_images/${item.editor_image_id}`" :alt="item.name" >
                                    </div></td>
                                    <td class="client-base-table-cell cli-birth">{{item.name}}</td>
                                    <td class="client-base-table-cell cli-phone">{{statuses[item.state.type]}}</td>
                                    <td class="client-base-table-cell cli-date">{{item.state.type === 'placed' ? '' : '-'}}</td>
                                    <td class="client-base-table-cell aside"> </td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="client-base-table-mobile mobile-only">
                            <div class="client-base-table-item" 
                                v-for="(item, index) in itemsData.products" :key="index"
                                
                            >
                                <div class="client-base-table-num">
                                    <template v-if="item.state.type==='approved'">
                                            <input type="checkbox" :name="`base-${index}`" :id="`base-${index}`" >
                                            <label class="label-checkbox" :for="`base-${index}`">                                               
                                            </label>
                                        </template>
                                </div>
                                <div class="client-base-table-el" @click="showItemCard(item.id); $store.state.currItemId = item.id">
                                    <div class="client-base-table-label">Фото</div>
                                    <img :src="`https://dizi.foresco.site/api/shops/products/editor_images/${item.editor_image_id}`" :alt="item.name" >
                                </div>
                                <div class="client-base-table-el">
                                    <div class="client-base-table-label">Название</div>
                                    <div class="client-base-table-content">{{item.name}}</div>
                                </div>
                                <div class="client-base-table-el">
                                    <div class="client-base-table-label">Статус публикации</div>
                                    <div class="client-base-table-content">{{statuses[item.state.type]}}</div>
                                </div>
                                <div class="client-base-table-el">
                                    <div class="client-base-table-label">Срок публикации</div>
                                    <div class="client-base-table-content">{{item.state.type === 'placed' ? '' : '-'}}</div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="client-base-pagination">
                        <pagination :current="currentPage" :total="totalPages" :per-page="(+sortNum)" @page-changed="changePageNum($event)" ></pagination>
                        
                        <div class="client-base-pagination-sort">
                            <div class="label">
                                Показать по:
                            </div>
                            <div class="sort-type" @click="sortType()" @blur="sortType()">
                                <div class="num">{{sortNum}}</div>
                                <div class="sort-type-optgroup hide">
                                    <div class="sort-type-option">10</div>
                                    <div class="sort-type-option">25</div>
                                    <div class="sort-type-option">50</div>
                                    <div class="sort-type-option">100</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="client-base-navigation">
                        <div class="btn-group">
                            <router-link :to="{name:'add'}" class="client-base-navigation-link page-link">
                                <button class="btn btn-active">Добавить товар</button>
                            </router-link>
            
                            <el-tooltip effect="light" content="У вас нет подтвержденных товаров" :disabled="!itemsForConfirm" placement="bottom">
                            <router-link :to="''" class="client-base-navigation-link page-link">
                                <button :disabled="itemsForConfirm ? Object.keys(itemsForConfirm).length  < 1 : true" @click.prevent="publishItems" class="btn btn-active">Опубликовать товары</button>
                            </router-link>
                            </el-tooltip>
                            <!-- <button class="btn btn-light client-base-navigation-link page-link">Экспорт базы</button> -->
                        </div>
                        <!-- <div class="remark">
                            * Вся предоставленная информация конфиденциальна и не будет передана третьим лицам.
                        </div> -->
                    </div>
                </div>
            
            </main>
        <!-- <cli-info v-else 
            @closedata="showInfo=!showInfo"
            key="info"
        ></cli-info> -->
    </transition>
    </div>
    
</template>

<script>
import CliInfo from './CliInfo'
import Pagination from './Pagination'
export default {
    components:{
        CliInfo,
        Pagination
    },
    data() {
        return {
            showInfo:false,
            searchIn:'',
            currentPage:1,
            sortNum:10,
            totalPages: 1,
            moveRight:[],
            filtrationName: 'draft',
            filtrationCategories: [
                {label:'Опубликованные товары', name: 'placed'},
                {label:'Товары на модерации', name: 'under_review'},
                {label:'Черновики', name: 'draft'},
            ],
            itemsData: [],
            statuses: {
                'published':'Опубликован',
                'under_review':'На модерации',
                'draft':'Черновик',
            },
            itemsForConfirm: {}
        }
    },
    mounted(){
        this.getCatalog()
    },
    methods: {
        sortType(){
            var optgroup=event.target.closest('.sort-type').querySelector('.sort-type-optgroup');
            optgroup.classList.toggle('hide')
            optgroup.classList.toggle('show')
            if(event.target==event.target.closest('.sort-type-option')){
                this.getCatalog()
                this.sortNum=event.target.closest('.sort-type-option').textContent;
            }
        },
        changePageNum(num){
            this.currentPage=num;
        },
        showItemCard(id){
            this.showInfo = true;
            this.$router.push(`/item/${id}`)
        },
        getCatalog(){
            this.$http.get(`/api/shops/products?page=${this.currentPage}&limit=${this.sortNum}&filter=${this.filtrationName}`)
            .then(
                res=>{
                    this.itemsData = res.data;
                    this.totalPages = res.data.total_pages
                }
            )
        },
        publishItems(){
            let ids = [];
            
            for (let key in this.itemsForConfirm) {
                if(this.itemsForConfirm[key]==true){
                    ids.push(key)
                }
            }
            this.$http.post('/api/shops/products/place', ids)
                .then(
                    res=>{
                        this.$notify({
                            type: 'success',
                            title: 'Товары размещены'
                        })
                    }
                )
        }
        
    },
    computed: {
        searchFilter(){
            if(this.searchIn!=''){
                return this.cliList.filter(item => item.date.toLowerCase().indexOf(this.searchIn.toLowerCase()) !== -1)
            }else{
                return this.cliList
            }
        },
        paginatedData(){
            var start=(+this.sortNum)*(this.currentPage-1),
                end=start+(+this.sortNum);
            return this.searchFilter.slice(start,end);
        }
    },
    watch: {
        currentPage(){
            this.getCatalog()
        }
    }
    
}

</script>