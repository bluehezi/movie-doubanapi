<template>
  <div id="app">
    <Row>
      <Col span=6>
      <Menu :theme="currentTheme" :active-name="activeName">
        <Menu-item v-for="item,index in tos" :name="index" :key="index">
          <router-link class='item-link' :to="tos[index]">{{menuLists[index].title}}</router-link>
        </Menu-item>
      </Menu>
      </Col>
      <Col span=16 offset="1">
        <router-view :resourceUrls="tos"></router-view>
      </Col>
    </Row>

  </div>
</template>

<script>
  export default {
    name: 'app',
    data: function () {
      return {
        currentTheme: 'light',
        menuLists: [
          {title: '正在热映'},
          {title: '即将上映'},
          {title: 'Top250'}
        ],
        tos: [
          {name: 'ishit', url: 'https://api.douban.com/v2/movie/in_theaters'},
          {name: 'commingsoon', url: 'https://api.douban.com/v2/movie/coming_soon'},
          {name: 'top250', url: 'https://api.douban.com/v2/movie/top250'}
        ]
      }
    },
    computed: {
      activeName: function () {
        return this.indexOf(this.tos, value => {
          return value.name === this.$route.name
        })
      }
    },
    methods: {
      indexOf: function (arr, func) {
        for (var i = 0; i < arr.length; i++) {
          if (func(arr[i])) {
            return i
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
    min-width: 992px;
    .item-link {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
  }

</style>
