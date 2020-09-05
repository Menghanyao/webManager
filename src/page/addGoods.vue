<template>
    <div>
     	<head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="14" :offset="4">
  				<!-- <header class="form_header">选择食品种类</header>
	  			<el-form :model="categoryForm" ref="categoryForm" label-width="110px" class="form">
		  			<el-row class="category_select">
		  				<el-form-item label="食品种类">
			  				<el-select v-model="categoryForm.categorySelect" :placeholder="selectValue.label" style="width:100%;">
							    <el-option
							      	v-for="item in categoryForm.categoryList"
							      	:key="item.value"
							      	:label="item.label"
							      	:value="item.value">
							    </el-option>
						  	</el-select>
						</el-form-item>
					</el-row>
					<el-row class="add_category_row" :class="showAddCategory? 'showEdit': ''">
						<div class="add_category">
							<el-form-item label="食品种类" prop="name">
								<el-input v-model="categoryForm.name"></el-input>
							</el-form-item>
							<el-form-item label="种类描述" prop="description">
								<el-input v-model="categoryForm.description"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="submitcategoryForm('categoryForm')">提交</el-button>
							</el-form-item>
						</div>
					</el-row>
					<div class="add_category_button" @click="addCategoryFun">
						<i class="el-icon-caret-top edit_icon" v-if="showAddCategory"></i>
						<i class="el-icon-caret-bottom edit_icon" v-else slot="icon"></i>
						<span>添加食品种类</span>
					</div>
	  			</el-form> -->
	  			<header class="form_header">添加广告</header>
	  			<el-form :model="adDTO" :rules="foodrules" ref="foodForm" label-width="110px" class="form food_form">
	  				<el-form-item label="这条广告属于哪个店？" prop="shopDTO">
	  					<el-select v-model="adDTO.shopDTO.shopId" placeholder="请选择" width="500">
						   <el-option
						     v-for="item in shopDTOList"
						     :key="item.shopId"
						     :label="'店名：' + item.shopName + ', 描述:' + item.shopDescription + ', 地址:' + item.shopCity + ',' + item.shopAddress"
						     :value="item.shopId">
						   </el-option>
						 </el-select>
					</el-form-item>
	  				<el-form-item label="广告名称" prop="adName">
						<el-input v-model="adDTO.adName"></el-input>
					</el-form-item>
					<el-form-item label="广告类型" style="white-space: nowrap;" prop="adType">
						<el-radio class="radio" v-model="adDTO.adType" label="0">餐饮类</el-radio>
						<el-radio class="radio" v-model="adDTO.adType" label="1">服装类</el-radio>
  						<el-radio class="radio" v-model="adDTO.adType" label="2">女性类</el-radio>
					</el-form-item>
					<el-form-item style="white-space: nowrap;">
						<el-radio class="radio" v-model="adDTO.adType" label="3">儿童类</el-radio>
  						<el-radio class="radio" v-model="adDTO.adType" label="4">户外类</el-radio>
  						<el-radio class="radio" v-model="adDTO.adType" label="5">宠物类</el-radio>
					</el-form-item>

					<el-form-item label="广告描述" prop="adDescription">
						<el-input v-model="adDTO.adDescription"></el-input>
					</el-form-item>
					<el-form-item label="广告时长" style="white-space: nowrap;" prop="adTime">
						<el-radio class="radio" v-model="adDTO.adTime" label="5">5秒</el-radio>
						<el-radio class="radio" v-model="adDTO.adTime" label="10">10秒</el-radio>
  						<el-radio class="radio" v-model="adDTO.adTime" label="15">15秒</el-radio>
  						<el-radio class="radio" v-model="adDTO.adTime" label="20">20秒</el-radio>
					</el-form-item>
					<el-form-item label="广告费用" prop="adCash">
						<el-input-number v-model="adDTO.adCash" :min="0" :max="1000"></el-input-number>
						<p>
							<span v-if="adDTO.adTime == 20">能支持 {{adDTO.adCash / 0.2}} 次播放， </span>
							<span v-else>能支持 {{adDTO.adCash / 0.1}} 次播放， </span>
							<span> 收费标准为 {{ adDTO.adTime == 20 ? 0.2 : 0.1}} 元/条</span>
						</p>
					</el-form-item>
					<!-- <el-form-item label="上传广告图片">
						<el-upload
						  class="avatar-uploader"
						  :action="baseUrl + '/v1/addimg/food'"
						  :show-file-list="false"
						  :on-success="uploadImg"
						  :before-upload="beforeImgUpload">
						  <img v-if="foodForm.image_path" :src="baseImgPath + foodForm.image_path" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item> -->
					<el-form-item label="上传广告图片" prop="adPicture">
						<el-upload
						  class="avatar-uploader"
						  action=""
						  :before-upload="beforeUpload"
						  :on-preview="handlePictureCardPreview"
						  :on-success="uploadImg"
						  :limit="1"
						  :on-remove="handleRemove">
						  <img v-if="dialogImageUrl" :src="dialogImageUrl" class="avatar" style="width: 200px;height: 450px">
						  <i class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="addAdNow">确认添加广告</el-button>
					</el-form-item>
	  			</el-form>
  			</el-col>
  		</el-row>
    </div>
</template>

<script>
 	import headTop from '@/components/headTop'
    import {getCategory, addCategory, addFood , addAd, shopList, uploadPicture} from '@/api/getData'
    import {baseUrl, baseImgPath, base} from '@/config/env'
    export default {
    	data(){
    		return {
    			baseUrl,
    			base,
    			baseImgPath,
    			restaurant_id: 1,
    			categoryForm: {
    				categoryList: [],
    				categorySelect: '',
    				name: '',
    				description: '',
    			},
    			foodForm: {
    				name: '',
    				description: '',
    				image_path: '',
    				activity: '',
    				attributes: [],
    				specs: [{
    					specs: '默认',
			          	packing_fee: 0,
			          	price: 20,
    				}],
    			},
    			adDTO: {
    				shopDTO: {
    					shopId: null
    				},
    				shopId: 68,
    				userId: 131,
    				adName: '',
    				adType: null,
    				adDescription: '',
    				adCash: 0,
    				adPicture: '',
    			},
    			shopDTOList: [],
    			foodrules: {
    				adName: [
						{ required: true, message: '请输入广告名称', trigger: 'blur' },
					],
					adType: [
						{ required: true, message: '请选择广告类型', trigger: 'blur' },
					],
					adDescription: [
						{ required: true, message: '请输入广告描述', trigger: 'blur' },
					],
					adTime: [
						{ required: true, message: '请选择广告时长', trigger: 'blur' },
					],
    				adCash: [
						{ required: true, message: '请选择投放费用', trigger: 'blur' },
					],
					shopDTO: [
						{ required: true, message: '请选择这条广告发自哪个店铺', trigger: 'blur' },
					],
					adPicture: [
						{ required: true, message: '请选择这条广告的牌面', trigger: 'blur' },
					]
    			},
    			attributes: [{
		          	value: '新',
		          	label: '新品'
		        }, {
		          	value: '招牌',
		          	label: '招牌'
		        },],
    			showAddCategory: false,
    			foodSpecs: 'one',
    			dialogFormVisible: false,
		        specsForm: {
		          	specs: '',
		          	packing_fee: 0,
		          	price: 20,
		        },
		        specsFormrules: {
		        	specs: [
						{ required: true, message: '请输入规格', trigger: 'blur' },
					],
		        },
		        dialogImageUrl: '',
        		dialogVisible: false
    		}
    	},
    	components: {
    		headTop,
    	},
    	created(){
    		this.getShopList()
    	},
    	computed: {
    		selectValue: function (){
    			return this.categoryForm.categoryList[this.categoryForm.categorySelect]||{}
    		}
    	},
    	methods: {
    		async initData(){
    			try{
    				const result = await getCategory(this.restaurant_id);
	    			if (result.status == 1) {
	    				result.category_list.map((item, index) => {
	    					item.value = index;
	    					item.label = item.name;
	    				})
	    				this.categoryForm.categoryList = result.category_list;
	    			}else{
	    				console.log(result)
	    			}
    			}catch(err){
    				console.log(err)
    			}
    		},
    		addAdNow() {
    			console.log("adDTO",this.adDTO)
    			this.addAd()
    		},
    		async addAd() {
    			const res = await addAd(this.adDTO);
    			console.log("response", res)
    			if (res.status == 200) {
    				if (res.data.code == 31) {
    					this.open()
    				} else if (res.data.code ==30) {
    					this.$alert('添加失败，请重试', {
				          confirmButtonText: '确定',
				          callback: action => {}
				        });
    				}
    			}
    		},
    		open() {
		       	this.$alert('已添加广告，即将跳转到广告列表', {
		       		confirmButtonText: '确定',
		        	callback: action => {
		          		this.$router.push('/foodList');
		        	}
		      	});
		    },
    		async getShopList() {
    			const response = await shopList({userId: 131, current: 1, size: 100});
    			// this.shopDTOList = response.data.data
    			response.data.data.forEach(item => {
            		if (item.shopStatus == 1) {
            			this.shopDTOList.push(item)
            		}
            	})
    		},
    		handleRemove(file, fileList) {
		        console.log(file, fileList);
		    },
		    handlePictureCardPreview(file) {
		        // this.dialogImageUrl = file.url;
		        // this.dialogVisible = true;
		    },
		    shopSelect(val) {
		    	console.log("选择建议内容", val)
		    },
		    addCategoryFun(){
		    	this.showAddCategory = !this.showAddCategory;
		    },
		    submitcategoryForm(categoryForm) {
				this.$refs[categoryForm].validate(async (valid) => {
					if (valid) {
						const params = {
							name: this.categoryForm.name,
							description: this.categoryForm.description,
							restaurant_id: this.restaurant_id,
						}
						try{
							const result = await addCategory(params);
							if (result.status == 1) {
								this.initData();
								this.categoryForm.name = '';
								this.categoryForm.description = '';
								this.showAddCategory = false;
								this.$message({
					            	type: 'success',
					            	message: '添加成功'
					          	});
							}
						}catch(err){
							console.log(err)
						}
					} else {
						this.$notify.error({
							title: '错误',
							message: '请检查输入是否正确',
							offset: 100
						});
						return false;
					}
				});
			},
			uploadImg(res, file) {
				// if (res.status == 1) {
				// 	this.foodForm.image_path = res.image_path;
				// 	this.dialogImageUrl = res.image_path;
				// }else{
				// 	this.$message.error('上传图片失败！');
				// }
			},
			beforeUpload(file){
				  console.log("file:",file)
			      let fd = new FormData();//通过form数据格式来传
			      fd.append("file", file); //传文件
				  console.log("file:",fd)
			      this.$axios(({
			        method: 'POST',
			        url: 'http://localhost:8081/upload',
			        data: fd
				  })).then(res=>{
					console.log("res",res)

					// this.foodForm.image_path = res.image_path;
					this.dialogImageUrl = res.data
					this.adDTO.adPitcure = res.data
					console.log(this.dialogImageUrl)
				  })
			},
			beforeImgUpload(file) {
				const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isRightType) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isRightType && isLt2M;
			},
			addspecs(){
				this.foodForm.specs.push({...this.specsForm});
				this.specsForm.specs = '';
				this.specsForm.packing_fee = 0;
				this.specsForm.price = 20;
				this.dialogFormVisible = false;
			},
			handleDelete(index){
				this.foodForm.specs.splice(index, 1);
			},
			tableRowClassName(row, index) {
		        if (index === 1) {
		        	return 'info-row';
		        } else if (index === 3) {
		        	return 'positive-row';
		        }
		        return '';
		    },
		    addFood(foodForm){
		    	this.$refs[foodForm].validate(async (valid) => {
					if (valid) {
						const params = {
							...this.foodForm,
							category_id: this.selectValue.id,
							restaurant_id: this.restaurant_id,
						}
						try{
							const result = await addFood(params);
							if (result.status == 1) {
								console.log(result)
								this.$message({
					            	type: 'success',
					            	message: '添加成功'
					          	});
					          	this.foodForm = {
				    				name: '',
				    				description: '',
				    				image_path: '',
				    				activity: '',
				    				attributes: [],
				    				specs: [{
				    					specs: '默认',
							          	packing_fee: 0,
							          	price: 20,
				    				}],
				    			}
							}else{
								this.$message({
					            	type: 'error',
					            	message: result.message
					          	});
							}
						}catch(err){
							console.log(err)
						}
					} else {
						this.$notify.error({
							title: '错误',
							message: '请检查输入是否正确',
							offset: 100
						});
						return false;
					}
				});
		    }
		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.form{
		min-width: 400px;
		margin-bottom: 30px;
		&:hover{
			box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
			border-radius: 6px;
			transition: all 400ms;
		}
	}
	.food_form{
		border: 1px solid #eaeefb;
		padding: 10px 10px 0;
	}
	.form_header{
		text-align: center;
		margin-bottom: 10px;
	}
	.category_select{
		border: 1px solid #eaeefb;
		padding: 10px 30px 10px 10px;
		border-top-right-radius: 6px;
		border-top-left-radius: 6px;
	}
	.add_category_row{
		height: 0;
		overflow: hidden;
		transition: all 400ms;
		background: #f9fafc;
	}
	.showEdit{
		height: 185px;
	}
	.add_category{
		background: #f9fafc;
		padding: 10px 30px 0px 10px;
		border: 1px solid #eaeefb;
		border-top: none;
	}
	.add_category_button{
		text-align: center;
		line-height: 40px;
		border-bottom-right-radius: 6px;
		border-bottom-left-radius: 6px;
		border: 1px solid #eaeefb;
		border-top: none;
		transition: all 400ms;
		&:hover{
			background: #f9fafc;
			span, .edit_icon{
				color: #20a0ff;
			}
		}
		span{
			.sc(14px, #999);
			transition: all 400ms;
		}
		.edit_icon{
			color: #ccc;
			transition: all 400ms;
		}
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
	.cell{
		text-align: center;
	}
</style>
