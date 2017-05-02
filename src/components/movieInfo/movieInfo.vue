<template>
      <Modal
        v-model="status"
        width="500">
        <div slot="header">
          <p v-if="data">
            <span class="title">{{data.title}}</span>
            <span class="title" v-for="alias,index in data.aka"> / {{alias}}</span>
          </p>
        </div>
        <div class="content" v-if="data">
          <a :href="data.images.large" target="_blank"><img :src="data.images.large" alt="" style="width:300px"/></a>
          <div class="sub-content">
            <Rate :value="Math.floor(data.rating.average/2*10)/10" showText disabled></Rate>
            <div class="genres">
              <Tag class="item-genre" size='small' v-for="genre,index in data.genres" :key="index" type="dot"
                   color="blue">{{genre}}
              </Tag>
            </div>
            <div class="info-movie">
              <div class="directors">
                导演:
                <a class='item-director'
                   v-for='director in data.directors'
                   :href="director.alt"
                   :data-id="director.id"
                   target="_blank">
                  {{director.name}}
                </a>
              </div>
              <div class="actors">
                主演:
                <a class='item-actor'
                   v-for='actor in data.casts'
                   :href="actor.alt"
                   :data-id="actor.id"
                   target="_blank">
                  {{actor.name}}
                </a>
              </div>
            </div>
            <p class="summary">{{data.summary}}</p>
          </div>
        </div>
        <div slot="footer" class="close-wrapper">
          <Button icon="ios-close-outline" shape="circle" type='dashed' @click="toClose"></Button>
        </div>
      </Modal>
</template>

<script type='text/ecmascript-6'>
import $ from '../../libs/JqueryWrap.js'
export default {
  props: {},
  data: function () {
    return {
      status: false,
      data: null,
      id: 0
    }
  },
  methods: {
    toClose: function () {
      this.status = false
    },
    toShow: function (id) {
      this.data = null
      this.status = true
      this.id = id
      this.getData()
    },
    getData: function () {
      this.$Loading.start()
      var _this = this
      $.ajax({
        type: 'GET',
        url: 'https://api.douban.com/v2/movie/subject/' + _this.id,
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: '_jsonp',
        success: function (data) {
          if (arguments[1] === 'success') {
            _this.data = data
            _this.$Loading.finish()
          }
        },
        error: function (error) {
          console.log('error')
          console.log(error)
          _this.$Loading.error()
        },
        complete: function () {
        }
      })
    }
  },
  created: function () {
  }
}
</script>

<style lang='scss'>
  .content {
    width: 100%;
    text-align: center;
    .sub-content {
      .genres {
      }
      .info-movie {
        font-size: 0;
        padding-top: 6px;
        .directors, .actors {
          margin: 0 0 0 0;
          font-size: 12px;
          color: #657180;

          .item-director, .item-actor {
            color: #657180;
            margin: 0 2px;
          }

        }
      }
      .summary {
        margin-top: 5px;
        text-align: left;
        text-indent: 2em;
      }
    }
}
  .close-wrapper {
    text-align: center;
  }
</style>
