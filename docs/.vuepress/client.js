import { defineClientConfig } from 'vuepress/client';
import './styles/index.css';

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    // app is the Vue 3 app instance
    // router is the Vue router instance
    // siteData is the site data
  },
  setup() {
    // this function will be executed directly in browser end
  },
  rootComponents: [],
});
