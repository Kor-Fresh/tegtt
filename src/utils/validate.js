import { Validator } from 'vee-validate';
import { FETCH_GET } from '@/utils/axios/fetch';
import { app } from '@/main';

const rules = {
	not_exists_user: {
		validate: (value) => {
			return FETCH_GET('/v1/user/user-id/duplicate', { userId: value }, (response) => {
				if(response.data.totalCount > 0)
				{
					return {
						valid: false
					};
				}

				return {
					valid: true
				};
			});
		}
	},
	exists_user: {
		validate: (value) => {
			return FETCH_GET('/v1/user/user-id/duplicate', { userId: value }, (response) => {
				if(response.data.totalCount === 0)
				{
					return {
						valid: false
					};
				}

				return {
					valid: true
				};
			});
		}
	},
	not_exists_area: {
		validate: (value, args) => {
			return FETCH_GET('/super/construction/' + args[0] + '/area', { searchType: 'ne', searchText: value }, (response) => {
				if(response.data.page.totalElements > 0)
				{
					return {
						valid: false
					};
				}

				return {
					valid: true
				};
			});
		}
	},
	exists_area: {
		validate: (value, args) => {
			return FETCH_GET('/super/construction/' + args[0] + '/area', { searchType: 'ne', searchText: value }, (response) => {
				if(response.data.page.totalElements === 0)
				{
					return {
						valid: false
					};
				}

				return {
					valid: true
				};
			});
		}
	},
	not_exists_household: {
		validate: (value, args) => {
			return FETCH_GET('/super/construction/' + args[0] + '/household', { searchType: 'de', searchText: value }, (response) => {
				if(response.data.page.totalElements > 0)
				{
					return {
						valid: false
					};
				}

				return {
					valid: true
				};
			});
		}
	},
	exists_household: {
		validate: (value, args) => {
			return FETCH_GET('/super/construction/' + args[0] + '/household', { searchType: 'de', searchText: value }, (response) => {
				if(response.data.page.totalElements === 0)
				{
					return {
						valid: false
					};
				}

				return {
					valid: true
				};
			});
		}
	},
	not_exists_field: {
		validate: (value) => {
			return FETCH_GET('/super/statics/field-name/duplicate', { fieldName: value }, (response) => {
				if(response.data.totalCount > 0)
				{
					return {
						valid: false
					};
				}

				return {
					valid: true
				};
			});
		}
	},
	exists_field: {
		validate: (value) => {
			return FETCH_GET('/super/statics/field-name/duplicate', { fieldName: value }, (response) => {
				if(response.data.totalCount === 0)
				{
					return {
						valid: false
					};
				}

				return {
					valid: true
				};
			});
		}
	},
	not_exists_room: {
		validate: async (value) => {
			const query =
				"SELECT " +
				"COUNT(1) AS total_count " +
				"FROM " +
				"STATIC_ROOM " +
				"WHERE " +
				"STATIC_ROOM.name = '" + value + "'";

			const transaction = await app.db.transactionPromise(query);
			if(transaction.rows.length > 0 && transaction.rows[0].total_count > 0)
			{
				return {
					valid: false
				};
			}

			return {
				valid: true
			};
		}
	},
	exists_room: {
		validate: async (value) => {
			const query =
				"SELECT " +
				"COUNT(1) AS total_count " +
				"FROM " +
				"STATIC_ROOM " +
				"WHERE " +
				"STATIC_ROOM.name = '" + value + "'";

			const transaction = await app.db.transactionPromise(query);
			if(transaction.rows.length === 0 || transaction.rows[0].total_count === 0)
			{
				return {
					valid: false
				};
			}

			return {
				valid: true
			};
		}
	},
	not_exists_defect_location: {
		validate: async (value) => {
			const query =
				"SELECT " +
				"COUNT(1) AS total_count " +
				"FROM " +
				"STATIC_DEFECT_LOCATION " +
				"WHERE " +
				"STATIC_DEFECT_LOCATION.name = '" + value + "'";

			const transaction = await app.db.transactionPromise(query);
			if(transaction.rows.length > 0 && transaction.rows[0].total_count > 0)
			{
				return {
					valid: false
				};
			}

			return {
				valid: true
			};
		}
	},
	exists_defect_location: {
		validate: async (value) => {
			const query =
				"SELECT " +
				"COUNT(1) AS total_count " +
				"FROM " +
				"STATIC_DEFECT_LOCATION " +
				"WHERE " +
				"STATIC_DEFECT_LOCATION.name = '" + value + "'";

			const transaction = await app.db.transactionPromise(query);
			if(transaction.rows.length === 0 || transaction.rows[0].total_count === 0)
			{
				return {
					valid: false
				};
			}

			return {
				valid: true
			};
		}
	},
	not_exists_construction_category: {
		validate: async (value) => {
			const query =
				"SELECT " +
				"COUNT(1) AS total_count " +
				"FROM " +
				"STATIC_CONSTRUCTION_CATEGORY " +
				"WHERE " +
				"STATIC_CONSTRUCTION_CATEGORY.name = '" + value + "'";
			
			const transaction = await app.db.transactionPromise(query);
			if(transaction.rows.length > 0 && transaction.rows[0].total_count > 0)
			{
				return {
					valid: false
				};
			}
			
			return {
				valid: true
			};
		}
	},
	exists_construction_category: {
		validate: async (value) => {
			const query =
				"SELECT " +
				"COUNT(1) AS total_count " +
				"FROM " +
				"STATIC_CONSTRUCTION_CATEGORY " +
				"WHERE " +
				"STATIC_CONSTRUCTION_CATEGORY.name = '" + value + "'";
			
			const transaction = await app.db.transactionPromise(query);
			if(transaction.rows.length === 0 || transaction.rows[0].total_count === 0)
			{
				return {
					valid: false
				};
			}
			
			return {
				valid: true
			};
		}
	},
	not_exists_construction_type: {
		validate: async (value) => {
			const query =
				"SELECT " +
				"COUNT(1) AS total_count " +
				"FROM " +
				"STATIC_CONSTRUCTION_TYPE " +
				"WHERE " +
				"STATIC_CONSTRUCTION_TYPE.name = '" + value + "'";

			const transaction = await app.db.transactionPromise(query);
			if(transaction.rows.length > 0 && transaction.rows[0].total_count > 0)
			{
				return {
					valid: false
				};
			}

			return {
				valid: true
			};
		}
	},
	exists_construction_type: {
		validate: async (value) => {
			const query =
				"SELECT " +
				"COUNT(1) AS total_count " +
				"FROM " +
				"STATIC_CONSTRUCTION_TYPE " +
				"WHERE " +
				"STATIC_CONSTRUCTION_TYPE.name = '" + value + "'";

			const transaction = await app.db.transactionPromise(query);
			if(transaction.rows.length === 0 || transaction.rows[0].total_count === 0)
			{
				return {
					valid: false
				};
			}

			return {
				valid: true
			};
		}
	},
	not_exists_construction_detail_type: {
		validate: async (value, args) => {
			if(args[0])
			{
				const query =
					"SELECT " +
					"COUNT(1) AS total_count " +
					"FROM " +
					"STATIC_CONSTRUCTION_DETAIL_TYPE " +
					"WHERE " +
					"STATIC_CONSTRUCTION_DETAIL_TYPE.constructionTypeIdx = '" + args[0] + "' " +
					"AND STATIC_CONSTRUCTION_DETAIL_TYPE.name = '" + value + "'";

				const transaction = await app.db.transactionPromise(query);
				if(transaction.rows.length > 0 && transaction.rows[0].total_count > 0)
				{
					return {
						valid: false
					};
				}
			}

			return {
				valid: true
			};
		}
	},
	exists_construction_detail_type: {
		validate: async (value, args) => {
			if(args[0])
			{
				const query =
					"SELECT " +
					"COUNT(1) AS total_count " +
					"FROM " +
					"STATIC_CONSTRUCTION_DETAIL_TYPE " +
					"WHERE " +
					"STATIC_CONSTRUCTION_DETAIL_TYPE.constructionTypeIdx = '" + args[0] + "' " +
					"AND STATIC_CONSTRUCTION_DETAIL_TYPE.name = '" + value + "'";

				const transaction = await app.db.transactionPromise(query);
				if(transaction.rows.length === 0 || transaction.rows[0].total_count === 0)
				{
					return {
						valid: false
					};
				}
			}

			return {
				valid: true
			};
		}
	},
	not_exists_defect_type: {
		validate: async (value, args) => {
			if(args[0])
			{
				const query =
					"SELECT " +
					"COUNT(1) AS total_count " +
					"FROM " +
					"STATIC_DEFECT_TYPE " +
					"WHERE " +
					"STATIC_DEFECT_TYPE.constructionDetailTypeIdx = '" + args[0] + "' " +
					"AND STATIC_DEFECT_TYPE.name = '" + value + "'";

				const transaction = await app.db.transactionPromise(query);
				if(transaction.rows.length > 0 && transaction.rows[0].total_count > 0)
				{
					return {
						valid: false
					};
				}
			}

			return {
				valid: true
			};
		}
	},
	exists_defect_type: {
		validate: async (value, args) => {
			if(args[0])
			{
				const query =
					"SELECT " +
					"COUNT(1) AS total_count " +
					"FROM " +
					"STATIC_DEFECT_TYPE " +
					"WHERE " +
					"STATIC_DEFECT_TYPE.constructionDetailTypeIdx = '" + args[0] + "' " +
					"AND STATIC_DEFECT_TYPE.name = '" + value + "'";

				const transaction = await app.db.transactionPromise(query);
				if(transaction.rows.length === 0 || transaction.rows[0].total_count === 0)
				{
					return {
						valid: false
					};
				}
			}

			return {
				valid: true
			};
		}
	},
	username: {
		validate: (value) => {
			if(!value.match(/^[a-z]{1}[a-z0-9]{3,15}$/))
			{
				return {
					valid: false
				};
			}

			return {
				valid: true
			};
		}
	},
	password_match: {
		validate: (value, args) => {
			if(value !== args[0])
			{
				return {
					valid: false
				};
			}

			return {
				valid: true
			};
		}
	},
	phone: {
		validate: (value) => {
			if(!value.match(/^0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]|70)\d{3,4}\d{4}$/))
			{
				return {
					valid: false
				};
			}

			return {
				valid: true
			};
		}
	},
	fax: {
		validate: (value) => {
			if(!value.match(/^0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]|70)\d{3,4}\d{4}$/))
			{
				return {
					valid: false
				};
			}

			return {
				valid: true
			};
		}
	},
	cellular: {
		validate: (value) => {
			if(!value.match(/^01[016789]\d{3,4}\d{4}$/))
			{
				return {
					valid: false
				};
			}

			return {
				valid: true
			};
		}
	},
	vehicle_number: {
		validate: (value) => {
			if(!value.match(/^$|^[0-9]{2,3}[가-힣]{1}[0-9]{4}$|^[가-힣]{2}[0-9]{2}[가-힣]{1}[0-9]{4}$/))
			{
				return {
					valid: false
				};
			}
			
			return {
				valid: true
			};
		}
	},
	business_number: {
		validate: (value) => {
			if(!value.match(/^\d{10}$/g))
			{
				return {
					valid: false
				};
			}

			const magic = [1, 3, 7, 1, 3, 7, 1, 3, 5, 0];
			const total = magic.reduce((acc, val, i) => acc + (val * Number(value[i])), 0);

			const validation = (10 - ((total + Math.floor(magic[8] * Number(value[8]) / 10)) % 10)) === Number(value[9]);
			if(!validation)
			{
				return {
					valid: false
				};
			}

			return {
				valid: true
			};
		}
	},
	date: {
		validate: (values) => {
			let valid = true;
			if(!(values instanceof Array))
			{
				if(values.indexOf(' ~ ') !== -1)
				{
					values = values.split(' ~ ');
				}
			}

			values = values instanceof Array ? values : [values];
			values.forEach((value) => {
				if(!value.match(/^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/))
				{
					valid = false;
				}
			});

			return {
				valid: valid
			};
		}
	},
	time: {
		validate: (values) => {
			let valid = true;
			if(!(values instanceof Array))
			{
				if(values.indexOf(' ~ ') !== -1)
				{
					values = values.split(' ~ ');
				}
			}

			values = values instanceof Array ? values : [values];
			values.forEach((value) => {
				if(!value.match(/^(0[0-9]|1[0-9]|2[0-3]):(0[0-9]|[12345][0-9]):(0[0-9]|[12345][0-9])$/))
				{
					valid = false;
				}
			});

			return {
				valid: valid
			};
		}
	},
	date_time: {
		validate: (values) => {
			let valid = true;
			if(!(values instanceof Array))
			{
				if(values.indexOf(' ~ ') !== -1)
				{
					values = values.split(' ~ ');
				}
			}

			values = values instanceof Array ? values : [values];
			values.forEach((value) => {
				if(!value.match(/^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1]) (0[0-9]|1[0-9]|2[0-3]):(0[0-9]|[12345][0-9]):(0[0-9]|[12345][0-9])$/))
				{
					valid = false;
				}
			});

			return {
				valid: valid
			};
		}
	},
	duplicated: {
		validate: (value, args) => {
			if(args)
			{
				if(app.common.in_array(args, value) === true)
				{
					return {
						valid: false
					};
				}
			}

			return {
				valid: true
			};
		}
	},
	file_extension: {
		validate: (files, args) => {
			let valid = true;
			if(args.length > 0)
			{
				files = files instanceof File ? [files]: files;
				files.forEach((file) => {
					if(app.common.in_array(args, file.name.split('.').slice(-1)) === false)
					{
						valid = false;
					}
				});
			}

			return {
				valid: valid
			};
		}
	},
	file_size: {
		validate: (files, args) => {
			let valid = true;
			files = files instanceof File ? [files]: files;
			files.forEach((file) => {
				if(file.size > args)
				{
					valid = false;
				}
			});

			return {
				valid: valid
			};
		}
	},
	array_min_size: {
		validate: (values, args) => {
			if(values.length < args)
			{
				return {
					valid: false
				};
			}
			
			return {
				valid: true
			};
		}
	},
	array_max_size: {
		validate: (values, args) => {
			if(values.length > args)
			{
				return {
					valid: false
				};
			}

			return {
				valid: true
			};
		}
	},
	array_item_cellular: {
		validate: (values) => {
			let valid = true;
			values.forEach((value) => {
				if(!value.match(/^01[016789]\d{3,4}\d{4}$/))
				{
					valid = false;
				}
			});
			
			return {
				valid: valid
			};
		}
	},
	array_item_size: {
		validate: (values, args) => {
			let valid = true;
			values.forEach((value) => {
				if(value.length > args)
				{
					valid = false;
				}
			});

			return {
				valid: valid
			};
		}
	}
};

export default (() => {
	Object.keys(rules).forEach((rule) => {
		Validator.extend(rule, rules[rule]);
	});
});
