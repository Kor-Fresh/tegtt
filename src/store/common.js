import cookie from 'vue-cookie';
import { FETCH_GET, FETCH_POST, FETCH_PUT, FETCH_DELETE } from '@/utils/axios/fetch';
import { FETCH_ALL, FETCH_ALL_GET, FETCH_ALL_POST, FETCH_ALL_PUT, FETCH_ALL_DELETE } from '@/utils/axios/fetch-all'

const INITIALIZE = () => {
	return {
		need_fetch: false,
		need_refresh: false,
		dialog: false,
		mobile: navigator.platform && navigator.platform.match(/^(win16|win32|win64|mac|macintel)$/gi) === null,
		data: null
	};
};

const STATE = INITIALIZE;

const MUTATIONS = {
	INITIALIZE(state)
	{
		state.need_fetch = false;
		state.need_refresh = false;
	},
	NEED_FETCH(state)
	{
		state.need_fetch = true;
	},
	NEED_FETCH_DONE(state)
	{
		state.need_fetch = false;
	},
	NEED_REFRESH(state)
	{
		state.need_refresh = true;
	},
	NEED_REFRESH_DONE(state)
	{
		state.need_refresh = false;
	},
	SET_DIALOG(state, data)
	{
		state.dialog = true;
		state.data.dialog = Object.assign({}, data);
	},
	UNSET_DIALOG(state)
	{
		state.dialog = false;
		state.data.dialog = null;
	},
	SET_MESSAGE(state, data)
	{
		state.data.message = data;
	},
	UNSET_MESSAGE(state)
	{
		state.data.message = null;
	}
};

const ACTIONS = {

};

export default
{
	namespaced: true,
	state: STATE,
	mutations: MUTATIONS,
	actions: ACTIONS
}
