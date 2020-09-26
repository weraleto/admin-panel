<template>
    <div class="form-group-block">
        <label :for="name">{{label}} <span v-if="isRequired">*</span> </label>
        <!-- <input type="text" name="auth_login" placeholder="Введите логин"> -->

        <!-- <div :class="{'input-required':isRequired}"> -->
            <v-select :options="test" v-if="type == 'select'" :placeholder="placeholder"></v-select>
            <the-mask :mask="maskTypes[mask]?maskTypes[mask]:maskTypes['login']"
                :placeholder="placeholder"
                :id="name"
                v-else
            ></the-mask>
            <!-- <div v-if="isRequired" class="pseudo-mark">*</div> -->
        <!-- </div> -->
            

        

    </div>
</template>

<script>
import {TheMask} from 'vue-the-mask'
export default {
    name: 'MaskedInput',
    props: {
        name,
        label :{
            type: String,
            default: ''
        },
        isRequired:{
            type: Boolean
        },
        placeholder: {
            type: String,
            default: ''
        },
        mask: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'input'
        }
    },
    components: {TheMask},
    data(){
        return {
            maskTypes: {
                login: 'X'.repeat(30),
                balance_sum: 'X'.repeat(9)
            },
            test: [
                'foo',
                'bar',
                'baz'
            ],
        }
    }
}
</script>