<template>
    <div class="app-wrapper" ref="wrapper">
        <div class="reset-all-btn"
            @click="clear($event)"
        ></div>
        <canvas id="canvas"
            ref="canvas"
            @mouseup="finish($event)"
            @mousedown="start($event)"
            @mousemove="draw($event)"

            @touchstart.prevent="startM($event)"
            @touchend.prevent="endM($event)"
            @touchmove.prevent="drawM($event)"
        ></canvas>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            painting:false,
            ctx: null,
            canvas:null,
            touchlist:{}
        }
    },
    methods: {
        start(e){
            this.painting=true;
            this.ctx.beginPath();
        },
        finish(e){
            // this.stroke(e);
            this.painting=false;
        },
        draw(e){
            if(this.painting){
                this.stroke(e);
                this.ctx.beginPath();
                this.ctx.moveTo(e.offsetX, e.offsetY);
            }
        },
        stroke(e){
            this.ctx.lineTo(e.offsetX,e.offsetY);
            this.ctx.stroke();
        },
        clear(e){
            this.ctx.clearRect(0,0,this.$refs.canvas.width,this.$refs.canvas.height)
        },
        
        startM(e){
            var mousePos = this.getTouchPos(canvas, e);
            var touch = e.touches[0];
            var mouseEvent = new MouseEvent("mousedown", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.$refs.canvas.dispatchEvent(mouseEvent);
        },

        endM(e){
            var mouseEvent = new MouseEvent("mouseup", {});
            this.$refs.canvas.dispatchEvent(mouseEvent);
        },

        drawM(e){
            var touch = e.touches[0];
            var mouseEvent = new MouseEvent("mousemove", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.$refs.canvas.dispatchEvent(mouseEvent);
        },
        getTouchPos(canvasDom, touchEvent){
            var rect = canvasDom.getBoundingClientRect();
            return {
                x: touchEvent.touches[0].clientX - rect.left ,
                y: touchEvent.touches[0].clientY - rect.top 
            };
        }
    },
    mounted() {
        this.$refs.canvas.width=this.$refs.wrapper.clientWidth;
        this.$refs.canvas.height=this.$refs.wrapper.clientHeight;
        this.ctx = this.$refs.canvas.getContext('2d');
        this.ctx.lineWidth = 10;
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = 'black';
        window.addEventListener('resize',()=>{
            this.$refs.canvas.width=this.$refs.wrapper.clientWidth;
            this.$refs.canvas.height=this.$refs.wrapper.clientHeight;
        })
    },

}

</script>

<style scoped>
    .app-wrapper {
        min-height: 288px;
        padding: 0;
        max-width: 82.92%;
        position: relative;
    }
    .reset-all-btn{
        position: absolute;
        cursor: pointer;
        bottom: 5px;
        right: 5px;
        background: url('../../../public/svg/trash-alt-regular.svg') no-repeat;
        width: 25px;
        height: 25px;
    }
    @media screen and (max-width: 780px) {
        .app-wrapper{
            max-width: 100%;
            min-height: 80vh;
        }
    }
</style>