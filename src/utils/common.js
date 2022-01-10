import { v4 as uuidv4 } from 'uuid';
import { app } from '@/main';

export default
{
	install(Vue)
	{
		Vue.prototype.common = {
			in_array: (haystack, needle) => {
				return !!haystack.find((h) => String(h) === String(needle));
			},
			array_diff: (array1, array2) => {
				return array1.filter((v) => !array2.includes(v));
			},
			array_sort: (haystack, key, reverse = false) => {
				haystack.sort((a, b) => {
					if(reverse === false)
					{
						if(a[key] < b[key])
						{
							return -1;
						}
						else if(a[key] > b[key])
						{
							return 1;
						}
					}
					else
					{
						if(a[key] > b[key])
						{
							return -1;
						}
						else if(a[key] < b[key])
						{
							return 1;
						}
					}

					return 0;
				});

				return haystack;
			},
			sprintf: (format, mixed) => {
				const regex = /%%|%(?:(\d+)\$)?((?:[-+#0 ]|'[\s\S])*)(\d+)?(?:\.(\d*))?([\s\S])/g;
				let i = 0;

				const _pad = (str, len, chr, leftJustify) => {
					if(!chr)
					{
						chr = ' ';
					}

					const padding = (str.length >= len) ? '' : new Array(1 + len - str.length >>> 0).join(chr);
					return leftJustify ? str + padding : padding + str;
				};

				const justify = (value, prefix, leftJustify, minWidth, padChar) => {
					const diff = minWidth - value.length;
					if(diff > 0)
					{
						if(!leftJustify && padChar === '0')
						{
							value = [value.slice(0, prefix.length), _pad('', diff, '0', true), value.slice(prefix.length)].join('');
						}
						else
						{
							value = _pad(value, minWidth, padChar, leftJustify);
						}
					}

					return value;
				};

				const _formatBaseX = (value, base, leftJustify, minWidth, precision, padChar) => {
					const number = value >>> 0;
					value = _pad(number.toString(base), precision || 0, '0', false);
					return justify(value, '', leftJustify, minWidth, padChar);
				};

				const _formatString = (value, leftJustify, minWidth, precision, customPadChar) => {
					if(precision !== null && precision !== undefined)
					{
						value = value.slice(0, precision);
					}

					return justify(value, '', leftJustify, minWidth, customPadChar);
				};

				const doFormat = (substring, argIndex, modifiers, minWidth, precision, specifier) => {
					let number, prefix, method, textTransform, value;

					if(substring === '%%')
					{
						return '%';
					}

					let padChar = ' ';
					let leftJustify = false;
					let positiveNumberPrefix = '';
					let j, l;

					for (j = 0, l = modifiers.length; j < l; j++)
					{
						switch(modifiers.charAt(j))
						{
							case ' ' :
							case '0' :
								padChar = modifiers.charAt(j);
								break;

							case '+' :
								positiveNumberPrefix = '+';
								break;

							case '-' :
								leftJustify = true;
								break;

							case "'" :
								if(j + 1 < l)
								{
									padChar = modifiers.charAt(j + 1);
									j++;
								}
								break
						}
					}

					if(!minWidth)
					{
						minWidth = 0;
					}
					else
					{
						minWidth = +minWidth;
					}

					if(!isFinite(minWidth))
					{
						throw new Error('Width must be finite');
					}

					if(!precision)
					{
						precision = (specifier === 'd') ? 0 : 'fFeE'.indexOf(specifier) > -1 ? 6 : undefined;
					}
					else
					{
						precision = +precision;
					}

					if(argIndex && +argIndex === 0)
					{
						throw new Error('Argument number must be greater than zero');
					}

					if(argIndex && +argIndex >= mixed.length)
					{
						throw new Error('Too few arguments');
					}

					value = argIndex ? mixed[+argIndex] : mixed[i++];

					switch(specifier)
					{
						case '%' :
							return '%';

						case 's' :
							return _formatString(value + '', leftJustify, minWidth, precision, padChar);

						case 'c' :
							return _formatString(String.fromCharCode(+value), leftJustify, minWidth, precision, padChar);

						case 'b' :
							return _formatBaseX(value, 2, leftJustify, minWidth, precision, padChar);

						case 'o' :
							return _formatBaseX(value, 8, leftJustify, minWidth, precision, padChar);

						case 'x' :
							return _formatBaseX(value, 16, leftJustify, minWidth, precision, padChar);

						case 'X' :
							return _formatBaseX(value, 16, leftJustify, minWidth, precision, padChar).toUpperCase();

						case 'u' :
							return _formatBaseX(value, 10, leftJustify, minWidth, precision, padChar);

						case 'i' :
						case 'd' :
							number = +value || 0;
							number = Math.round(number - number % 1);
							prefix = number < 0 ? '-' : positiveNumberPrefix;
							value = prefix + _pad(String(Math.abs(number)), precision, '0', false);

							if(leftJustify && padChar === '0')
							{
								padChar = ' ';
							}

							return justify(value, prefix, leftJustify, minWidth, padChar);

						case 'e' :
						case 'E' :
						case 'f' :
						case 'F' :
						case 'g' :
						case 'G' :
							number = +value;
							prefix = number < 0 ? '-' : positiveNumberPrefix;
							method = ['toExponential', 'toFixed', 'toPrecision']['efg'.indexOf(specifier.toLowerCase())];
							textTransform = ['toString', 'toUpperCase']['eEfFgG'.indexOf(specifier) % 2];
							value = prefix + Math.abs(number)[method](precision);
							return justify(value, prefix, leftJustify, minWidth, padChar)[textTransform]();

						default :
							return '';
					}
				};

				try
				{
					return format.replace(regex, doFormat);
				}
				catch(e)
				{
					return false;
				}
			},
			exists_value_in_object: (data) => {
				if(!data)
				{
					return data;
				}

				return Object.keys(data).filter((k) => !!data[k]).reduce((acc, val) => Object.assign(acc, { [val]: data[val] }), {});
			},
			number_format: (number, digit = 0) => {
				return Number(number).toLocaleString(undefined, {
					maximumFractionDigits: digit
				});
			},
			time_format: (number) => {
				const hours = String(Math.floor(number / 3600)).padStart(2, '0');
				const minutes = String(Math.floor((number % 3600) / 60)).padStart(2, '0');
				const seconds = String(Math.ceil((number % 3600) % 60)).padStart(2, '0');
				return hours + ':' + minutes + ':' + seconds;
			},
			form_data: (data) => {
				const form = new FormData();

				Object.keys(data).forEach((key) => {
					let values = data[key] || '';

					if(typeof(data[key]) === 'boolean')
					{
						values = data[key] === true ? 'Y' : 'N';
					}

					if(Array.isArray(values) === true)
					{
						if(['uploadFile', 'arrangementImage', 'viewImage'].indexOf(key) !== -1)
						{
							values.forEach((value) => form.append(key, value));
						}
						else
						{
							form.append(key, JSON.stringify(values));
						}
					}
					else
					{
						form.append(key, values);
					}
				});

				return form;
			},
			route_update: (args = {}) => {
				const queries = Object.assign({}, app.$route.query, args);
				app.$router.push({
					name: app.$route.name,
					params: app.$route.params,
					query: queries
				});
			},
			route_popup: (name, params, query, width, height) => {
				const resolve = app.$router.resolve({ name, params, query });
				let options = null;
				if(width && height)
				{
					options = 'width=' + width + ', height=' + height + ', menubar=no, status=no, toolbar=no';
				}

				window.open(resolve.href, '_blank', options);
			},
			external_popup: (url, width, height) => {
				let options = null;
				if(width && height)
				{
					options = 'width=' + width + ', height=' + height + ', menubar=no, status=no, toolbar=no';
				}

				window.open(url, '_blank', options);
			},
			uuid: () => {
				return uuidv4();
			},
			user_auth: (page, role) => {
				const auth = app.$store.state.auth.data.user.auth && app.$store.state.auth.data.user.auth[page];
				if(!auth || !auth[role])
				{
					return false;
				}

				return auth[role];
			},
			file_size: (size, digit = 0) => {
				const byte = 1024;
				const floor = Math.pow(10, digit);
				const units = ['Byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

				let result = size;
				for(let i = 0, multiply = byte; i >= 0; i++, multiply *= byte)
				{
					const calculate = size / multiply;
					if(calculate >= 1)
					{
						result = calculate;
						continue;
					}

					return (Math.floor(result * floor) / floor) + units[i];
				}
			},
			read_base64_from_file: (file) => {
				return new Promise((resolve, reject) => {
					const reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onload = (e) => {
						resolve(e.target.result);
					};
				});
			},
			read_video_duration: (file) => {
				return new Promise((resolve, reject) => {
					const video = document.createElement('video');
					video.preload = 'metadata';
					video.src = URL.createObjectURL(file);
					video.onloadedmetadata = () => {
						window.URL.revokeObjectURL(video.src);
						resolve(video.duration);
					};
				});
			}
		};
	}
};
