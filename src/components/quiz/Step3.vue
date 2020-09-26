<template>
    <main class="main-content table-content" >
            <div class="client-base-list">
                <!-- main header -->
                <header class="client-base-header">
                    <h1 class="page-header">3. Анкета клиента</h1>
                </header>

                
                <div class="client-base-table step--3">
                    <table>
                        <thead>
                            <tr>
                                <th class="client-base-table-cell cli-number">№</th>
                                <th class="client-base-table-cell cli-quest">Вопрос</th>
                                <th class="client-base-table-cell cli-answ">Ответ</th>
                                <th class="client-base-table-cell cli-comm">Комментарий</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(quest, index) in questions" :key="index">
                                <td class="client-base-table-cell cli-number">{{index+1}}.</td>
                                <template v-if="!quest.isComm">
                                    <td class="client-base-table-cell cli-quest"><div>
                                        <div>
                                            
                                            {{quest.quest}}
                                            <span class="if-remark">
                                                (если ДА, {{quest.remark}})
                                            </span>
                                        </div>
                                    </div></td>
                                    <td class="client-base-table-cell cli-answ">
                                        <div class="btn-group-table">
                                            <button class="btn btn-light yes">Да</button>
                                            <button class="btn btn-light no">Нет</button>
                                        </div>
                                    </td>
                                    <td class="client-base-table-cell cli-comm">
                                        <div class="text-comment">
                                            <div class="close-comm">
                                                <img src="../../../public/svg/close-square.svg" alt="">
                                            </div>
                                            <masked-input v-if="quest.date" type="text" mask="11.11.1111" placeholder="Комментарий" disabled />
                                            <input v-else type="text" placeholder="Комментарий" disabled>
                                        </div>
                                    </td>
                                </template>
                                <template v-else>
                                    <td class="client-base-table-cell cli-quest"><div>
                                        <div>
                                            
                                            {{quest.quest}}
                                            
                                        </div>
                                    </div></td>
                                    
                                    <td class="client-base-table-cell cli-comm-full">
                                        <div class="text-comment-full">

                                            <input type="text" placeholder="Комментарий" >
                                        </div>
                                    </td>
                                    <td></td>
                                </template>
                            </tr>
                            
                        </tbody>
                    </table>

                    <div class="client-base-table-mobile mobile-only">
                        <div class="client-base-table-item" v-for="(quest, index) in questions" :key="index">
                            <template v-if="!quest.isComm">
                                <div class="client-base-table-el">
                                    <div class="client-base-table-quest">
                                        {{quest.quest}}
                                            <span class="if-remark">
                                                (если ДА, {{quest.remark}})
                                            </span>
                                    </div>
                                </div>
                                <div class="client-base-table-el btns"
                                
                                >
                                    <div class="client-base-table-answer">
                                        <button class="btn btn-light yes">Да</button>
                                        <button class="btn btn-light no">Нет</button>
                                    </div>
                                </div>
                                <div class="client-base-table-el">
                                    <div class="text-comment">
                                        <masked-input v-if="quest.date" type="text" mask="11.11.1111" placeholder="Комментарий" disabled />
                                        <input v-else type="text" placeholder="Комментарий" disabled>
                                    </div>
                                </div>
                            </template>
                            <template v-else>
                                <div class="client-base-table-el">
                                    <div class="client-base-table-quest">
                                        {{quest.quest}}
                                    </div>
                                </div>
                                <div class="client-base-table-el"
                                    
                                >
                                    <div class="text-comment">

                                        <input type="text" placeholder="Комментарий" >
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>

                </div>
                <div class="client-base-sign">
                    <div class="agreement-text">

                        <p>Своей подписью я, подтверждаю, что прочитал(-а) и понял(-а) содержание всех вышеперечисленных пунктов анкеты и предупрежден(-а), что несу полную ответственность за достоверность предоставленной мною информации.</p>
                        <p>
                            Также мне полностью разъяснено, что абсолютными противопоказаниями к прохождению процедур массажа лица в Студии лифтинг массажа лица Face Fit являются:  
                        </p>
                        <ul>
                            <li>доброкачественные и злокачественные опухоли любой локализации;</li>
                            <li>болезни крови;</li>
                            <li>тромбозы, тромбофлебиты, недостаточность кровообращения, пороки аорты, клапанов сердца;</li>
                            <li>острая ишемия миокарда;</li>
                            <li> легочно-сердечная недостаточность;</li>
                            <li>острая сердечно-сосудистая недостаточность;</li>
                            <li>активные формы туберкулеза;</li>
                            <li>аневризмы сосудов, аорты, сердца;</li>
                            <li>остеомелит, трофические язвы, гангрена;</li>
                            <li>ботокс, филеры, установленные менее 3 (трех) недель назад;</li>
                            <li>косметологические нити, установленные менее 3 (трех) месяцев назад</li>
                            <li>пластические операции на лицо, шею и зону декольте, сделанные менее 6 (шести) месяцев назад.</li>
                        </ul>
                    </div>
                    <!-- <div class="agreement-sign">
                        <div class="form-content agreement">
                            <h3 class="form-subheader">Добавьте подпись</h3>
                            <form action="">
                                <div class="form-group">
                                    <div class="form-grop-blocks">
                                        <div class="form-group-block">
                                            <label for="step-3_agr">Распишитесь на экране</label>
                                            <draw-field></draw-field>
                                        </div>
                                    </div>                                    
                                </div>
                            </form>
                        </div>
                    </div> --> 
                </div>
                <div class="client-base-navigation">
                    <div class="btn-group btn-step--3">
                        <button
                            @click="$emit('onplus')"
                         class="btn btn-active">Продолжить</button>
                        <button
                            @click="$emit('onminus')"
                         class="btn btn-light">Назад</button>
                    </div>
                    <div class="remark">
                        * Вся предоставленная информация конфиденциальна и не будет передана третьим лицам.
                    </div>
                </div>
            </div>
           
        </main>    
</template>

<script>
import MaskedInput from 'vue-masked-input'
import DrawField from './DrawField'
export default {
    components: {
        MaskedInput,
        DrawField
    },
   mounted() {
       this.no=document.querySelectorAll('.no');
       this.no.forEach((btn,index)=>{
           btn.addEventListener('click',function addClass(){
               btn.classList.toggle('active');
               if(document.documentElement.clientWidth<=780){
                   var yesBtn=event.target.closest('.client-base-table-answer').querySelector('.yes');
                    if(btn.classList.contains('active')){
                        event.target.previousElementSibling.classList.remove('active')
                        var inputCell=event.target.closest('.client-base-table-el').nextElementSibling;
                        var inp=inputCell.querySelector('input');
                        inp.disabled=!inp.disabled;
                    }
                }
           })
           
       })

       var yes=document.querySelectorAll('.yes');
       yes.forEach((btn,index)=>{
           btn.addEventListener('click',(event)=>{
               btn.classList.toggle('active');
               var inputCell;
               if(document.documentElement.clientWidth>780){
                  inputCell=event.target.closest('td').nextElementSibling;
                    var noBtn=event.target.nextElementSibling;
                   noBtn.classList.toggle('hide');
                   noBtn.classList.remove('active');
                   var inpWrap= inputCell.querySelector('.text-comment');
                    inpWrap.classList.toggle('slide-in')
                    inpWrap.lastChild.disabled=!inpWrap.lastChild.disabled;
                    inpWrap.querySelector('.close-comm').addEventListener('click',()=>{
                        btn.classList.remove('active');
                        noBtn.classList.remove('hide')
                        inpWrap.classList.toggle('slide-in')
                        inpWrap.lastChild.disabled=!inpWrap.lastChild.disabled;
                    })
               }else{
                   inputCell=event.target.closest('.client-base-table-el').nextElementSibling;
                   var inp=inputCell.querySelector('input');
                   inp.disabled=!inp.disabled;
                   if(btn.classList.contains('active')){
                       event.target.nextElementSibling.classList.remove('active')
                   }
               }
           })
       })
   },
   data() {
       return {
           questions:[
               {isComm:false,date:true,quest:'Делали ли Вы какие-либо косметологические инъекции?',remark:'укажите дату'},
               {isComm:false,date:true,quest:'Ставили ли Вы себе косметологические нити?',remark:'укажите дату'},
               {isComm:false,date:true,quest:'Делали ли Вы пластические операции на лицо/шею/зону декольте?',remark:'укажите дату'},
               {isComm:true,quest:'Если ответ на вопрос 3 положительный, какие именно операции?',remark:''},
               {isComm:false,quest:'У Вас повышенное/пониженное давление на постоянной основе?',remark:'укажите комментарии'},
               {isComm:false,quest:'Склонны ли Вы к появлению синяков?',remark:'укажите комментарии'},
               {isComm:false,quest:'Есть ли у Вас анемия?',remark:'укажите комментарии'},
               {isComm:false,quest:'Есть ли у Вас какие-либо другие болезни крови?',remark:'укажите какие'},
               {isComm:false,quest:'Есть ли у Вас какие-либо аллергии? ',remark:'укажите на что'},
               {isComm:true,quest:'Если ответ на вопрос 9 «ДА», укажите, как они проявляются? Какие симптомы? Чем снимаются?',remark:''},
               {isComm:false,quest:'Есть ли у Вас какие-либо кожные заболевания?',remark:'укажите какие'},
               {isComm:true,quest:'Если ответ на вопрос 11 «ДА», укажите, как часто у Вас бывают обострения этих заболеваний?',remark:''},
               {isComm:false,quest:'Бывают ли у Вас воспаления на коже?',remark:'укажите какого характера'},
               {isComm:true,quest:'Если ответ на вопрос 13 «ДА», укажите, с чем это обычно связано?',remark:''},
               {isComm:false,quest:'Есть ли у Вас купероз? ',remark:'укажите в какой форме'},
               {isComm:false,quest:'Есть ли у Вас экзема? ',remark:'в какой форме'},
               {isComm:false,quest:'Есть ли у Вас заболевания щитовидной железы? ',remark:'укажите какие'},
               {isComm:false,quest:'Бывают ли эпилептические приступы?',remark:'укажите частоту'},
               {isComm:false,quest:'Бывают ли у Вас головные боли? мигрень?',remark:'укажите какие и как часто'},
               {isComm:false,quest:'Принимаете ли Вы сейчас какие-либо медикаменты?',remark:'укажите наименования'},
               {isComm:false,quest:'Вы беременны? ',remark:'укажите срок'},
               {isComm:false,quest:'Кормите ли Вы грудью? ',remark:'укажите сколько'},
               {isComm:false,quest:'Вы принимаете наркотические или психотропные вещества? ',remark:'укажите какие'},
               {isComm:false,quest:'Есть ли у Вас гормональные проблемы?',remark:'укажите какие'},
               {isComm:false,quest:'Есть ли у Вас какие-то венерические заболевания?',remark:'укажите какие'},
               {isComm:false,quest:'У Вас есть проблемы с сердцем?',remark:'укажите какие'},
               {isComm:false,quest:'У Вас есть (были) злокачественные опухоли?',remark:'укажите какие'},
               {isComm:false,quest:'Бывали ли у Вас злокачественные опухоли?',remark:'укажите какие и когда'},
               {isComm:true,quest:'Если ответ на вопросы 27, 28 «ДА», стоите ли Вы на учете?',remark:''},
               {isComm:false,quest:'Есть ли у Вас доброкачественные опухоли? ',remark:'укажите какие'},
               {isComm:false,quest:'Вы курите? ',remark:'то укажите как давно'},
               {isComm:false,quest:'Склонны ли Вы к появлению отеков?',remark:'укажите как часто'},
               {isComm:true,quest:'Если ответ на вопрос 32 «ДА», укажите, когда и где они появляются? С Чем это cвязано?',remark:''},
               {isComm:false,quest:'Делали ли Вы когда-нибудь подобные процедуры?',remark:'укажите какие именно и где'},
               {isComm:true,quest:'Если ответ на вопрос 34 «ДА», расскажите, какая была реакция?',remark:''},
               {isComm:false,quest:'Есть ли у Вас еще какие-то диагнозы, о которых мы Вас не спросили?',remark:'укажите в комментарии'},

           ]
       }
   },
};
</script>