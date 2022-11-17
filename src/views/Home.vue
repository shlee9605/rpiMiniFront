<template>
    <div class = "A">
      <div id="B1">
        <v-app id="inspire">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    Rank
                  </th>
                  <th class="text-left">
                    ID
                  </th>
                  <th class="text-left">
                    WL
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, i) in rank"
                  :key="i"
                >
                  <td>{{ item.key }}</td>
                  <td>{{ item.userid }}</td>
                  <td>{{ item.winlose }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-app>
      </div>

    <div class = "B2">
      <div class = "C1">
          <form @submit.prevent="updatekey" class = headText>
            <div>
              <label for="KEY"> KEY :  </label>
              <input class="form-control" type="text" 
                v-model="gamekey" autofocus placeholder="키를 입력하세요" />
              <button  class="btn" :class="{'btn-success': !invalidForm}" type="submit" 
              :disabled="invalidForm"> 입력 </button>
            </div>
          </form>
      </div>
      
      <div class = "C2">
        <!-- <span>사진 영역</span> -->
        <div class="headText"> PHOTO HISTORY
        </div>
        <div class="D">
          <div class="E1">
            <div class="E2">
              <div v-if="pic1">
                <img :src="`${url}/uploads/${pic1}`"
                style="width:75%;margin-left:35px;margin-top:15px;"/>
              </div>
              <div v-else></div>
            </div>
            <div class="E2">
              <div v-if="pic2">
                <img :src="`${url}/uploads/${pic2}`"
                style="width:75%;margin-left:35px;margin-top:15px;"/>
              </div>
              <div v-else></div>
            </div>
          </div>
          <div class="E1">
            <div class="E3">
              <div v-if="pic3">
                <img :src="`${url}/uploads/${pic3}`"
                style="width:75%;margin-left:35px;margin-top:15px;"/>
              </div>
              <div v-else></div>
            </div>
            <div class="E3">
              <div v-if="pic4">
                <img :src="`${url}/uploads/${pic4}`"
                style="width:75%;margin-left:35px;margin-top:15px;"/>
              </div>
              <div v-else></div>
            </div>
          </div>
        </div>
		  </div>
    </div>  
    <p class="error" v-if="error">{{error}}</p>
  </div>
</template> 
<script>
import {profile} from '../api'

  export default {
    components:{
      
    },
    data() {
      return {
        loading: false,
        rank: [],
        pic1:'',
        pic2:'',
        pic3:'',
        pic4:'',
        error: '',
        userid: '',
        gamekey:'',
        url:'http://192.168.0.54:8080',
        // url:'http://192.168.0.63:8080'
      }
    },
    computed: {
      invalidForm() {
        return !this.gamekey
      },
    },
    created() {
      this.fetchData(),
      this.fetchPic(),
      this.rPath = this.$route.query.rPath || '/'
      // this.updatekey()
    },
    updated() {
      // this.$refs.boardItem.forEach(el => {
      //   el.style.backgroundColor = el.dataset.bgcolor
      // })
    },
    methods: {
      fetchData() {
        this.loading = true
        profile.fetchall()
          .then(data => {
            for(let i=0;i<10;i++){
              if(data.keys[i]){
                this.rank.push(data.keys[i])
              }
            }
          })
          .finally(_=> {
            this.loading = false
          })
      },

      fetchPic(){
        this.loading = true
        profile.fetch()
          .then(data => {
            this.pic1=data.keys[data.keys.length-1].photoURL1
            this.pic2=data.keys[data.keys.length-1].photoURL2
            this.pic3=data.keys[data.keys.length-1].photoURL3
            this.pic4=data.keys[data.keys.length-1].photoURL4
          })
          .finally(_=> {
            this.loading = false
          })
      },

      updatekey(){
        this.userid=localStorage.getItem("user")
        profile.updateid(this.gamekey, this.userid)
          .then(
            console.log(this.gamekey),
            this.$router.go()
          )
          .catch( err => {
            this.error = err.data.error
          })
      }
    }
  }
  </script>
  
  <style scoped>
  .home-title {
    padding: 10px;
    font-size: 18px;
    font-weight: bold;
  }
  .board-list {
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
  }
  .A {
    background-color: rgba(245, 245, 220, 0.475);
    width: 100%;
    height: 100%;
    margin: 5px;
    display: grid;
    grid-template-columns: 30% 70%;
  }
  .B1 {
    background-color: rgba(187, 187, 56, 0.475);
    width: 100%;
    height: 100%;
    margin: 5px;
    margin: 20px;
  }
  .B2 {
    width: 100%;
    height: 100vh;
    margin: 5px;
  }
  .C1 {
    width: 95%;
    height: 20%;
    margin: 20px;
    padding: 5px;
  }
  .C2 {
    width: 95%;
    height: 75vh;
    margin: 20px;
    padding: 5px;
  
  }
  .headText {
    /* background-color: rgba(147, 151, 192, 0.84); */
    font-size: x-large;
    color: rgb(5, 13, 8);
    text-align: center;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .D {
    background-color: rgba(255, 255, 255, 1);
    width: 80%;
    height: 85%;
    border: solid 1px black;
    margin: auto;
    padding: 5px;
  }
  .E1{
    width:100%;
    height: 50%;
    display: grid;
    padding: 2px;
    grid-template-columns: 50% 50%;
  }
  .E2{
    border: solid 1px black;
    width: 80%;
    height: 97%;
    margin-left:40px;
    padding: 5px;
  }
  .E3{
    border: solid 1px black;
    width: 80%;
    height: 97%;
    padding: 5px;
    margin-left:40px;
    margin-top: 5px;
  }
  .flexContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 300px;
    height: 300px;
    background-color: rgba(179, 179, 179, 0.525);
    padding-left: 30px;
    padding-right: 30px;
    margin-top: 10px
  }
  .form-control{
    outline: 2px solid;
    outline-color: rgb(22, 11, 90);
  }
  .btn{
    margin-left : 15px;
    outline: 2px solid;
    outline-color: rgb(22, 11, 90);
  }
  /* .board-item {
    width: 23%;
    height: 100px;
    margin: 0 2% 20px 0;
    border-radius: 3px;
  }
  .board-item-new {
    background-color: #ddd;
  }
  .board-item a {
    text-decoration: none;
    display: block;
    width: 100%;
    height: 100%;
  }
  .board-item a:hover,
  .board-item a:focus {
    background-color: rgba(0,0,0, .1);
    color: #666;
  }
  .board-item-title {
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    padding: 10px;
  }
  .board-item a.new-board-btn {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    height: 100px;
    width: inherit;
    color: #888;
    font-weight: 700;
  } */
  </style>