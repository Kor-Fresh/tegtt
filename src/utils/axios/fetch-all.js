/**
 * @brief 필수 모듈 호출
 */
import axios from 'axios';
import cookie from 'vue-cookie';
import querystring from 'querystring';
import { app } from '@/main';

/**
 * @brief axios 기본 헤더 선언
 */
axios.defaults.headers['Authorization'] = '';
axios.defaults.headers['Platform'] = 'Web';
axios.defaults.headers['Service'] = 'Eum-Super';

/**
 * @brief API 서버 URL
 */
const API_URL = process.env.VUE_APP_API_URL;

/**
 * @brief axios 성공 처리
 * @param response
 * @param success
 */
const SUCCESS = (response, success) => {
	if(success === null)
	{
		return response;
	}

	return success(response);
};

/**
 * @brief axios 실패 처리
 * @param error
 */
const FAILURE = (error) => {
	switch(error.response.status)
	{
		case 401 :
			axios.defaults.headers['Authorization'] = '';
			cookie.delete(process.env.VUE_APP_TOKEN_KEY);

			app.$store.dispatch('common/INITIALIZE');
			app.$router.replace({ name: 'auth-sign-in' });
			return false;

		default :
			app.$toasted.show(error.response.data.message || app.$t('messages.error_has_occurred'));
			return false;
	}
};

/**
 * @brief Promise.all 을 이용한 API 서버와의 통신
 * @param promises
 * @param success
 */
export function FETCH_ALL(promises, success)
{
	return Promise.all(promises)
		.then((response) => SUCCESS(response, success, true))
		.catch(FAILURE);
}

/**
 * @brief GET 메소드를 이용한 API 서버와의 통신
 * @param path
 * @param params
 */
export function FETCH_ALL_GET(path, params = null)
{
	const url = API_URL + path + '?' + querystring.stringify(Object.assign({}, app.common.exists_value_in_object(params), { t: new Date().getTime() }));

	return axios({
		method: 'GET',
		url: url,
		config: {
			headers: {
				'Content-Type': 'application/json'
			}
		}
	});
}

/**
 * @brief POST 메소드를 이용한 API 서버와의 통신
 * @param path
 * @param data
 */
export function FETCH_ALL_POST(path, data)
{
	const url = API_URL + path + '?t=' + new Date().getTime();
	const use_form_data = data instanceof FormData;

	return axios({
		method: 'POST',
		url: url,
		data: data,
		config: {
			headers: {
				'Content-Type': use_form_data === true ? 'multipart/form-data' : 'application/json'
			}
		}
	});
}

/**
 * @brief PUT 메소드를 이용한 API 서버와의 통신
 * @param path
 * @param data
 */
export function FETCH_ALL_PUT(path, data)
{
	const url = API_URL + path + '?t=' + new Date().getTime();
	const use_form_data = data instanceof FormData;

	return axios({
		method: 'PUT',
		url: url,
		data: data,
		config: {
			headers: {
				'Content-Type': use_form_data === true ? 'multipart/form-data' : 'application/json'
			}
		}
	});
}

/**
 * @brief DELETE 메소드를 이용한 API 서버와의 통신
 * @param path
 * @param params
 */
export function FETCH_ALL_DELETE(path, params = null)
{
	const url = API_URL + path + '?' + querystring.stringify(Object.assign({}, app.common.exists_value_in_object(params), { t: new Date().getTime() }));

	return axios({
		method: 'DELETE',
		url: url,
		config: {
			headers: {
				'Content-Type': 'application/json'
			}
		}
	});
}