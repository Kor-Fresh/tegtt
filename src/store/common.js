import { FETCH_GET, FETCH_POST, FETCH_PUT, FETCH_DELETE } from '@/utils/axios/fetch';

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
	}
};

const ACTIONS = {
	async call_list({ state, commit, dispatch }, data)
	{
		return FETCH_GET('/test1.php', data, (response) => {
			if(response.status === 200)
			{
				return response;
			}
			return false;
		});
	},
	async call_list2({ state, commit, dispatch }, data)
	{
		return FETCH_GET('/test2.php', data, (response) => {
			if(response.status === 200)
			{
				return response;
			}
			return false;
		});
	},
};

export default
{
	namespaced: true,
	state: STATE,
	mutations: MUTATIONS,
	actions: ACTIONS
}
