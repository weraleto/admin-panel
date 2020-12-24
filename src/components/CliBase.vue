<template>
    <div>

    <transition name="fade" mode="out-in" >

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
                            @click="changeTab(item.name)"
                            v-for="(item, index) in filtrationCategories" :key="index"
                            >{{item.label}}</button>
                        </div>
                        
                    </div>
                    <div class="client-base-table">
                        <table>
                            <thead ref="thead">
                                <tr>
                                    <th class="client-base-table-cell cli-number" v-if="filtrationName!=='draft'">
                                        
                                    </th>
                                    <th class="client-base-table-cell cli-fio">Фото</th>
                                    <th class="client-base-table-cell cli-birth">
                                        Название
                                            
                                    </th>
                                    <th class="client-base-table-cell cli-phone">
                                        Статус публикации
                                    </th>
                                    <th class="client-base-table-cell cli-date">Срок публикации / Оставшееся время</th>
                                    <th class="client-base-table-cell aside">
                                        
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-if="itemsData.products">
                                    <tr
                                        v-for="(item, index) in itemsData.products" :key="index"
                                        
                                    >
                                        <td class="client-base-table-cell cli-number"  v-if="filtrationName!=='draft'">
                                            <template v-if="item.state.type==='approved'||item.state.type=== 'placement_paused'">
                                                <input type="checkbox" @change="pushState" :data-id="item.id" :name="`base-${index}`" :id="`base-${index}`" >
                                                <label class="label-checkbox" :for="`base-${index}`"
                                                >                                               
                                                </label>
                                            </template>
                                        </td>
                                        <td class="client-base-table-cell cli-fio" ><div>
                                            <img :src="`/api/shops/products/editor_images/${item.editor_image_id}`" :alt="item.name" >
                                        </div></td>
                                        <td class="client-base-table-cell cli-birth"><a :href="`/item/${item.id}`" @click.prevent="showItemCard(item.id); productId = item.id">{{item.name}}</a></td>
                                        <td class="client-base-table-cell cli-phone">
                                            {{statuses[item.state.type] ? statuses[item.state.type].name : ''}}
                                        </td>
                                        <td class="client-base-table-cell cli-date">
                                            {{item.state.type === 'placed' ? stringifyDate(item.state.placed_until) : item.state.type === 'placement_paused' ? secondsIntoTime(item.state.remaining_placement_time) : '-'}}
                                            </td>
                                        <td class="client-base-table-cell aside" >
                                            <template v-if="filtrationName === 'draft'">

                                            <button class="btn-send btn btn-active"
                                            @click="sendToReview(item.id)"
                                            >Отправить на проверку</button>
                                                    </template>
                                        </td>
                                    </tr>
                                </template>
                                <template v-else>
                                    <tr>
                                        <td :colspan="tableWidth" style="text-align: center">
                                             В данной категории нет товаров
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>

                        <div class="client-base-table-mobile mobile-only">
                            <template v-if="itemsData.products">
                                <div class="client-base-table-item" 
                                    v-for="(item, index) in itemsData.products" :key="index"
                                    
                                >
                                    <div class="client-base-table-num">
                                        <template v-if="item.state.type==='approved'||item.state.type=== 'placement_paused'">
                                                <input 
                                                @change="pushState" :data-id="item.id"
                                                type="checkbox" :name="`base-mobile-${index}`" :id="`base-mobile-${index}`" >
                                                <label class="label-checkbox" :for="`base-mobile-${index}`">                                               
                                                </label>
                                            </template>
                                    </div>
                                    <div class="client-base-table-el" >
                                        <div class="client-base-table-label">Фото</div>
                                        <img :src="`/api/shops/products/editor_images/${item.editor_image_id}`" :alt="item.name" >
                                    </div>
                                    <div class="client-base-table-el">
                                        <div class="client-base-table-label">Название</div>
                                        <div class="client-base-table-content"><a :href="`/item/${item.id}`" @click.prevent="showItemCard(item.id); productId = item.id">{{item.name}}</a></div>
                                    </div>
                                    <div class="client-base-table-el">
                                        <div class="client-base-table-label">Статус публикации</div>
                                        <div class="client-base-table-content">
                                            <!-- <template v-if="dateObj(item.state.placed_until)">
                                                Время публикации истекло
                                            </template>
                                            <template v-else> -->
                                                {{statuses[item.state.type] ? statuses[item.state.type].name : ''}}
                                            <!-- </template> -->
                                        </div>
                                    </div>
                                    <div class="client-base-table-el">
                                        <div class="client-base-table-label">{{item.state.type === 'placement_paused' ? 'Оставшееся время' : 'Срок публикации'}}</div>
                                        <div class="client-base-table-content">
                                            {{item.state.type === 'placed' ? stringifyDate(item.state.placed_until) : item.state.type === 'placement_paused' ? secondsIntoTime(item.state.remaining_placement_time) : '-'}}
                                        </div>
                                    </div>
                                    <div class="client-base-table-el" >
                                        

                                            <template v-if="filtrationName === 'draft'">

                                            <button class="btn-send btn btn-active"
                                            @click="sendToReview(item.id)"
                                            >Отправить на проверку</button>
                                                    </template>
                                    </div>
                                </div>
                            </template>
                            <template v-else>
                                <div class="client-base-table-item">
                                    <div class="client-base-table-el">
                                        <div class="client-base-table-label">В данной категории нет товаров</div>
                                    </div>
                                </div>
                            </template>
                        </div>

                    </div>

                    <div class="client-base-pagination">
                        <pagination :current="currentPage" :total="totalPages" @page-changed="changePageNum($event)" ></pagination>
                        
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
                            <router-link :to="''" v-if="filtrationName=='under_review'||filtrationName=='placed'" class="client-base-navigation-link page-link">
                                <button :disabled="itemsForConfirm ? Object.keys(itemsForConfirm).length  < 1 : true" @click.prevent="publishItems" class="btn btn-active">Опубликовать товары {{filtrationName==='under_review'?`за ${publishTotalCost} руб.`:''}} </button>
                            </router-link>
                        </div>
                    </div>
                </div>
            
            </main>

    </transition>
    </div>
    
</template>

<script>
import Pagination from './Pagination'
export default {
    components:{
        Pagination
    },
    data() {
        return {
            searchIn:'',
            currentPage:1,
            sortNum:10,
            totalPages: 1,
            filtrationName: 'draft',
            filtrationCategories: [
                {label:'Опубликованные товары', name: 'placed'},
                {label:'Товары на модерации', name: 'under_review'},
                {label:'Черновики', name: 'draft'},
            ],
            itemsData: [],
            itemsForConfirm: [],
            publishCost: 57,
            tableWidth: 5
        }
    },
    mounted(){
        this.getCatalog()
    },
    updated(){
       this.tableWidth = this.$refs.thead.firstElementChild.children ? this.$refs.thead.firstElementChild.children.length : 5
    },
    computed: {
        currentDate(){
            return new Date();
        },
        statuses(){
            return this.$store.state.productStatuses
        }, 
        productId:{
            get: function() {
				return this.$store.state.currItemId;
			},
			set: function(newValue) {
				return this.$store.state.currItemId = newValue;
			}
        },
        publishTotalCost(){
            return this.publishCost * this.itemsForConfirm.length
        },
        
    },
    methods: {
        changeTab(name){
            this.filtrationName=name;  
            this.getCatalog()
        },
        pushState(e){
            if(e.target.checked){
                this.itemsForConfirm.push(e.target.dataset.id)
            }else{
                this.itemsForConfirm.splice(this.itemsForConfirm.indexOf(e.target.dataset.id),1)
            }
        },
        publishItems(){
            this.$http.post('/api/shops/products/place',this.itemsForConfirm)
                .then(()=>{
                    this.$notify({
                        title: 'Товары размещены',
                        type: 'success'
                    })
                })
                .then(()=>{
                    return this.getCatalog()
                })
        },
        secondsIntoTime(secs){
            const d = Math.floor(secs / (3600 * 24));
            secs = secs - (d*3600*24)
            const h = Math.floor(secs / 3600);
            secs = secs - (h*3600)
            const m = Math.floor(secs / 60)
            secs = secs - (m*60)
            return `${d} д ${h} ч ${m} мин ${secs} сек`

        },
        dateObj(d){
            if(d != undefined){
                const expDate = new Date(d.toString());
                return expDate < new Date() ;
            }
            else return
        },
        stringifyDate(d){
            const expDate = new Date(d);
            return `${expDate.getDay()}.${+expDate.getMonth()+1}.${expDate.getFullYear()} ${expDate.getHours()}:${expDate.getMinutes()}`
        },
        sortType(){
            var optgroup=event.target.closest('.sort-type').querySelector('.sort-type-optgroup');
            optgroup.classList.toggle('hide')
            optgroup.classList.toggle('show')
            if(event.target==event.target.closest('.sort-type-option')){
                this.sortNum=event.target.closest('.sort-type-option').textContent;
                this.currentPage=1;
                this.getCatalog()
            }
        },
        changePageNum(num){
            this.currentPage=num;
            this.getCatalog()
        },
        showItemCard(id){
            this.$router.push(`/item/${id}`)
        },
        getCatalog(name=null){
            this.$http.get(`/api/shops/products?page=${this.currentPage}&limit=${this.sortNum}&filter=${this.filtrationName}${name ? '&name_like='+name : ''}`)
            .then(
                res=>{
                    this.itemsData = res.data;
                    this.totalPages = res.data.total_pages
                }
            )
        },
        sendToReview(id){
            this.$http.post(`/api/shops/products/${id}/send_to_review`)
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
                        this.getCatalog()
                    }
                )
        }
        
        
    },
    watch: {
        searchIn(){
            this.getCatalog(this.searchIn)
        }
    }
    
}

</script>