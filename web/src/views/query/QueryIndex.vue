<template>
    <div>
        <div class="content-header">
            <h1>信息录入</h1>
        </div>

        <div class="app-container">
            <div class="box">
                <div class="filter-container">
                    <el-input placeholder="学生姓名" v-model="pagination.studentName" style="width: 200px;"
                            class="filter-item"></el-input>
                    <el-input placeholder="学生学号" v-model="pagination.studentNumber" style="width: 200px;"
                            class="filter-item"></el-input>
                    <el-input placeholder="学生班级" v-model="pagination.studentClass1" style="width: 200px;"
                            class="filter-item"></el-input>
                    <el-button @click="getAll()" class="dalfBut">查询</el-button>
                    <el-button type="primary" class="butT" @click="handleCreate()">新建</el-button>
                    <el-button @click="reset()" class="dalfBut">重置</el-button>
                </div>

                <el-table size="small" current-row-key="id" :data="dataList"
                        stripe highlight-current-row>

                    <el-table-column type="index" align="center" label="序号"></el-table-column>

                    <el-table-column prop="studentNumber" label="学号" align="center"></el-table-column>

                    <el-table-column prop="studentName" label="姓名" align="center"></el-table-column>
                    <el-table-column prop="studentGender" label="性别" align="center"></el-table-column>
                    <el-table-column prop="studentFaculty" label="院系" align="center"></el-table-column>
                    <el-table-column prop="studentMajor" label="专业" align="center"></el-table-column>
                    <el-table-column prop="studentClass1" label="班级" align="center"></el-table-column>
                    <el-table-column prop="studentPhone" label="电话号码" align="center"></el-table-column>

                    <el-table-column label="操作" align="center">
                        <template v-slot="scope">
                            <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
                            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>

                </el-table>

                <!--分页组件-->
                <div class="pagination-container">
                    <!--                * `page-size` ：每页显示的条目数-->
                    <!--                * `page-sizes` ： 每页显示个数选择器的选项设置。-->
                    <!--                `:page-sizes="[100,200,300,400]"`  对应的页面效果如下：-->
                    <!--                * `currentPage` ：当前页码。我们点击那个页码，此属性值就是几。-->
                    <!--                * `total` ：总记录数。用来设置总的数据条目数，该属性设置后， Element 会自动计算出需分多少页并给我们展示对应的页码。-->
                    <!--                事件说明：-->
                    <!--                * `size-change` ：pageSize 改变时会触发。也就是当我们改变了每页显示的条目数后，该事件会触发。-->
                    <!--                * `current-change` ：currentPage 改变时会触发。也就是当我们点击了其他的页码后，该事件会触发。-->
                    <el-pagination
                        class="pagiantion"
                        @current-change="handleCurrentChange"
                        :current-page="pagination.currentPage"
                        :page-size="pagination.pageSize"
                        layout="total, prev, pager, next, jumper"
                        :total="pagination.total">
                    </el-pagination>
                </div>

                <!-- 新增标签弹层 -->
                <div class="add-form">
                    <el-dialog title="新增学生" v-model:visible="dialogFormVisible">
                        <el-form ref="dataAddForm" :model="formData" :rules="rules" label-position="right"
                                label-width="100px">
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="学生学号" prop="studentNumber">
                                        <el-input v-model="formData.studentNumber"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="学生姓名" prop="studentName">
                                        <el-input v-model="formData.studentName"/>
                                    </el-form-item>
                                </el-col>

                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="学生性别" prop="studentGender">
                                        <el-radio v-model="formData.studentGender" label="男">男</el-radio>
                                        <el-radio v-model="formData.studentGender" label="女">女</el-radio>
                                    </el-form-item>
                                </el-col>
                            </el-row>


                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="院系">
                                        <el-input v-model="formData.studentFaculty"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="专业">
                                        <el-input v-model="formData.studentmajor"/>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="班级">
                                        <el-input v-model="formData.studentClass1"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="电话">
                                        <el-input v-model="formData.studentPhone"/>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="cancel()">取消</el-button>
                            <el-button type="primary" @click="handleAdd()">确定</el-button>
                        </div>
                    </el-dialog>
                </div>

                <!-- 编辑标签弹层 -->
                <div class="add-form">
                    <el-dialog title="编辑检查项" v-model:visible="dialogFormVisible4Edit">
                        <el-form ref="dataEditForm" :model="formData" :rules="rules" label-position="right"
                                label-width="100px">
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="学生学号" prop="studentNumber">
                                        <el-input v-model="formData.studentNumber"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="学生姓名" prop="studentName">
                                        <el-input v-model="formData.studentName"/>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>

                                <el-col :span="12">

                                    <el-form-item label="学生性别" prop="studentGender">
                                        <el-radio v-model="formData.studentGender" label="男">男</el-radio>
                                        <el-radio v-model="formData.studentGender" label="女">女</el-radio>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="院系">
                                        <el-input v-model="formData.studentFaculty"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="专业">
                                        <el-input v-model="formData.studentMajor"/>
                                    </el-form-item>
                                </el-col>

                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="班级">
                                        <el-input v-model="formData.studentClass1"/>
                                    </el-form-item>

                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="电话">
                                        <el-input v-model="formData.studentPhone"/>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="cancel()">取消</el-button>
                            <el-button type="primary" @click="handleEdit()">确定</el-button>
                        </div>
                    </el-dialog>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onBeforeMount } from 'vue-demi'
import Axios from '../../plugins/axios'
const dataList = ref([]) //当前页要展示的列表数据
const dialogFormVisible = ref(false) //添加表单是否可见
const dialogFormVisible4Edit = ref(false) //编辑表单是否可见
const formData = ref({}) //表单数据

const rules = reactive({ //校验规则
    studentNumber: [{required: true, message: '学号为必填项', trigger: 'blur'}],
    studentName: [{required: true, message: '名字为必填项', trigger: 'blur'}],
    studentGender:[{required: true, message: '性别为必选项', trigger: 'blur'}]
})
const pagination = reactive({ //分页相关模型数据
    currentPage: 1, //当前页码
    pageSize: 10, //每页显示的记录数
    total: 0, //总记录数
    studentName: "",
    studentNumber: "",
    studentClass1: ""
})

//分页查询
const getAll = () => {
    //组织参数，拼接url请求地址
    let param = ''
    param = "?studentName=" + pagination.studentName;
    param += "&studentNumber=" + pagination.studentNumber;
    param += "&studentClass1=" + pagination.studentClass1;
    // console.log(param);

    //发送异步请求
    Axios.get("/students/" + pagination.currentPage + "/" + pagination.pageSize + param)
        .then((res) => {
            pagination.pageSize = res.data.data.size;
            pagination.currentPage = res.data.data.current;
            pagination.total = res.data.data.total;

            dataList.value = res.data.data.records;
        });
}

//钩子函数，VUE对象初始化完成后自动执行
onBeforeMount(() => {
    //获取列表数据
    getAll()
})

//切换页码
const handleCurrentChange = (currentPage) => {
    //修改页码值为当前选中的页码值
    pagination.currentPage = currentPage;
    //执行查询
    getAll();
}

//重置表单
const resetForm = () => {
    formData.value = {};
}
//弹出添加窗口
const handleCreate = () => {
    dialogFormVisible.value = true;
    resetForm();
}

//添加
const handleAdd = () => {
    Axios.post("/students", formData.value)
        .then((res) => {
            //判断当前操作是否成功
            if (res.data.flag) {
                //1.关闭弹层
                dialogFormVisible.value = false;
                console.log(res.data.message);
            } else {
                console.log(res.data.msg);
            }
        }).finally(() => {
            //2.重新加载数据
            getAll();
        });
}

//取消
const cancel = () => {
    dialogFormVisible.value = false;
    dialogFormVisible4Edit.value = false;
    console.log("当前操作取消");
}

// 删除
const handleDelete = (row) => {
    this.$confirm("此操作永久删除当前信息，是否继续？", "提示", {type: "info"}).then(() => {
        Axios.delete("/students/" + row.id).then((res) => {
            if (res.data.flag) {
                console.log("删除成功");
            } else {
                console.log("数据同步失败，自动刷新");
            }
        }).finally(() => {
            //2.重新加载数据
            getAll();
        });
    }).catch(() => {
        console.log("取消操作");
    });
}

//弹出编辑窗口
const handleUpdate = (row) => {
    Axios.get("/students/" + row.id).then((res) => {
        if (res.data.flag && res.data.data != null) {
            dialogFormVisible4Edit.value = true;
            formData.value = res.data.data;
        } else {
            console.log("数据同步失败，自动刷新");
        }
    }).finally(() => {
        //2.重新加载数据
        getAll();
    });
}

//修改
const handleEdit = () => {
    Axios.put("/students", formData.value).then((res) => {
        //判断当前操作是否成功
        if (res.data.flag) {
            //1.关闭弹层
            dialogFormVisible4Edit.value = false;
            console.log("修改成功");
        } else {
            console.log("修改失败");
        }
    }).finally(() => {
        //2.重新加载数据
        getAll();
    });
}
const reset = () => {
    pagination.studentName = "";
    pagination.studentNumber = "";
    pagination.studentClass1 = "";
    getAll();
}

</script>

<style lang="scss" scoped>
html, body {

    /* overflow-y: scroll; */

    margin: 0;

}

a {

    color: #3c8dbc;

    text-decoration: none;

}

/* new style */

.skin-purple .main-sidebar {

    background: #fff;

}

.skin-purple .main-header .logo:hover {

    background: #0abdfe;

}

.skin-purple .main-header .navbar .sidebar-toggle:hover {

    /* background: #0abdfe; */

}

.skin-purple .main-header {

    min-height: 70px;

    padding: 0;

}

.skin-purple .main-header .logo {

    height: 50px;

    /* background: #0abdfe; */

    float: left;

    padding: 20px 0 0 15px;

    /* width: 230px; */

}

.skin-purple .main-header .navbar {

    height: 70px;

    background: linear-gradient(to right, #0abdfe, #67f0e0);

    /* margin-left: 230px; */

}

.winfo {
    margin-left: 230px;
}

.skin-purple .main-header .sidebar-toggle {

    display: inline-block;

    padding: 24px 15px;

    color: #fff;

}

.skin-purple .main-sidebar {

    padding-top: 75px;

}

.sidebar-menu > li {

    line-height: 1.8

}

.skin-purple .sidebar-menu > li > a {

    font-size: 16px;

    color: #666

}

.skin-purple .sidebar-menu > li:hover > a,
.skin-purple .sidebar-menu > li.active > a {

    background: transparent;

    color: #666;

    border-left-color: transparent

}

.skin-purple .treeview-menu > li > a:hover {

    color: #fff

}

.skin-purple .sidebar-menu > li > .treeview-menu {

    background: #fff;

}

.sidebar-menu .treeview-menu > li > a {

    font-size: 16px;

    padding-left: 35px;

    color: #999

}

.sidebar-menu .treeview-menu > li:hover {

    background: #0abdfe;

}

@media (min-width: 768px) {

    .skin-purple .navbar-nav > li > a {

        padding-top: 25px;

        padding-bottom: 25px;

    }

}

.modal-body .nav-tabs > li.active > a, .nav-tabs > li.active > a:focus, .nav-tabs > li.active > a:hover {

    color: #0abdfe

}

.modal-body .nav-tabs > li > a {

    color: #555

}

.bg-olive {

    background-color: #0abdfe !important;

}

.dataTable .btn[class*='bg-']:hover {

    box-shadow: none

}

.btn-primary {

    background: #0abdfe;

    border-color: #0abdfe;

}

.box-body .nav > li > a {

    color: #666

}

.box-body .nav > li.active > a {

    color: #0abdfe;

}


/* tab 1*/

.double {

    line-height: 58px;

}

.title .glyphicon {

    padding: 3px;

    font-size: 13px;

    border-radius: 8px;

    color: #fff;


}

.data span.arrowup {

    color: #d88918;

}

.data span.arrowdown {

    color: #6bb10a;

}

.item-blue .glyphicon {

    background-color: #39a9ea;

}

.item-green {

    line-height: 58px;

}

.item-green .glyphicon {

    background-color: #6bb10a;

    line-height: 12px;

}

.item-orange .glyphicon {

    background-color: #d88918;

}

.item-red .glyphicon {

    background-color: #f14f4f;

}

.chart .chart-box {

    margin: 10px;

}


/* 数据表格label */

.content-wrapper .data-type {

    /*width: 90%;*/

    margin: 10px 5px;

    border: 1px solid #d4d4d4;

    border-radius: 2px;

}

.data-type .title,
.data-type .data {

    padding: 3px 12px;

    border-top: 1px solid #d4d4d4;

    overflow: hidden;

    height: 42px;

}

.data-type .title {

    line-height: 34px;

    border-right: 1px solid #d4d4d4;

}


.data-type .data:last-child {

    border-right: 0;

}

.data-type .title {

    text-align: center;

    background: #ececec;

}

.data-type .data .line {

    vertical-align: middle;

    overflow: hidden;

    padding-bottom: 10px;

    padding-top: 10px;

}


/* label行高度 */

.data-type .data > label {

    line-height: 36px;

}

.data-type .data > .form-group {

    line-height: 36px;

}

.data-type .data.text {

    line-height: 36px;

}

/* label行分隔符 */

.data-type .data.border-right {

    border-right: 1px solid #d4d4d4;

}


/* 表格双倍高度 */

.data-type .title.rowHeight2x,
.data-type .data.rowHeight2x {

    height: 84px;

}

.data-type .title.rowHeight2x,
.data-type .data.rowHeight2x.text {

    line-height: 78px;

}

/*.data-type .data.rowHeight2x > label {

	line-height:78px;

}*/

.data-type .title.editer,
.data-type .data.editer {

    height: 320px;

}

.data-type .title.editer {

    line-height: 300px;

}


/*清除parding*/

.padding-clear {

    padding-right: 0px;

    padding-left: 0px;

}


/* 文件上传 */

/*a  upload */

.a-upload {

    padding: 4px 10px;

    height: 35px;

    line-height: 25px;

    position: relative;

    cursor: pointer;

    color: #888;

    background: #fafafa;

    border: 1px solid #ddd;

    border-radius: 4px;

    overflow: hidden;

    display: inline-block;

    *display: inline;

    *zoom: 1

}

.a-upload input {

    position: absolute;

    font-size: 100px;

    right: 0;

    top: 0;

    opacity: 0;

    filter: alpha(opacity=0);

    cursor: pointer

}

.a-upload:hover {

    color: #444;

    background: #eee;

    border-color: #ccc;

    text-decoration: none

}

/* 医疗 */

.search-box {

    display: inline-block

}

.input-sm {

    height: 32px;

}

.btn-create {

    margin-left: 10px;

    background-color: #0abdfe;

    border-color: #0abdfe;

    color: #fff;

}

.btn-create:hover,
.btn-create:active,
.btn-create:focus {

    color: #fff;

}

.pagination {

    margin: 0

}

.medical-modal {

    position: absolute;

    top: 0%;

    left: 0%;

    display: none;

    background: rgba(0, 0, 0, 0.3);

    width: 100%;

    height: 100%;

    position: fixed;

    z-index: 9999

}

.medical-modal .content {

    position: absolute;

    left: 35%;

    top: 25%;

    border-radius: 8px;

    width: 30%;

    height: 40%;

    background-color: #fff;

}

.pageitems, .jump {

    margin-left: 15px;

    display: inline-block;

}

.jumppage {

    width: 30px;

    text-align: center

}

@media (min-width: 768px) {

    .subscribe .modal-dialog {

        width: 900px;

        margin: 30px auto;

    }

}

.checklist {

    margin-top: 10px;

}

.checklist .input-group {

    margin-bottom: 10px;

}

.modal-page {

    margin-top: 20px;

    font-size: 12px;

}

.modal-page .form-control {

    font-size: 12px;

    padding: 0;

    height: 26px;

}

.table-check {

    margin: 0;

    display: inline-block;

    margin-right: 4px;

}

.daterange {

    margin: 10px 10px 0;

}

.daterange .input-group .form-control {

    width: 20%;

}

.chart-title {

    font-size: 16px;

    font-weight: normal;

    text-align: center;

}

.diaocha {

    line-height: 2

}

.diaocha h5 {

    color: #f98d45;

    background: #f5f7f9;

    line-height: 2;

    padding-left: 15px;

}

.diaocha div {

    padding: 0 20px;

    border-bottom: 1px solid #dce1e7;

}

.diaocha div h5 {

    color: #555;

    background: transparent;

    padding-left: 0;

}

.diaocha label {

    font-weight: normal;

}

.diaocha .form-group {

    margin-left: 0;

    margin-right: 0;

}

.diaocha .options label {

    margin-right: 10px;

}


.tizhi button {

    margin-right: 15px;

}

.innerform {

    margin-top: 20px;

}

.fa-search {

    cursor: pointer

}

.line {

    margin-top: 10px;

}

input[type=radio]:focus {

    outline: none

}

input[type="radio"] {

    appearance: none;

    -webkit-appearance: none;

    outline: none;

    display: none

}

label input[type="radio"] {

    content: "\a0";

    display: inline-block;

    vertical-align: middle;

    font-size: 16px;

    width: 15px;

    height: 15px;

    margin-right: .4em;

    border-radius: 50%;

    border: 1px solid #c7c6c6;

    line-height: 1;

    margin-top: -1px;

}

label input[type="radio"]:checked {

    border: 3px solid #0abdfe;

}

.right-menu {

    float: right;

    padding: 18px 30px 0 0;

    color: #fff;

}

.el-dropdown {
    color: #fff;
}

.avatar-wrapper img {
    width: 30px;
    height: 30px;
    border-radius: 15px;
    vertical-align: middle
}

.el-popper[x-placement^=bottom] {
    margin-top: 30px;
}

.el-dropdown-menu__item--divided {
    margin: 0;
    border: 0 none;
    border-bottom: 1px solid #ebeef5
}

.help {

    padding: 0 10px;

}

.help .fa {
    margin-right: 5px;
}

.el-main {

    background: #ecf0f5;

}

.el-menu {
    border: 0 none;
}

.main {

    height: 100vh;

    min-width: 800px;

    min-height: 600px;

    overflow: hidden;

}

.main aside {

    overflow: visible;

    height: 100%;

}

.main aside.isClossTab {

    width: 100%;

    height: 60px;

    cursor: pointer;

    font-size: 25px;

    text-align: center;

    line-height: 60px;

    font-weight: bold;

    border-right: 1px solid #807c7c;

    box-sizing: border-box;

}

.main aside .menu {

    width: 100%;

    border-right: 0;

}

.el-menu .fa {

    vertical-align: middle;

    margin-right: 5px;

    width: 24px;

    text-align: center;

    font-size: 18px;

}

.el-menu-item a {

    color: #303133

}

.el-menu-item:hover, .el-menu-item.is-active {

    color: #fff;

    background: #0abdfe;

}

.el-menu-item:hover a, .el-menu-item.is-active a {

    color: #fff;

}

.el-submenu__title:hover {
    background: none;
}

.main-footer {

    background: #fff;

    padding: 15px 0;

    color: #444;

}

/* title */

.content-header {

    position: relative;

    padding: 15px 15px 0 15px;

    /* margin-top: 70px; */

}

.content-header > h1 {

    margin: 0;

    font-size: 24px;

    font-weight: normal;

}

.content-header > h1 > small {

    font-size: 15px;

    display: inline-block;

    padding-left: 4px;

    font-weight: 300;

}

.content-header > .breadcrumb {

    float: right;

    background: transparent;

    margin-top: 0;

    margin-bottom: 0;

    font-size: 12px;

    padding: 7px 5px;

    position: absolute;

    top: 20px;

    right: 10px;

    border-radius: 2px;

}

/*  */

.app-container {

    background: #fff;

    margin: 15px 30px 15px 15px;


}

.pagiantion {

    text-align: right;

    padding: 15px;

}

.box {

    position: relative;

    border-radius: 3px;

    background: #ffffff;

    border-top: 3px solid #3c8dbc;

    padding: 10px;

    margin-bottom: 20px;

    width: 100%;

    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);

}

.filter-container {

    padding: 10px 0 15px 0;

}

.main-container {
    margin-top: 70px;
}

.filter-container .el-button, .filter-container .el-input__inner {

    padding: 0 15px;

    height: 34px;

    line-height: 34px;

}

.el-aside {
    overflow: hidden;
}

.el-submenu .el-menu-item a {

    display: block;

    height: 50px;

}

.el-menu--collapse .el-submenu__icon-arrow {
    display: none
}

/* .el-container{position: relative;} */

/* foot */

.el-footer {

    position: absolute;

    left: 180px;

    right: 0px;

    bottom: -80px;

}

.boxMain .el-upload--text {

    position: static;

}

.boxMain > div {

    display: inline-block;

}

.excelTitle {

    text-align: center;

    overflow: hidden;

    line-height: 40px;

}

.excelTitle .el-button {

    float: left;

}

.excelTime {

    padding: 10px 0;

    text-align: right;

}

.exceTable {

    width: 100%;

    border-right: 1px solid #e6e6e6;

    border-bottom: 1px solid #e6e6e6;

    font-size: 14px;

    color: #333;

}

.exceTable tr, .exceTable td {

    border-left: 1px solid #e6e6e6;

    border-top: 1px solid #e6e6e6;

    height: 40px;

    line-height: 40px;

    padding: 0 10px;

}

.exceTable .headBody {

    text-align: center;

    font-weight: 700;

    font-size: 14px;

}

.tabletrBg {

    background: #fcfcfc;

    text-align: right;

}

.textCenter {

    text-align: center

}

.checkScrol {

    height: 277px;

    overflow-y: scroll;;

}
</style>