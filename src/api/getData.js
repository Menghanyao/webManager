import fetch from '@/config/fetch'
import myFetch from '@/config/myFetch'
/**
/**
 * 登陆
 */

// export const login = data => fetch('/admin/login', data, 'POST');

/**
 * 退出
 */

export const signout = () => fetch('/admin/signout');

/**
 * 获取用户信息
 */

export const getAdminInfo = () => fetch('/admin/info');

/**
 * api请求量
 */

export const apiCount = date => fetch('/statis/api/' + date + '/count');

/**
 * 所有api请求量
 */

export const apiAllCount = () => fetch('/statis/api/count');


/**
 * 所有api请求信息
 */

export const apiAllRecord = () => fetch('/statis/api/all');

/**
 * 用户注册量
 */

// export const userCount = date => fetch('/statis/user/' + date + '/count');

/**
 * 某一天订单数量
 */

export const orderCount = date => fetch('/statis/order/' + date + '/count');


/**
 * 某一天管理员注册量
 */

export const adminDayCount = date => fetch('/statis/admin/' + date + '/count');

/**
 * 管理员列表
 */

// export const adminList = data => fetch('/admin/all', data);

/**
 * 管理员数量
 */

export const adminCount = () => fetch('/admin/count');

/**
 * 获取定位城市
 */

export const cityGuess = () => fetch('/v1/cities', {
	type: 'guess'
});

/**
 * 添加商铺
 */

export const addShop = data => fetch('/shopping/addShop', data, 'POST');

/**
 * 获取搜索地址
 */

export const searchplace = (cityid, value) => fetch('/v1/pois', {
	type: 'search',
	city_id: cityid,
	keyword: value
});

/**
 * 获取当前店铺食品种类
 */

export const getCategory = restaurant_id => fetch('/shopping/getcategory/' + restaurant_id);

/**
 * 添加食品种类
 */

export const addCategory = data => fetch('/shopping/addcategory', data, 'POST');


/**
 * 添加食品
 */

export const addFood = data => fetch('/shopping/addfood', data, 'POST');


/**
 * category 种类列表
 */

export const foodCategory = (latitude, longitude) => fetch('/shopping/v2/restaurant/category');

/**
 * 获取餐馆列表
 */

export const getResturants = data => fetch('/shopping/restaurants', data);

/**
 * 获取餐馆详细信息
 */

export const getResturantDetail = restaurant_id => fetch('/shopping/restaurant/' + restaurant_id);

/**
 * 获取餐馆数量
 */

export const getResturantsCount = () => fetch('/shopping/restaurants/count');

/**
 * 更新餐馆信息
 */

export const updateResturant = data => fetch('/shopping/updateshop', data, 'POST');

/**
 * 删除餐馆
 */

export const deleteResturant = restaurant_id => fetch('/shopping/restaurant/' + restaurant_id, {}, 'DELETE');

/**
 * 获取食品列表
 */

export const getFoods = data => fetch('/shopping/v2/foods', data);

/**
 * 获取食品数量
 */

export const getFoodsCount = data => fetch('/shopping/v2/foods/count', data);


/**
 * 获取menu列表
 */

export const getMenu = data => fetch('/shopping/v2/menu', data);

/**
 * 获取menu详情
 */

export const getMenuById = category_id => fetch('/shopping/v2/menu/' + category_id);

/**
 * 更新食品信息
 */

export const updateFood = data => fetch('/shopping/v2/updatefood', data, 'POST');

/**
 * 删除食品
 */

export const deleteFood = food_id => fetch('/shopping/v2/food/' + food_id, {}, 'DELETE');

/**
 * 获取用户列表
 */

export const getUserList = data => fetch('/v1/users/list', data);

/**
 * 获取用户数量
 */

export const getUserCount = data => fetch('/v1/users/count', data);

/**
 * 获取订单列表
 */

export const getOrderList = data => fetch('/bos/orders', data);

/**
 * 获取订单数量
 */

export const getOrderCount = data => fetch('/bos/orders/count', data);

/**
 * 获取用户信息
 */

export const getUserInfo = user_id => fetch('/v1/user/' + user_id);

/**
 * 获取地址信息
 */

export const getAddressById = address_id => fetch('/v1/addresse/' + address_id);

/**
 * 获取用户分布信息
 */

export const getUserCity = () => fetch('/v1/user/city/count');

/**
 * 时间戳转时间
 */
export const timestampToTime = timestamp => {
        var date = new Date(timestamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
        var D = date.getDate() + ' '
        var h = date.getHours() + ':'
        var m = date.getMinutes() + ':'
        var s = date.getSeconds()
        return Y+M+D+h+m+s
        // console.log(timestampToTime (1533293827000))
    }

/**
 * 类型数字转名称
 */
export const getUserTypeName = userType => {
        switch(userType) {
        	case 0: return 'root'
        	case 1: return '用户'
        	case 2: return '商家'
        	case 3: return '管理员'
        	case 4: return '审核中'
        	default: break;
        }
}

/**
 * 商店和广告类型 =>文字
 */
export const getShopOrAdTypeName = userType => {
        switch(userType) {
        	case 0: return '餐饮类'
        	case 1: return '衣装类'
        	case 2: return '女性类'
        	case 3: return '儿童类'
        	case 4: return '户外类'
        	case 4: return '宠物类'
        	default: break;
        }
}

// 获取广告总数
// 获取用户总数
// 获取商店总数
export const userCount = () => myFetch('/userCount');
export const shopCount = () => myFetch('/shopCount');
export const adCount = () => myFetch('/adCount');

// 获取当日广告总数
// 获取当日用户总数
// 获取当日商店总数
// 获取7日数据
export const userCountToday = () => myFetch('/userCountToday');
export const shopCountToday = () => myFetch('/shopCountToday');
export const adCountToday = () => myFetch('/adCountToday');
export const getSevenDayCount = () => myFetch('/getSevenDayCount');

//获取用户列表
//获取商店列表
//获取广告列表
//获取管理员列表
export const userList = userDTO => myFetch('/userList', userDTO, 'POST');
export const shopList = shopDTO => myFetch('/shopList', shopDTO, 'POST');
export const adList = adDTO => myFetch('/adList', adDTO, 'POST');
export const adminList = userDTO => myFetch('/adminList', userDTO, 'POST');

//获取违规的列表
export const violateList = noticeDTO => myFetch('/violateList', noticeDTO, 'POST');

//获取给我的消息(违规+系统)
export const myNoticeList = noticeDTO => myFetch('/myNoticeList', noticeDTO, 'POST');

//根据广告Id获取内容（违规-详情）
export const getAdByAdId = adDTO => myFetch('/getAdByAdId', adDTO, 'POST');

// 添加店铺
// 添加广告
export const addShop1 = shopDTO => myFetch('/addShop', shopDTO, 'POST');
export const addAd = adDTO => myFetch('/addAd', adDTO, 'POST');


// 通过管理员审核
// 驳回
// 删除广告
// 封店
export const adminPass = operationDTO => myFetch('/adminPass', operationDTO, 'POST');
export const reject = operationDTO => myFetch('/reject', operationDTO, 'POST');
export const deleteAd = operationDTO => myFetch('/deleteAd', operationDTO, 'POST');
export const forbidShop = operationDTO => myFetch('/forbidShop', operationDTO, 'POST');



// 充值
export const shopSaveMoney = shopDTO => myFetch('/shopSaveMoney', shopDTO, 'POST');

// 上传图片
export const uploadPicture = file => myFetch('/upload', file, 'POST', 'form');

// 注册和登录
export const login = userDTO => myFetch('/login', userDTO, 'POST');