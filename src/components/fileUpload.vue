<template>
    <div>
        <template v-if="makeChanges">
            <div class="upload-file__wrapper ">
                <draggable v-model="images" class="upload-file__wrapper">


                    <div class="upload-file__item bg-white" v-for="(item, index) in images" :key="index">
                        <div class="upload-file__del-icon" @click="deleteImage(item,index)">
                            <img :src="require('../../public/svg/times-circle-solid.svg')" alt="Удалить изображение">
                        </div>
                        
                        <img class="upload-file__uploaded" :src="item.base" alt="Изображение">
                        
                    </div>
                </draggable>
                
                <div class="upload-file__item bg-white"  v-if="images.length <= maxFileAmount" @click="initFileUpload">
                    
                    <div class="upload_icon__wrapper">
                        <img  
                            class="upload_icon" 
                            src="../../public/svg/plus-circle-solid.svg" alt="">
                    </div>
                </div>

            </div>

            <div class="upload-file__actions">

                <input ref="inputField" style="display:none" type="file" :accept="fileFormat" @change="handleImage" :multiple="isMultiple">
                <button v-if="isMultiple" :disabled="images.length >= 5" @click.prevent="initFileUpload" class="btn btn-active btn-upload">Загрузить изображения ( {{ this.images.length }} / 5 )</button>
                <button v-else :disabled="images.length >= 1" @click.prevent="initFileUpload" class="btn btn-active btn-upload">Загрузить изображение </button>
                <div class="remark">
                    * Максимальный размер фото - 500 kb. Формат {{fileFormat}}
                </div>
            </div>
        </template>

        <template v-else>
             <div class="upload-file__wrapper ">


                    <div class="upload-file__item bg-white" v-for="(item, index) in imgs" :key="index">
                        
                        <img class="upload-file__uploaded" :src="item" alt="Изображение">
                        
                    </div>

            </div>

            <div class="upload-file__actions">

                <input ref="inputField" style="display:none" type="file" :accept="fileFormat" @change="handleImage" :multiple="isMultiple">
                <button @click.prevent="replaceImages" class="btn btn-active btn-upload">Заменить изображения</button>
                <div class="remark">
                    * Максимальный размер фото - 500 kb. Формат {{fileFormat}}
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
    props: {
        isMultiple: Boolean,
        makeChanges: {
            type:Boolean,
            default: true
        },
        fileFormat: String,
        imgs: Array,

    },
    components: {
        draggable
    },
    data(){
        return {
            maxFileSize: 5000000,
            image: '',
            images: [],
            files: [],
        }
    },
    computed: {
        maxFileAmount(){
            return this.isMultiple ? 4 : 0;
        }
    },
    methods: { 
        
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
            this.images.splice(i,1);
            delete this.files[image.el]


        },
        replaceImages(){
            this.$emit('filechange')
            this.imgs.forEach((it,index)=>{
                this.images.push({base:it, el:index})
            })
        }
    },
    watch: {
        images(){
            // console.log(this.images)
            if(this.images.length > 0) {
                let imagesPayload = this.isMultiple ? this.images : this.images[0].base;
                this.$emit('onfileupload', imagesPayload)
            }
        }
    }
}
</script>

<style>

</style>