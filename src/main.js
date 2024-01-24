import { createApp } from 'vue';
import App from './App.vue';
import router from '~/router';
import mavonEditor from 'mavon-editor';

// 引入 css
import '@unocss/reset/tailwind.css';
import 'uno.css';
import 'element-plus/dist/index.css';
import 'mavon-editor/dist/css/index.css';

const app = createApp(App);

// 注册路由
app.use(router);

// 全局注册 mavonEditor 组件
app.use(mavonEditor);

app.mount('#app');
