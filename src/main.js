import Vue from "vue";
import firebase from 'firebase'
import firebaseConfig from "./mixins/firebase";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// Your web app's Firebase configuration
firebase.initializeApp(firebaseConfig);
// Initialize Firebase
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
