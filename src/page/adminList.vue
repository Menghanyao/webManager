<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
		      :data="tableData"
		      style="width: 100%">
              <el-table-column
                prop="userId"
                label="ID"
                width="80">
              </el-table-column>
		      <el-table-column
		        prop="userName"
		        label="姓名"
                align="center"
		        width="160">
		      </el-table-column>
		      <el-table-column
		        prop="gmtCreateFormat"
                align="center"
		        label="注册日期"
		        width="200">
		      </el-table-column>
              <el-table-column
                prop="userCity"
                align="center"
                label="所在城市"
                width="220">
              </el-table-column>
		      <el-table-column
                width="120"
		        prop="userTypeText"
                align="center"
		        label="权限">
		      </el-table-column>
              <el-table-column label="操作" width="220" align="center">
                  <template slot-scope="scope">
                    <el-button
                      v-if="scope.row.userType == 4"
                      size="small"
                      @click="handleConfirm(scope.$index, scope.row)">通过申请</el-button>
                    <el-button
                      v-if="scope.row.userType == 3"
                      size="small"
                      type="text"
                      plain>已通过</el-button>
                    <el-button
                      v-if="scope.row.userType == 4"
                      size="small"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
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
    import {adminList, adminCount, getUserTypeName, timestampToTime, adminPass} from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [],
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
                    // const countData = await adminCount();
                    // if (countData.status == 1) {
                    //     this.count = countData.count;
                    // }else{
                    //     throw new Error('获取数据失败');
                    // }
                    this.getAdmin();
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.limit = val;
                this.getAdmin();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getAdmin()
            },
            async getAdmin(){
                try{
                    const res = await adminList({userId: this.user.userId, current: this.currentPage, size: this.limit});
                    console.log("res:",res)
                    if (res.status == 200) {
                        this.count = res.data.total;
                    	this.tableData = [];
                    	res.data.data.forEach(item => {
                    		const tableItem = {
                    			userId: item.userId,
                                userName: item.userName,
                                userCity: item.userCity,
                                userType: item.userType,
                                userTypeText: getUserTypeName(item.userType),
                                gmtCreate: item.gmtCreate,
                                gmtCreateFormat: timestampToTime(item.gmtCreate)

                    		}
                    		this.tableData.push(tableItem)
                    	})
                    }else{
                    	throw new Error(res.message)
                    }
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            async handleConfirm(index, row) {
                console.log("通过申请操作", index, row)
                let operationDTO = {
                    target: row.userId,
                    operator : this.user.userId,
                }
                const res = await adminPass(operationDTO)
                console.log("res:",res)
                if (res.data.code == 1) {
                    this.$message('已通过申请');
                    this.tableData[index].userType = 3;
                } else {
                    this.$message.error('发送失败，请重新尝试');
                }

            },
            handleDelete(index, row) {
                console.log("删除操作", index, row)
            },
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>


