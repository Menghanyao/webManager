import Vue from 'vue'
import Vuex from 'vuex'
import {getAdminInfo} from '@/api/getData'

Vue.use(Vuex)

const state = {
	adminInfo: {
		avatar: 'default.jpg'
	},
	vueUser: {
		userId: null,
		userName: '',
		userPhone: null,
		userPassword: '',
		userToken: '',
		userGender: '',
		userAge: null,
		userCity: '',
		isStudent: null,
		userLevel: null,
		usetType: null,
		userStatus: 1,
		userCash: null,
		gmtCreate: null,
		gmtModified: null
	},
}

const mutations = {
	saveAdminInfo(state, adminInfo){
		state.adminInfo = adminInfo;
	},
	savevueUser(state, loggedUser){
		state.vueUser = loggedUser;
	}
}

const actions = {
	async getAdminData({commit}){
		try{
			const res = await getAdminInfo()
			if (res.status == 1) {
				commit('saveAdminInfo', res.data);
			}else{
				throw new Error(res.type)
			}
		}catch(err){
			// console.log(err.message)
		}
	},
	actionSaveUser({commit}, user){
		console.log("在vuex中执行更新user")
		commit('savevueUser', user)
	}
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
})
