import Vue from 'vue'
import Router from 'vue-router'
import MovieLists from '../components/MovieLists/MovieLists.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {name: 'ishit'}
    },
    {
      path: '/ishit',
      name: 'ishit',
      component: MovieLists
    },
    {
      path: '/commingsoon',
      name: 'commingsoon',
      component: MovieLists
    },
    {
      path: '/top250',
      name: 'top250',
      component: MovieLists
    }
  ]
})
