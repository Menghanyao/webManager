<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                highlight-current-row
                stripe
                style="width: 100%">
                <el-table-column
                  type="index"
                  width="80">
                </el-table-column>
                <el-table-column
                  property="userId"
                  label="ID"
                  width="80">
                </el-table-column>
                <el-table-column
                  property="gmtCreate"
                  label="注册日期"
                  width="170">
                </el-table-column>
                <el-table-column
                  property="userPhone"
                  label="电话"
                  width="150">
                </el-table-column>
                <el-table-column
                  property="userName"
                  label="用户姓名"
                  width="150">
                </el-table-column>
                <el-table-column
                  property="userGender"
                  label="性别"
                  width="100">
                </el-table-column>
                <el-table-column
                  property="userAge"
                  label="年龄"
                  width="100">
                </el-table-column>
                <el-table-column
                  property="userCity"
                  label="城市"
                  width="120">
                </el-table-column>
                <el-table-column
                  property="isStudent"
                  label="学生"
                  width="110">
                </el-table-column>
                <el-table-column
                  property="userTypeName"
                  label="用户类型"
                  width="110">
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[5, 10, 15, 20]"
                  :page-size="limit"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    // import {getUserList, getUserCount} from '@/api/getData'
    import {timestampToTime, userList, userCount, getUserTypeName} from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [{
                  registe_time: '2016-05-02',
                  username: '王小虎',
                  city: '上海市普陀区金沙江路 1518 弄'
                }, {
                  registe_time: '2016-05-04',
                  username: '王小虎',
                  city: '上海市普陀区金沙江路 1517 弄'
                }, {
                  registe_time: '2016-05-01',
                  username: '王小虎',
                  city: '上海市普陀区金沙江路 1519 弄'
                }, {
                  registe_time: '2016-05-03',
                  username: '王小虎',
                  city: '上海市普陀区金沙江路 1516 弄'
                }],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                user: {}
            }
        },
    	components: {
    		headTop,
    	},
        created(){
            this.user = this.$cookies.get("cookiesUser")
            this.initData();
        },
        methods: {
            async initData(){
                try{
                    const countData = await userCount();
                    console.log("userCount:", countData)
                    this.count = countData.data;
                    // if (countData.status == 1) {
                    //     this.count = countData.count;
                    // }else{
                    //     throw new Error('获取数据失败');
                    // }
                    this.getUsers();
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.limit = val
                this.getUsers()
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                // this.offset = (val - 1)*this.limit;
                this.getUsers()
            },
            async getUsers(){
                // const userList = await getUserList({offset: this.offset, limit: this.limit});
                const userLists = await userList({userId: this.user.userId, current: this.currentPage, size: this.limit});
                console.log("userList:", userLists);
                this.tableData = [];
                userLists.data.data.forEach(item => {
                    const tableData = {};
                    // tableData.username = item.username;
                    // tableData.registe_time = item.registe_time;
                    // tableData.city = item.city;

                    tableData.gmtCreate = timestampToTime(item.gmtCreate);
                    tableData.userId = item.userId;
                    tableData.userPhone = item.userPhone;
                    tableData.userName = item.userName;
                    tableData.userGender = item.userGender;
                    tableData.userAge = item.userAge;
                    tableData.userCity = item.userCity;
                    tableData.isStudent = item.isStudent ? '是' : '否';
                    tableData.userType = item.userType;
                    tableData.userTypeName = getUserTypeName(item.userType);

                    this.tableData.push(tableData);
                })
            }
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>
