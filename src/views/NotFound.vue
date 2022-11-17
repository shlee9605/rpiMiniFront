<template>
  <v-container fluid class="subBackground">
     <v-row>
        <v-col cols="12" xs="12" sm="6" md="5" lg="4" class="ma-auto">
           <img
              class="logoimg"
              src="../assets/pageNotFound.png"
              alt="logoimage"
           />
           <br />
       <!-- <div class="divText"> 페이지가 없습니다 </div> -->
           <v-card class="divText">
              <v-card-title>페이지가 없습니다</v-card-title>
              <v-card-text>
                 <v-btn text color="primary" class="pl-0" @click="goSignIn"
                    >돌아가기</v-btn
                 >
              </v-card-text>
           </v-card>
        </v-col>
     </v-row>
  </v-container>
</template>
 
 <script>
 export default {
   methods: {
     goSignIn() {
     this.$router.push('/')
   },
   }
 }
 </script>
 
 <style scoped>
 .logoimg {
   align-items: center;
   display: flex;
   justify-content: center;
   width: 100%;
   height: 100%;
   padding: 20px 20px;
   margin: 5px auto;
   color: rgba(240, 248, 255, 0.511);
 }
 .err {
   color: red;
 }
 .subBackground {
   /* background: url('../assets/pageNotFound.png'); */
   background-size: 100%;
   background-color: rgba(8, 11, 7, 0.607);
   width: 70%;
   height: 100%;
 }
 .divText{
   color: rgb(8, 8, 8);
   background-color: rgb(226, 236, 230);
   justify-content: center;
 }
 </style>