<template>
    <div>
        <div class="upload-file__wrapper ">
            <draggable v-model="images" class="upload-file__wrapper">


                <div class="upload-file__item bg-white" v-for="(item, index) in images" :key="index">
                    <div class="upload-file__del-icon" @click="deleteImage(item,index)">
                        <img :src="require('../../public/svg/times-circle-solid.svg')" alt="Удалить изображение">
                    </div>
                    
                    <img class="upload-file__uploaded" :src="item.base" alt="Изображение">
                    
                </div>
            </draggable>
            
            <div class="upload-file__item bg-white"  v-if="images.length<=4" @click="initFileUpload">
                
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
    </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
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
            console.log(this.files)
            this.images.splice(i,1);
            delete this.files[image.el]
            console.log(this.files)


        }
    },
    watch: {
        images(){
            this.$emit('onfileupload', this.images)
        }
    }
}
</script>

<style>

</style>