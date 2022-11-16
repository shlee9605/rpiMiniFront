<template>
  <div>
    <div class="home-title">Personal Boards</div>
    <div class="board-list" ref="boardList">
      {{ rank }}
      <div>
        {{pics}}
      </div>

    </div>
    
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
        pics: [],
        error: '',
      }
    },
    computed: {
      photourl(){
        return this.boards;
      }
    },
    created() {
      this.fetchData(),
      this.fetchPic(),
      this.updatekey()
    },
    updated() {
      this.$refs.boardItem.forEach(el => {
        el.style.backgroundColor = el.dataset.bgcolor
      })
    },
    methods: {
      fetchData() {
        this.loading = true
        profile.fetchall()
          .then(data => {
            console.log(data)
            this.rank=data
          })
          .finally(_=> {
            this.loading = false
          })
      },

      fetchPic(){
        this.loading = true
        profile.fetch()
          .then(data => {
            console.log(data)
            this.pics=data
          })
          .finally(_=> {
            this.loading = false
          })
      },

      updatekey(){
        this.loading = true
        profile.updateid()
          .then(data => {
            console.log(data)
            // this.pics=data
          })
          .finally(_=> {
            this.loading = false
          })
      }
    }
  }
  </script>
  
  <style>
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
  .board-item {
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
  }
  </style>