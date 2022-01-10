import Vue from 'vue'
import App from '@/App'
import Router from '@/routes'
import Store from '@/store'
import Vuetify from 'vuetify/lib/framework';
import VueClipboard from 'vue-clipboard2';
import VueCookie from 'vue-cookie';
import VueFragment from 'vue-fragment';
import VueMoment from 'vue-moment';
import VueTheMask from 'vue-the-mask';
import VueToasted from 'vue-toasted';
import VeeValidate from 'vee-validate';
import UtilCommon from '@/utils/common';
import UtilValidate from '@/utils/validate';
import UtilWebSQL from '@/utils/websql';
import Dimmer from '@/components/dimmer/default'
import Dialog from '@/components/dialog/default'

import LayoutDefault from '@/layouts/Default';
import LayoutEmpty from '@/layouts/Empty';

Vue.config.productionTip = false
Vue.use(Vuetify);
Vue.use(VueClipboard);
Vue.use(VueCookie);
Vue.use(VueFragment.Plugin);
Vue.use(VueMoment);
Vue.use(VueTheMask);
Vue.use(UtilCommon);
Vue.use(UtilValidate);
Vue.use(UtilWebSQL);
Vue.use(VeeValidate);
Vue.use(VueToasted, { position: 'bottom-center', duration: 2000 });

Vue.component('layout-empty', LayoutEmpty);
Vue.component('layout-default', LayoutDefault);

const constructor = new Vue({
	router: Router,
	store: Store,
	vuetify: new Vuetify(),
	render: h => h('main', [
		h(Dimmer),
		h(Dialog),
		h(App)
	])
});

const app = constructor.$mount('#app');
export { app };
