<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
					<el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>

					<!-- v-if="vueUser.userType == 0 || vueUser.userType == 3" -->
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i>数据管理</template>
						<el-menu-item index="userList">用户列表</el-menu-item>
						<el-menu-item index="shopList">商店列表</el-menu-item>
						<el-menu-item index="foodList">广告列表</el-menu-item>
						<!-- <el-menu-item index="orderList">订单列表</el-menu-item> -->
						<el-menu-item index="adminList" v-if="vueUser.userType == 0">管理员列表</el-menu-item>
					</el-submenu>

					<el-submenu index="3"">
						<template slot="title"><i class="el-icon-plus"></i>添加数据</template>
						<el-menu-item index="addShop">添加商铺</el-menu-item>
						<el-menu-item index="addGoods">添加商品</el-menu-item>
					</el-submenu>

					<!-- <el-submenu index="4">
						<template slot="title"><i class="el-icon-star-on"></i>图表</template>
						<el-menu-item index="visitor">用户分布</el-menu-item>
					</el-submenu> -->

					<!-- <el-submenu index="5">
						<template slot="title"><i class="el-icon-edit"></i>编辑</template>
						<el-menu-item index="vueEdit">文本编辑</el-menu-item>
					</el-submenu> -->

					<!-- <el-submenu index="6">
						<template slot="title"><i class="el-icon-setting"></i>设置</template>
						<el-menu-item index="adminSet">管理员设置</el-menu-item>
					</el-submenu> -->

					<el-submenu index="7">
						<template slot="title"><i class="el-icon-warning"></i>说明</template>
						<el-menu-item index="explain">说明</el-menu-item>
					</el-submenu>

					<el-submenu index="8">
						<template slot="title"><i class="el-icon-warning"></i>违规处理</template>
						<el-menu-item index="violate">处理队列</el-menu-item>
					</el-submenu>
						
					<el-submenu index="9">
						<template slot="title"><i class="el-icon-warning"></i>我的</template>
						<el-menu-item index="myAdList">我的投放</el-menu-item>
						<el-menu-item index="myNotice">系统消息</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
	import {mapActions, mapState} from 'vuex'
    export default {
		computed: {
			...mapState(['vueUser']),
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
	.manage_page{
		
	}
</style>
