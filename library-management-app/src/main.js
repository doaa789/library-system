import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';  // create a vuetify plugin
import { createRouter, createWebHistory } from 'vue-router';
import routes from './router';  // create a router.js file with routes

const app = createApp(App);

app.use(vuetify);
app.use(createRouter({
  history: createWebHistory(),
  routes,
}));

app.mount('#app');








//import { createApp } from 'vue'
//import App from './App.vue'
//import router from './router'
//import vuetify from './plugins/vuetify'
//import { loadFonts } from './plugins/webfontloader'

//loadFonts()

//createApp(App)
 // .use(router)
  //.use(vuetify)
  //.mount('#app')


