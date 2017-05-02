<template>
  <div id="ishit">
    <Select v-if='hasCity' v-model="city" style="width:200px" @on-change="cityChange">
      <Option v-for="item,index in cityLists" :key='index' :value="item"></Option>
    </Select>
    <Button-group class='btn-info' shape='circle' v-if="data.total">
      <Button disabled>{{data.title}}</Button>
      <Button disabled>{{data.total}}</Button>
    </Button-group>

    <Cards :data="currentPageShow"></Cards>
    <div class="page-wrapper" v-if="data.total">
      <Page :total="data.total" :page-size="4" @on-change="pageChange"></Page>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import $ from '../../libs/JqueryWrap.js'
  import Cards from '../Cards/Cards.vue'
  // 正在热映
  export default {
    data: function () {
      return {
        hasCity: false,
        city: '郑州',
        cityLists: [
          '郑州',
          '北京',
          '上海',
          '周口',
          '广州'
        ],
        data: {
          total: 0,
          title: ''
        },
        currentPageShow: [],
        url: ''
      }
    },
    props: {
      resourceUrls: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    created: function () {
      for (var i = 0; i < this.resourceUrls.length; i++) {
        if (this.$route.name === this.resourceUrls[i].name) {
          this.url = this.resourceUrls[i].url
          break
        }
      }
      if (this.$route.name === 'ishit') {
        this.hasCity = true
      } else {
        this.hasCity = false
      }
      this.getData(0)
    },
    methods: {
      pageChange: function (num) {
        this.getData(num - 1)
      },
      cityChange: function () {
        this.data = {title: '', total: 0}
        this.getData(0)
      },
      getData: function (start) {
        var _this = this
        if (_this.data['page' + start]) {
          _this.currentPageShow = _this.data['page' + start]
          return
        }
        this.$Loading.start()
        $.ajax({
          type: 'GET',
          url: _this.url,
          dataType: 'jsonp',
          jsonp: 'callback', // jsonp字段参数名  ?callback=''
          jsonpCallback: '_jsonp', // jsonp回调函数名字  callback='_jsonp'
          data: {city: _this.city, count: 4, start: start * 4},
          success: function (data) {
            if (arguments[1] === 'success') {
              _this.currentPageShow = data.subjects
              if (!_this.data.title || !_this.data.total) {
                _this.data.title = data.title
                _this.data.total = data.total
              }
              _this.data['page' + start] = _this.currentPageShow
            }
            _this.$Loading.finish()
          },
          error: function (error) {
            console.log(error)
            _this.$Loading.error()
          },
          complete: function () {
//          console.log('complete')
          }
        })
      }
    },
    computed: {},
    components: {
      Cards
    },
    watch: {
      '$route': function (to, from) {
        for (var i = 0; i < this.resourceUrls.length; i++) {
          if (to.name === this.resourceUrls[i].name) {
            this.url = this.resourceUrls[i].url
            break
          }
        }
        if (to.name === 'ishit') {
          this.hasCity = true
        } else {
          this.hasCity = false
        }
        this.data = {title: '', total: 0}
        this.getData(0)
      }
    }
  }
</script>

<style lang='scss'>
  #ishit {
    .btn-info {
      margin: 10px 0;
      .ivu-btn[disabled] {
        background-color: #5cadff;
        color: #fff;
      }
    }
    .page-wrapper {
      text-align:center;
      .ivu-page {
        display: inline-block;
      }
    }
  }
</style>
