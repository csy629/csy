<template>
  <div class="app-container calendar-list-container">
    <!-- 操作区 -->
    <div class="filter-container flex j-between" style="padding-bottom: 10px;float: right;">
      <div>
        <el-button type="primary" icon="el-icon-plus" v-waves @click="addItem">新增</el-button>
        <el-button type="danger" icon="el-icon-delete" v-waves @click="remove">删除</el-button>
      </div>
    </div>

    <!-- 表格 -->
    <el-table
      :data="list" row-key="id" @selection-change="handleSelectionChange"
      v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" type="selection" width="55"></el-table-column>
      <el-table-column align="center" type="index" label="序号" width="65"></el-table-column>
      <el-table-column min-width="100px" align="center" label="老师名字">
        <template slot-scope="scope">
          <span>{{scope.row.teacherName}}</span>
          <!--<span style="color:#F56C6C" v-if="scope.row.status === 2">【草稿】</span>-->
        </template>
      </el-table-column>
      <el-table-column min-width="100px" align="center" label="老师简介">
        <template slot-scope="scope">
          <span>{{scope.row.teacherIntroduce}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120px" align="center" label="课程海报">
        <template slot-scope="scope">
          <img :src="scope.row.courseImageUrl" height="70" width="100" style="border-radius: 0px;display: block;margin:0 auto;"/>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" align="center" label="课程名称">
        <template slot-scope="scope">
          <p>{{scope.row.courseName}}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" align="center" label="课程简介">
        <template slot-scope="scope">
          <p>{{scope.row.classIntroduce}}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="70px" align="center" label="二维码">
        <template slot-scope="scope">
          <img :src="scope.row.codeImageUrl" height="50" width="50" style="border-radius: 0px;display: block;margin:0 auto;"/>
        </template>
      </el-table-column>
      <el-table-column min-width="80px" align="center" label="年级">
        <template slot-scope="scope">
          <p>{{scope.row.grade}}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="80px" align="center" label="科目">
        <template slot-scope="scope">
          <p>{{scope.row.subject}}</p>
        </template>
      </el-table-column>
      <el-table-column width="140px" align="center" label="开课时间">
        <template slot-scope="scope">
          <span>{{scope.row.courseDate| parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="80px" align="center" label="报名人数">
        <template slot-scope="scope">
          <p>{{scope.row.enrollment}}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200px">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" v-waves @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" v-waves @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      background
      style="text-align: center;margin-top: 10px;"
      layout="prev, pager, next"
      :page-size="pageNumber"
      @current-change="pageChange"
      :total="total">
    </el-pagination>
    <!--新建-->
    <el-dialog
      title="新增"
      :visible.sync="dialogVisible"
      width="690px"
      :before-close="handleClose">
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="课程名称" prop="courseName">
          <el-input v-model="ruleForm.courseName"></el-input>
        </el-form-item>
        <el-form-item label="主讲老师" prop="teacherName">
          <el-input v-model="ruleForm.teacherName"></el-input>
        </el-form-item>
        <el-form-item label="课程阶段" prop="grade">
          <el-select v-model="ruleForm.grade" placeholder="请选择年级">
            <el-option
              v-for="(item,index) in grade"
              :key="index"
              :label="item"
              :value="item">
              <span style="float: left">{{ item }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="教师简介" prop="teacherIntroduce">
          <el-input v-model="ruleForm.teacherIntroduce"></el-input>
        </el-form-item>
        <el-form-item label="课程科目" prop="subject">
          <el-select v-model="ruleForm.subject" placeholder="请选择科目">
            <el-option
              v-for="(item,index) in subject"
              :key="index"
              :label="item.name"
              :value="item.name">
              <span style="float: left">{{ item.name }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开课时间" prop="courseDate">
          <el-date-picker
            v-model="ruleForm.courseDate"
            type="datetime"
            placeholder="选择日期时间"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-row>
          <el-col :span="24">
            <el-form-item label="课程海报" prop="fileList">
              <el-upload
                class="upload-demo"
                :action="importFileUrl"
                :limit="1"
                :file-list="ruleForm.fileList"
                :data="imgDataHb"
                v-model="ruleForm.fileList"
                :on-remove="handleRemoveCourse"
                :on-preview="handlePreview"
                :beforeUpload="beforeAvatarUpload"
                :onError="uploadError"
                :onSuccess="uploadSuccess"
                :on-exceed="uploadExceed"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="课程二维码" prop="fileList2">
              <el-upload
                class="upload-demo"
                :action="importFileUrl"
                :on-preview="handlePreview"
                :limit="1"
                :on-remove="handleRemoveCode"
                :file-list="ruleForm.fileList2"
                v-model="ruleForm.fileList2"
                :data="imgDataEwm"
                :beforeUpload="beforeAvatarUpload"
                :onError="uploadError"
                :onSuccess="uploadSuccess2"
                :on-exceed="uploadExceed"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="课程介绍" prop="classIntroduce" style="display: block;">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 8}"
            maxlength="300"
            placeholder="请输入内容"
            v-model="ruleForm.classIntroduce"
            style="width: 400px;">
          </el-input>
        </el-form-item>
        <el-form-item style="display: block;padding-right: 97px;text-align: right;margin-bottom: 0">
          <el-button type="primary" @click="submitAddForm('ruleForm')">确认</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>
    <!--编辑-->
    <el-dialog
      title="编辑"
      :visible.sync="editDialogVisible"
      width="690px"
      :before-close="handleClose2">
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="课程名称" prop="courseName">
          <el-input v-model="ruleForm.courseName"></el-input>
        </el-form-item>
        <el-form-item label="主讲老师" prop="teacherName">
          <el-input v-model="ruleForm.teacherName"></el-input>
        </el-form-item>
        <el-form-item label="课程阶段" prop="grade">
          <el-select v-model="ruleForm.grade" placeholder="请选择年级">
            <el-option
              v-for="(item,index) in grade"
              :key="index"
              :label="item"
              :value="item">
              <span style="float: left">{{item}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="教师简介" prop="teacherIntroduce">
          <el-input v-model="ruleForm.teacherIntroduce"></el-input>
        </el-form-item>
        <el-form-item label="课程科目" prop="subject">
          <el-select v-model="ruleForm.subject" placeholder="请选择科目">
            <el-option
              v-for="(item,index) in subject"
              :key="index"
              :label="item.name"
              :value="item.name">
              <span style="float: left">{{ item.name }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开课时间" prop="courseDate">
          <el-date-picker
            v-model="ruleForm.courseDate"
            type="datetime"
            placeholder="选择日期时间"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-row>
          <el-col :span="24">
            <el-form-item label="课程海报" prop="fileList">
              <el-upload
                class="upload-demo"
                :action="importFileUrl"
                :on-preview="handlePreview"
                :limit="1"
                :on-remove="handleRemoveCourse"
                :file-list="ruleForm.fileList"
                v-model="ruleForm.fileList"
                :data="imgDataHb"
                :beforeUpload="beforeAvatarUpload"
                :onError="uploadError"
                :onSuccess="uploadSuccess"
                :on-exceed="uploadExceed"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="课程二维码" prop="fileList2">
              <el-upload
                class="upload-demo"
                :action="importFileUrl"
                :on-preview="handlePreview"
                :limit="1"
                :on-remove="handleRemoveCode"
                :file-list="ruleForm.fileList2"
                v-model="ruleForm.fileList2"
                :data="imgDataEwm"
                :beforeUpload="beforeAvatarUpload"
                :onError="uploadError"
                :onSuccess="uploadSuccess2"
                :on-exceed="uploadExceed"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="课程介绍" prop="classIntroduce" style="display: block;">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 8}"
            maxlength="300"
            placeholder="请输入内容"
            v-model="ruleForm.classIntroduce"
            style="width: 400px;">
          </el-input>
        </el-form-item>
        <el-form-item style="display: block;padding-right: 97px;text-align: right;margin-bottom: 0">
          <el-button type="primary" @click="submitEditForm('ruleForm')">保存</el-button>
          <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getPublicClass, createPublicClass, editPublicClass, deletePublicClass,publicClassSort,uploadFile,getSubject,getGrade } from '@/api/OpenClassManage'
  import waves from '@/directive/waves' // 水波纹指令
  import { deleteMessageBox } from '@/utils/messageBox'
  import apiBase from '@/utils/apiBase'
  import Sortable from 'sortablejs'

  export default {
    name: 'OpenClassManage',
    directives: {
      waves
    },
    data() {
      return {
        importFileUrl: apiBase()+'/publicClass/uploadFile',
        type:'0',
        grade:'',
        subject:'',
        sortable: null, //表格排序
        courseOsskey:'',
        codeOsskey:'',
        editUuid:'',
        list: [], //数据
        listLoading: true, //loading
        displayNum: '', //默认显示行数
        pageIndex: 1, //页码
        pageNumber: 50, //每页显示数量
        keyWord: '', //搜索关键字
        tagList: [], //标签列表
        tagSortUuid: '', //标签值
        dateVal: [], //选择时间
        tableSelection: [], //全选
        total: null, //数据总数
        dialogVisible: false,
        editDialogVisible: false,
        imgDataHb: {
          uuid:'',
          type:'1',
        },
        imgDataEwm: {
          uuid:'',
          type:'2',
        },
        ruleForm: {
          courseName: '',
          teacherName: '',
          grade: '',
          teacherIntroduce: '',
          subject: '',
          courseDate: '',
          classIntroduce: '',
          fileList: [
            // {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
          ],
          fileList2: [
            // {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
          ],
        },
        rules: {
          courseName: [
            { required: true, message: '请输入课程名称', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          teacherName: [
            { required: true, message: '请输入老师姓名', trigger: 'blur' }
          ],
          grade: [
            {required: true, message: '请选择课程阶段', trigger: 'change' }
          ],
          teacherIntroduce: [
            {required: true, message: '请输入老师简介', trigger: 'blur' }
          ],
          subject: [
            { required: true, message: '请选择科目', trigger: 'change' }
          ],
          courseDate: [
            { required: true, message: '请选择开课时间', trigger: 'change' }
          ],
          classIntroduce: [
            { required: true, message: '请填写课程介绍', trigger: 'blur' }
          ],
          fileList: [
            { required: true, message: '请上传海报', trigger: 'change' }
          ],
          fileList2: [
            { required: true, message: '请选择二维码', trigger: 'change' }
          ]
        }
      }
    },
    created() {
      this.getList()
      // 获取年级
      getGrade().then((res) => {
        this.grade = res.data
      })
      // 获取科目
      getSubject().then((res) => {
        this.subject = res.data
      })
    },
    methods: {
      getList() {  //获取列表
        this.listLoading = true
        if(!this.dateVal) this.dateVal = []
        let data = {
          pageIndex: this.pageIndex,
          pageNumber: this.pageNumber,
          // subject: this.subject,
          // grade: this.grade,
          type: this.type,
          // startDate: this.dateVal[0] || '',
          // endDate: this.dateVal[1] || '',
        };
        getPublicClass(data).then((res) => {
          // this.total = data.total;
          this.list = res.data
          this.listLoading = false
          this.$nextTick(() => {
            this.setSort();
          })
        })
      },
      pageChange(val) {
        this.pageIndex = val;
        this.getList();
      },
      // add() {  //头部添加
      //   this.$router.push({path:'/PC/Consultation/ConsultationCreat'})
      // },
      addItem(){
        this.dialogVisible = true;
        this.ruleForm.courseDate = ''
        this.ruleForm.courseName =''
        this.ruleForm.teacherName = ''
        this.ruleForm.subject = ''
        this.ruleForm.grade = ''
        this.ruleForm.teacherIntroduce = ''
        this.ruleForm.classIntroduce = ''
        // this.ruleForm.fileList=[];
        // this.ruleForm.fileList2=[];
        this.courseOsskey = ''
        this.codeOsskey = ''
      },
      remove() {  //头部删除
        if(!this.tableSelection.length) {
          this.$message.warning('未选中任何数据');
        } else {
          deleteMessageBox({ uuids: this.tableSelection } ,deletePublicClass, this.getList)
        }
      },
      displayNumSubmit() {  //显示行数确定
        consultationDisplayNum({num: this.displayNum}).then(response => {
          this.$message.success('操作成功');
        })
      },
      handleSelectionChange(val) {  //表格选中
        this.tableSelection = [];
        val.forEach((v,i) => {
          this.tableSelection.push(v.uuid)
        })
      },
      handleEdit(index, row) {  //编辑公开课
        // console.log(row);
        this.editDialogVisible = true;
        this.ruleForm.courseDate = this.formatDate(row.courseDate);
        this.ruleForm.courseName = row.courseName;
        this.ruleForm.teacherName = row.teacherName;
        this.ruleForm.subject = row.subject;
        this.ruleForm.grade = row.grade;
        this.ruleForm.teacherIntroduce = row.teacherIntroduce;
        this.ruleForm.classIntroduce = row.classIntroduce;
        this.editUuid = row.uuid;
        this.ruleForm.fileList.push({url:row.courseImageUrl});
        this.ruleForm.fileList2.push({url:row.codeImageUrl});
        this.courseOsskey = row.courseImageOsskey;
        this.codeOsskey = row.codeImageOsskey;
        console.log(this.ruleForm.fileList);
      },
      handleDelete(index, row) {  //删除公开课
        deleteMessageBox({ uuids: [row.uuid] },deletePublicClass, this.getList)
      },
      // 关闭modal
      handleClose(done) {
        let app = this;
        this.$confirm('确认关闭？')
          .then(_ => {
            app.ruleForm.fileList = [];
            app.ruleForm.fileList2 = [];
            // app.resetForm('ruleForm')
            done();
          })
          .catch(_ => {});
      },
      handleClose2(done) {
        let app = this;
        this.$confirm('确认关闭？')
          .then(_ => {
            app.ruleForm.fileList = [];
            app.ruleForm.fileList2 = [];
            // app.resetForm('ruleForm')
            done();
            console.log(app.ruleForm.fileList);
          })
          .catch(_ => {});
      },
      // 提交添加表单
      submitAddForm(formName) {
        let app = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            createPublicClass({
              courseName: app.ruleForm.courseName,
              teacherName: app.ruleForm.teacherName,
              subject: app.ruleForm.subject,
              grade: app.ruleForm.grade,
              teacherIntroduce: app.ruleForm.teacherIntroduce,
              courseDate: app.ruleForm.courseDate,
              classIntroduce: app.ruleForm.classIntroduce,
              courseImageOsskey: app.courseOsskey,
              codeImageOsskey: app.codeOsskey,
            }).then(res => {
              app.$message.success('添加成功');
              app.dialogVisible = false;
              app.ruleForm.fileList = [];
              app.ruleForm.fileList2 = [];
              app.resetForm('ruleForm');
              app.getList();
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 提交修改表单
      submitEditForm(formName) {
        let app = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            editPublicClass({
              courseName: app.ruleForm.courseName,
              teacherName: app.ruleForm.teacherName,
              subject: app.ruleForm.subject,
              grade: app.ruleForm.grade,
              teacherIntroduce: app.ruleForm.teacherIntroduce,
              courseDate: app.ruleForm.courseDate,
              classIntroduce: app.ruleForm.classIntroduce,
              courseImageOsskey: app.courseOsskey,
              codeImageOsskey: app.codeOsskey,
              uuid: app.editUuid,
            }).then(res => {
              app.$message.success('修改成功');
              app.editDialogVisible = false;
              app.getList();
              app.ruleForm.fileList = [];
              app.ruleForm.fileList2 = [];
              // app.resetForm('ruleForm');
              // app.ruleForm={}
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      setSort() {  //表格排序
        const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
        this.sortable = Sortable.create(el, {
          ghostClass: 'sortable-ghost',
          setData: function(dataTransfer) {
            dataTransfer.setData('Text', '')
          },
          onEnd: evt => {
            publicClassSort({
              changeSort: evt.newIndex,
              sort: evt.oldIndex,
            }).then(response => {
              this.getList();
            })
          }
        })
      },
      // 删除图片
      handleRemoveCourse(file, fileList) {
        console.log(file, fileList);
        this.ruleForm.fileList = [];
        this.courseOsskey = ''
        this.$refs['ruleForm'].validate((valid) => {
          console.log(valid)
        })
      },
      handleRemoveCode(file, fileList) {
        console.log(file, fileList);
        this.ruleForm.fileList2 = [];
        this.codeOsskey = ''
        this.$refs['ruleForm'].validate((valid) => {
          console.log(valid)
        })
      },
      handlePreview(file) {
        // console.log(file);
      },
      beforeAvatarUpload (file) {
        const extension = file.name.split('.')[1] === 'png'
        const extension2 = file.name.split('.')[1] === 'jpg'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!extension && !extension2) {
          // console.log('仅支持上传png、jpg格式!')
          this.$notify.error({
            title: '提示',
            message: '仅支持上传png、jpg格式!',
            duration: 4000
          });
        }
        if (!isLt2M) {
          // console.log('图片大小不能超过2MB!')
          this.$notify.error({
            title: '提示',
            message: '图片大小不能超过2MB!',
            duration: 4000
          });
        }
        return extension || extension2 && isLt2M
      },
      // 课程海报上传成功
      uploadSuccess (response, file, fileList) {
        this.courseOsskey = response.data.courseImageOsskey;
        this.ruleForm.fileList.push({url:response.data.courseImageUrl});
        this.$refs['ruleForm'].validate((valid) => {
          console.log(valid)
        })
      },
      // 二维码上传成功
      uploadSuccess2 (response, file, fileList) {
        this.codeOsskey = response.data.codeImageOsskey;
        this.ruleForm.fileList2.push({url:response.data.codeImageUrl})
        this.$refs['ruleForm'].validate((valid) => {
          console.log(valid)
        })
      },
      // 上传文件超过数限
      uploadExceed(){
        this.$notify.error({
          title: '提示',
          message: '只能上传一张图片!',
          duration: 4000
        });
      },
      //图片上传错误
      uploadError (response, file, fileList) {
        this.$notify.error({
          title: '错误',
          message: '上传失败，请重试！',
          duration: 4000
        });
      },
      // 时间戳日期转换
      formatDate(time) {
        var times = new Date(time);
        var year = times.getFullYear();
        var month = String(times.getMonth()+1).padStart(2,'0');
        var date = String(times.getDate()).padStart(2,'0');
        var hour = String(times.getHours()).padStart(2,'0');
        var minute = String(times.getMinutes()).padStart(2,'0');
        var second = String(times.getSeconds()).padStart(2,'0');
        return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
      }
    }
  }
</script>
<style scoped lang="scss">
  .filter-container{
    flex-wrap: wrap;
    padding: 0;
    &>div{
      &>div{
        margin-bottom: 10px !important;
      }
    }
    .filter-input{
      width: 50px;
      margin: 0 6px;
    }
    .filter-submit{
      margin-left: 10px;
    }
  }
  .newTagItem{
    margin-bottom: 22px;
    &:last-child{
      margin-bottom: 0;
    }
  }
  .el-tag{
    margin: 5px 0;
  }
  .el-tag+.el-tag {
    margin-left: 10px;
  }
</style>
