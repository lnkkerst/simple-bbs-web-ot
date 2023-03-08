import { createApp } from 'vue';
import App from './App.vue';
import router from '~/router';
import mavonEditor from 'mavon-editor';

import '@unocss/reset/tailwind.css';
import 'uno.css';
import 'element-plus/dist/index.css';
import 'mavon-editor/dist/css/index.css';

const app = createApp(App);
app.use(router);
app.use(mavonEditor);
app.mount('#app');
