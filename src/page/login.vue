<template>
  	<div class="login_page fillcontain">
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer" v-show="showLogin">
		  		<div class="manage_tip">
		  			<p>广告投放-后台管理系统</p>
		  		</div>
		    	<el-form :model="formUser" :rules="rules" ref="formUser">
					<el-form-item prop="userPhone">
						<el-input v-model="formUser.userPhone" placeholder="电话"><span>dsfsf</span></el-input>
					</el-form-item>
					<el-form-item prop="userPassword">
						<el-input type="password" placeholder="密码" v-model="formUser.userPassword"></el-input>
					</el-form-item>
					<el-form-item prop="userType">
						<span>入口</span>
						<el-radio class="radio" v-model="formUser.userType" label="2">商家</el-radio>
						<el-radio class="radio" v-model="formUser.userType" label="4">管理员</el-radio>
					</el-form-item>
					<el-form-item>
				    	<el-button type="primary" @click="formLogin('formUser')" class="submit_btn">登录</el-button>
				  	</el-form-item>
				</el-form>
				<p class="tip">温馨提示：</p>
				<p class="tip">未登录过的新用户，自动注册</p>
				<p class="tip">注册过的用户可凭账号密码登录</p>
	  		</section>
	  	</transition><img src="/static/ocean.jpg" alt="" style="width: 100%;height: 100%">
  	</div>

</template>

<script>
	import {login, getAdminInfo} from '@/api/getData'
	import {mapActions, mapState} from 'vuex'

	export default {
	    data(){
			return {
				loginForm: {
					username: '',
					password: '',
				},
				rules: {
					userPhone: [
			            { required: true, message: '请输入电话', trigger: 'blur' },
			        ],
					userPassword: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
					userType: [
			            { required: true, message: '请选择登陆入口', trigger: 'blur' },
			        ],
				},
				showLogin: false,
				user: {},
				formUser: {
					userPhone: null,
					userPassword: '',
					userType: null
				}
			}
		},
		mounted(){
			this.showLogin = true;
    		if (this.$cookies.isKey("cookiesUser")) {
    			this.user = this.$cookies.get("cookiesUser")
    			console.log("cookiesUser",this.user)
    			this.loginNow()
    		}
		},
		computed: {
			...mapState(['adminInfo']),
			...mapState(['vueUser']),
		},
		methods: {
			...mapActions(['getAdminData']),
			...mapActions(['actionSaveUser']),

			formLogin(formUser) {
				this.$refs[formUser].validate((valid) => {
		          if (valid) {
					this.user = this.formUser;
		            console.log("通过账密登录:",this.user)
					this.loginNow()
		          } else {
		            return false;
		          }
		        });
			},
			async loginNow() {
				console.log("loginNow")
				const res = await login(this.user)
				// console.log("res",res)
				if (!res.data.code && res.data) {
					// 取到了新值，更新vuex和cookies
					console.log("res", res)
					if (this.$cookies.isKey("cookiesUser")) {
						this.$message({
	                        type: 'success',
	                        message: '检测到您之前登录过，将自动登录'
	                    });
					} else{
						this.$message({
	                        type: 'success',
	                        message: '登录成功'
	                    });
					}
						
					this.$cookies.set("cookiesUser", res.data, "1d")
					this.actionSaveUser(res.data)
					this.$router.push('manage')
				} else if (res.data.code == 101){
					this.$notify.error({
						title: '错误',
						message: '请输入正确的电话密码',
						offset: 100
					});
				} else if (res.data.code == 100){
					this.$notify.error({
						title: '请重试',
						message: '登录已失效，请通过账密登录',
						offset: 100
					});
				}
			}
			// async submitForm(formName) {
			// 	this.$refs[formName].validate(async (valid) => {
			// 		if (valid) {
			// 			const res = await login({user_name: this.loginForm.username, password: this.loginForm.password})
			// 			if (res.status == 1) {
			// 				this.$message({
		 //                        type: 'success',
		 //                        message: '登录成功'
		 //                    });
			// 				this.$router.push('manage')
			// 			}else{
			// 				this.$message({
		 //                        type: 'error',
		 //                        message: res.message
		 //                    });
			// 			}
			// 		} else {
			// 			this.$notify.error({
			// 				title: '错误',
			// 				message: '请输入正确的用户名密码',
			// 				offset: 100
			// 			});
			// 			return false;
			// 		}
			// 	});
			// },
		},
		watch: {
			vueUser: function(newValue){
				console.log("vuexUser也更新了")
			}
			// adminInfo: function (newValue){
			// 	if (newValue.id) {
			// 		this.$message({
   //                      type: 'success',
   //                      message: '检测到您之前登录过，将自动登录'
   //                  });
   //                  console.log(this.adminInfo)
   //                  console.log(this.loggedUser)
   //                  let newuser={
   //                  	userId: 1,
   //                  	userName: 'admin',
   //                  	status: 1
   //                  }
   //                  this.actionSaveloggedUser(newuser)
			// 		this.$router.push('manage')
			// 	}
			// },
			// loggedUser: function (newValue){
			// 	console.log("loggedUser发生变化，如下")
			// 	console.log(this.loggedUser)
			// }
		}
	}
</script>

<style lang="less" scoped>
	@import '../style/mixin';
	.login_page{
		background-color: #324057;
	}
	.manage_tip{
		position: absolute;
		width: 100%;
		top: -100px;
		left: 0;
		p{
			font-size: 34px;
			color: #fff;
		}
	}
	.form_contianer{
		.wh(320px, 210px);
		.ctp(320px, 210px);
		padding: 25px;
		border-radius: 5px;
		text-align: center;
		background-color: #fff;
		.submit_btn{
			width: 100%;
			font-size: 16px;
		}
	}
	.tip{
		font-size: 12px;
		color: red;
	}
	.form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
</style>









