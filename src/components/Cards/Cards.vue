<template>
  <div id="cards" v-if='data'>
    <Card class='item-card' style="width:90%"
          v-for='item,index in data'
          :key="index"
          :data-id="item.id"
          @click.native.stop="showInfo(item.id)">
      <p slot="title">
        <span class="title">{{item.title}}</span>
        <Rate
          :value="Math.floor(item.rating['average']/2*10)/10"
          showText
          allow-half
          disabled></Rate>
      </p>
      <p slot="extra"><a :href="item.alt" target="_blank" @click.stop="aClick">详情</a></p>

      <div class="sub-content">
        <Row>
          <Col span="6">
          <a @click.stop='aClick' :href="item.images.large" target="_blank"><img :src="item.images.small" style="width:100px"/></a>
          </Col>
          <Col span='16'>
          <div class="genres">
            <Tag class="item-genre" size='small' v-for="genre,index in item.genres" :key="index" type="dot"
                 color="blue">{{genre}}
            </Tag>
          </div>
          <div class="info-movie">
            <div class="directors">
              导演:
              <a @click.stop='aClick'
                 class='item-director'
                 v-for='director in item.directors'
                 :href="director.alt"
                 :data-id="director.id"
                 target="_blank">
                {{director.name}}
              </a>
            </div>
            <div class="actors">
              主演:
              <a @click.stop='aClick'
                 class='item-actor'
                 v-for='actor in item.casts'
                 :href="actor.alt"
                 :data-id="actor.id"
                 target="_blank">
                {{actor.name}}
              </a>
            </div>
          </div>
          </Col>
        </Row>
      </div>
    </Card>
    <movieInfo ref="movieinfo"></movieInfo>
  </div>
</template>

<script type='text/ecmascript-6'>
  import movieInfo from '../movieInfo/movieInfo.vue'
//  import $ from '../../libs/JqueryWrap.js'
  export default {
    props: {
      data: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    components: {
      movieInfo
    },
    methods: {
      showInfo: function (id) {
        this.$refs.movieinfo.toShow(id)
      },
      aClick: function () {
      }
    },
    created: function () {
    }
  }
</script>

<style lang='scss'>
  #cards {
    overflow: hidden;

    .item-card {
      margin-bottom: 8px;
      cursor: pointer;

      .title {
        margin-right: 10px;
      }

      .genres {

        .ivu-tag {
        }

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
    }
  }
</style>
