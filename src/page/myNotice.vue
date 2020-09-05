<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                style="width: 100%"
                @expand='expand'
                :expand-row-keys='expendRow'
                :row-key="row => row.index">
                <el-table-column type="expand">
                  <template slot-scope="scope" v-if="scope.row.noticeType == 1 && scope.row.noticeStatus != 2">
                    <el-form label-position="left" inline class="demo-table-expand">

                      <el-form-item label="广告名称">
                        <span>{{ adDetail.adName }}</span>
                      </el-form-item>
                      <el-form-item label="广告介绍">
                        <span>{{ adDetail.adDescription }}</span>
                      </el-form-item>
                      <el-form-item label="广告分类">
                        <span>{{ adDetail.adType1 }}</span>
                      </el-form-item>
                      <el-form-item label="广告ID">
                        <span>{{ adDetail.adId }}</span>
                      </el-form-item>
                      <el-form-item label="投放数">
                        <span>{{ adDetail.issueCount }}</span>
                      </el-form-item>
                      <el-form-item label="播放数">
                        <span>{{ adDetail.clickCount }}</span>
                      </el-form-item>
                      <el-form-item label="点赞数">
                        <span>{{ adDetail.likeCount }}</span>
                      </el-form-item>
                      <el-form-item label="厌恶数">
                        <span>{{ adDetail.dislikeCount }}</span>
                      </el-form-item>
                      <el-form-item label="投放开始">
                        <span>{{ adDetail.gmtCreateFormat }}</span>
                      </el-form-item>
                      <el-form-item label="广告进度">
                        <span>{{ adDetail.adProgress }}%</span>
                      </el-form-item>
                      <el-form-item label="广告图片">
                      </el-form-item>
                      <el-form-item label="广告价值">
                        <span>{{ adDetail.adCash }}</span>
                      </el-form-item>
                      <img v-if="scope.row.adPicture" :src="props.row.adPicture" style="width: 200px;height: 450px;">
                      <img v-else src="../../screenshots/manage_shop.png" style="max-width: 480px; max-height: 270px;">
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column
                  label="#"
                  width="50"
                  prop="index">
                </el-table-column>
                <el-table-column
                  label="消息日期"
                  align="center"
                  width="170"
                  prop="gmtCreateFormat">
                </el-table-column>
                <el-table-column
                  label="来源"
                  prop="noticeType">
                  <template slot-scope="scope">
                    <span v-if="scope.row.noticeType == 1">用户举报</span>
                    <span v-if="scope.row.noticeType == 0">系统处理</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="说明"
                  prop="noticeReason">
                </el-table-column>
                <el-table-column
                  width="170"
                  align="center"
                  label="处理时间">
                  <template slot-scope="scope">
                    <span v-if="scope.row.noticeStatus == 0">等待处理</span>
                    <span v-else>{{ scope.row.gmtModifiedFormat }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="处理结果" width="270" align="center">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="text"
                      v-if="scope.row.noticeStatus == 0">等待处理</el-button>
                    <el-button
                      size="mini"
                      type="info"
                      v-if="scope.row.noticeStatus == 1">已驳回</el-button>
                    <el-button
                      size="mini"
                      type="warning"
                      v-if="scope.row.noticeStatus == 2">已删除广告</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      v-if="scope.row.noticeStatus == 3">已将店铺封禁3天</el-button>
                    <el-button
                      size="mini"
                      type="info"
                      v-if="scope.row.noticeStatus == 11">通过审核</el-button>
                    <el-button
                      size="mini"
                      type="warning"
                      v-if="scope.row.noticeStatus == 12">未通过审核</el-button>
                  </template>
                </el-table-column>
            </el-table>
            <div class="Pagination">
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
    import {baseUrl, baseImgPath} from '@/config/env'
    import {cityGuess, getResturants, getResturantsCount, foodCategory, updateResturant, searchplace, deleteResturant, shopList, timestampToTime, getUserTypeName, myNoticeList, getAdByAdId, getShopOrAdTypeName} from '@/api/getData'
    export default {
        data(){
            return {
                baseUrl,
                baseImgPath,
                city: {},
                offset: 0,
                limit: 20,
                count: 0,
                tableData: [],
                currentPage: 1,
                selectTable: {},
                dialogFormVisible: false,
                categoryOptions: [],
                selectedCategory: [],
                address: {},
                expendRow: [],
                adDetail: {},
                user: {}
            }
        },
        created(){
            this.user = this.$cookies.get("cookiesUser")
            this.initData();
        },
        components: {
            headTop,
        },
        methods: {
            async initData(){
                try{
                    // this.city = await cityGuess();
                    // const countData = await getResturantsCount();
                    // if (countData.status == 1) {
                    //     this.count = countData.count;
                    // }else{
                    //     throw new Error('获取数据失败');
                    // }
                    this.getViolateList();
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            async getCategory(){
                try{
                    const categories = await foodCategory();
                    categories.forEach(item => {
                        if (item.sub_categories.length) {
                            const addnew = {
                                value: item.name,
                                label: item.name,
                                children: []
                            }
                            item.sub_categories.forEach((subitem, index) => {
                                if (index == 0) {
                                    return
                                }
                                addnew.children.push({
                                    value: subitem.name,
                                    label: subitem.name,
                                })
                            })
                            this.categoryOptions.push(addnew)
                        }
                    })
                }catch(err){
                    console.log('获取商铺种类失败', err);
                }
            },
            async getViolateList(){
                const {latitude, longitude} = this.city;
                const res = await myNoticeList({userId: this.user.userId, current: this.currentPage, size: this.limit});
                let index = 0
                this.tableData = [];
                this.count = res.data.current
                res.data.data.forEach(item => {
                    const tableData = {};
                    tableData.index = ++index;
                    tableData.noticeId = item.noticeId;
                    tableData.adId = item.adId;
                    tableData.shopId = item.shopId;
                    tableData.fromId = item.fromId;
                    tableData.toId = item.toId;
                    tableData.noticeReason = item.noticeReason;
                    tableData.noticeStatus = item.noticeStatus;
                    tableData.noticeType = item.noticeType;
                    tableData.gmtCreate = item.gmtCreate;
                    tableData.gmtCreateFormat = timestampToTime(item.gmtCreate);
                    tableData.gmtModified = item.gmtModified;
                    tableData.gmtModifiedFormat = timestampToTime(item.gmtModified);

                    this.tableData.push(tableData);
                })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.limit = val;
                this.getViolateList()
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getViolateList()
            },
            expand(row, status){
              // console.log(row)
              if (row.noticeType == 0) {
                return;
              }
              if (status) {
                console.log("展开行，去get对应的广告数据:")
                this.getAds(row.adId, row.index-1)
              }
            },
            handleEdit(index, row, operation) {
              console.log(index,row,operation)
                // this.selectTable = row;
                // this.address.address = row.address;
                // this.dialogFormVisible = true;
                // this.selectedCategory = row.category.split('/');
                // if (!this.categoryOptions.length) {
                //     this.getCategory();
                // }
            },
            async getAds(adId, index){
              console.log("adId",adId,typeof(adId))
                const response = await getAdByAdId({adId: adId});
                const item = response.data;
                const tableData = {};
                tableData.userId = item.userId;
                tableData.shopId = item.shopId;
                tableData.adId = item.adId;
                tableData.adName = item.adName;
                tableData.adDescription = item.adDescription;
                tableData.adPicture = item.adPicture;
                tableData.adType = item.adType;
                tableData.adType1 = getShopOrAdTypeName(item.adType);
                tableData.adTime = item.adTime;
                tableData.adProgress = item.adProgress;
                tableData.adCash = item.adCash;
                tableData.issueCount = item.issueCount;
                tableData.clickCount = item.clickCount;
                tableData.likeCount = item.likeCount;
                tableData.dislikeCount = item.dislikeCount;
                tableData.adCount = '' + item.issueCount + '/' + item.clickCount + '/' + item.likeCount + '/' + item.dislikeCount;
                tableData.gmtCreate = item.gmtCreate;
                tableData.gmtCreateFormat = timestampToTime(item.gmtCreate);
                tableData.gmtModified = item.gmtModified;
                this.adDetail = tableData;
            }
        }
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .table_container{
        padding: 20px;
    }
    .Pagination{
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
</style>
