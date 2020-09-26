<template>
    <div>
        <transition name="fade" mode="out-in">
            <step1
                @onplus="onPlus()"
                @onminus="onMinus()"
                v-if="counter==0"
                key="s1"
            ></step1>
            <step2
                @onplus="onPlus()"
                @onminus="onMinus()"
                v-else-if="counter==1"
                key="s2"
            ></step2>
            <step3
                @onplus="onPlus()"
                @onminus="onMinus()"
                v-else-if="counter==2"
                key="s3"
            ></step3>
            <finish
                v-else-if="counter==3"
                @onplus="onPlus()"
                key="s4"
            ></finish>
        </transition>
        
    </div>
</template>

<script>
import Step1 from './quiz/Step1'
import Step2 from './quiz/Step2'
import Step3 from './quiz/Step3'
import Finish from './quiz/Finish'
export default {
    components:{
        Step1,
        Step2,
        Step3,
        Finish
    },
    data() {
        return {
            counter:0,
            steps:{s1:0,s2:1,s3:2,s4:3}
        }
    },
    methods: {
        onPlus(){
            event.preventDefault();
            this.counter++
            if(this.counter==4){
                this.counter=0;
            }
            window.scrollTo(0,0)
        },
        onMinus(){
            event.preventDefault();
            if(this.counter>0){
                this.counter--;
                window.scrollTo(0,0)
            }
        }
    },
    computed: {
        step(){
            return this.steps[this.counter]
        }
    },
}
</script>