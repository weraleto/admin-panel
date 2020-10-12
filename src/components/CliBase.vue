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
                            @click="filtrationName=item.name"
                            v-for="(item, index) in filtrationCategories" :key="index"
                            >{{item.label}}</button>
                        </div>
                        
                    </div>
                    <div class="client-base-table">
                        <table>
                            <thead>
                                <tr>
                                    <th class="client-base-table-cell cli-number">№</th>
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
                                    v-for="(client, index) in paginatedData" :key="index"
                                    @click="showItemCard(client.id)"
                                    
                                >
                                    <td class="client-base-table-cell cli-number">{{client.id}}.</td>
                                    <td class="client-base-table-cell cli-fio"><div>
                                        <!-- {{client.photo}} -->
                                        <img :src="client.photo" :alt="client.date" >
                                    </div></td>
                                    <td class="client-base-table-cell cli-birth">{{client.date}}</td>
                                    <td class="client-base-table-cell cli-phone">{{client.phone}}</td>
                                    <td class="client-base-table-cell cli-date">{{client.reg}}</td>
                                    <td class="client-base-table-cell aside"> </td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="client-base-table-mobile mobile-only">
                            <div class="client-base-table-item" 
                                v-for="(client, index) in searchFilter" :key="index"
                                @click="showItemCard(client.id)"
                            >
                                <div class="client-base-table-num">{{client.id}}</div>
                                <div class="client-base-table-el">
                                    <div class="client-base-table-label">Фото</div>
                                    <!-- <div class="client-base-table-content">{{client.photo}}</div> -->
                                    <img :src="client.photo" :alt="client.date" >
                                </div>
                                <div class="client-base-table-el">
                                    <div class="client-base-table-label">Название</div>
                                    <div class="client-base-table-content">{{client.date}}</div>
                                </div>
                                <div class="client-base-table-el">
                                    <div class="client-base-table-label">Статус публикации</div>
                                    <div class="client-base-table-content">{{client.phone}}</div>
                                </div>
                                <div class="client-base-table-el">
                                    <div class="client-base-table-label">Срок публикации</div>
                                    <div class="client-base-table-content">{{client.reg}}</div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="client-base-pagination">
                        <pagination :current="currentPage" :total="searchFilter.length" :per-page="(+sortNum)" @page-changed="changePageNum($event)" ></pagination>
                        
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
                            <router-link :to="''" class="client-base-navigation-link page-link">
                                <button class="btn btn-active">Опубликовать товары</button>
                            </router-link>
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
            moveRight:[],
            cliList:[],
            testPhoto:``,
            filtrationName: 'published',
            filtrationCategories: [
                {label:'Опубликованные товары', name: 'published'},
                {label:'Товары на модерации', name: 'moderation'},
                {label:'Черновики', name: 'drafts'},
            ]
        }
    },
    created() {
        // create fake data
        for(var i=0;i<35;i++){
            this.cliList.push(
              {
                    id:i+1,
                    photo:this.testPhoto,
                    date:'Диван угловой',
                    phone:'опубликовано',
                    reg:'до 15.10.2020'
                }  
            )
        }
    },
    methods: {
        sortType(){
            var optgroup=event.target.closest('.sort-type').querySelector('.sort-type-optgroup');
            optgroup.classList.toggle('hide')
            optgroup.classList.toggle('show')
            if(event.target==event.target.closest('.sort-type-option')){
                this.sortNum=event.target.closest('.sort-type-option').textContent;
            }
        },
        changePageNum(num){
            this.currentPage=num;
        },
        showItemCard(id){
            this.showInfo = true;
            this.$router.push(`/item/${id}`)
        }   
        
    },
    computed: {
        searchFilter(){
            if(this.searchIn!=''){
                return this.cliList.filter(item => item.name.toLowerCase().indexOf(this.searchIn.toLowerCase()) !== -1)
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
    
}

</script>