<template>
    <div>
        <head-top></head-top>
		<section class="data_section">
			<header class="section_title">数据统计</header>
			<el-row :gutter="20" style="margin-bottom: 10px;">
                <el-col :span="4"><div class="data_list today_head"><span class="data_num head">当日数据：</span></div></el-col>
				<el-col :span="4"><div class="data_list"><span class="data_num">{{adCountToday}}</span> 投放广告</div></el-col>
				<el-col :span="4"><div class="data_list"><span class="data_num">{{userCountToday}}</span> 新增用户</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{shopCountToday}}</span> 新增商店</div></el-col>
			</el-row>
            <el-row :gutter="20">
                <el-col :span="4"><div class="data_list all_head"><span class="data_num head">总数据：</span></div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{adCount}}</span> 广告</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{userCount}}</span> 注册用户</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{shopCount}}</span> 注册商店</div></el-col>
            </el-row>
		</section>
		<tendency :sevenDate='sevenDate' :sevenDay='sevenDay'></tendency>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
	import tendency from '../components/tendency' 
	import dtime from 'time-formater'
	import {userCount, orderCount, getUserCount, getOrderCount, adminDayCount, adminCount,
        userCountToday, shopCount, shopCountToday, adCount, adCountToday, getSevenDayCount} from '@/api/getData'
    export default {
    	data(){
    		return {
    			// userCount: null,
    			orderCount: null,
                adminCount: null,
                allUserCount: null,
                allOrderCount: null,
                allAdminCount: null,
    			sevenDay: [],
    			sevenDate: [[],[],[]],

                test: {},

                userCountToday: null,
                shopCountToday: null,
                adCountToday: null,
                userCount: null,
                shopCount: null,
                adCount: null,
    		}
    	},
    	components: {
    		headTop,
    		tendency,
    	},
    	mounted(){
    		for (let i = 6; i > -1; i--) {
    			const date = dtime(new Date().getTime() - 86400000*i).format('YYYY-MM-DD')
    			this.sevenDay.push(date)
    		}
            this.initData();
    		 // this.getSevenData();

    	},
        computed: {

        },
    	methods: {

    		async initData(){
    			const today = dtime().format('YYYY-MM-DD')
    			Promise.all([userCount(), shopCount(), adCount(), userCountToday(), shopCountToday(), adCountToday(), getSevenDayCount()])

// [userCount(today), orderCount(today), adminDayCount(today), getUserCount(), getOrderCount(), adminCount()]

    			.then(res => {
                    console.log("res:",res);
                    this.userCount = res[0].data;
                    this.shopCount = res[1].data;
                    this.adCount = res[2].data;
                    this.userCountToday = res[3].data;
                    this.shopCountToday = res[4].data;
                    this.adCountToday = res[5].data;
                    let resArr = [[],[],[]]
                    resArr[0] = res[6].data.userCount.reverse()
                    resArr[1] = res[6].data.adCount.reverse()
                    resArr[2] = res[6].data.shopCount.reverse()

                    // resArr[0] = [15,12,31,27,9,4,21]
                    // resArr[1] = [11,12,5,21,30,8,23]
                    // resArr[2] = [20,35,16,33,19,6,12]
                    // this.userCount = 179;
                    // this.shopCount = 124;
                    // this.adCount = 311;
                    // this.userCountToday = 21;
                    // this.shopCountToday = 12;
                    // this.adCountToday = 23;

                    this.sevenDate = resArr;

    				// this.userCount = res[0].count;
    				// this.orderCount = res[1].count;
        //             this.adminCount = res[2].count;
        //             this.allUserCount = res[3].count;
        //             this.allOrderCount = res[4].count;
        //             this.allAdminCount = res[5].count;

                    


// this.$axios({
//         method: 'GET',
//         url: 'http://localhost:8081/userCountToday'
//     }).then((response) =>{          //这里使用了ES6的语法
//         console.log("userCount:", response)       //请求成功返回的数据
//     }).catch((error) => {
//         console.log(error)       //请求失败返回的数据
//     })

    			}).catch(err => {
    				console.log(err)
    			})
    		},
    		async getSevenData(){
    			const apiArr = [[],[],[]];
    			this.sevenDay.forEach(item => {
    				apiArr[0].push(userCount(item))
    				apiArr[1].push(orderCount(item))
                    apiArr[2].push(adminDayCount(item))
    			})
    			const promiseArr = [...apiArr[0], ...apiArr[1], ...apiArr[2]]
    			Promise.all(promiseArr).then(res => {
    				const resArr = [[],[],[]];
					res.forEach((item, index) => {
						if (item.status == 1) {
							resArr[Math.floor(index/7)].push(item.count)
						}
					})
					this.sevenDate = resArr;
                    console.log("sevenDate", resArr)
    			}).catch(err => {
    				console.log(err)
    			})
    		}
    	}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.data_section{
		padding: 20px;
		margin-bottom: 40px;
		.section_title{
			text-align: center;
			font-size: 30px;
			margin-bottom: 20px;
		}
		.data_list{
			text-align: center;
			font-size: 14px;
			color: #666;
            border-radius: 6px;
            background: #E5E9F2;
            .data_num{
                color: #333;
                font-size: 26px;

            }
            .head{
                border-radius: 6px;
                font-size: 22px;
                padding: 4px 0;
                color: #fff;
                display: inline-block;
            }
        }
        .today_head{
            background: #FF9800;
        }
        .all_head{
            background: #20A0FF;
        }
	}
    .wan{
        .sc(16px, #333)
    }
</style>
