<template>
  <div id="news">
    <el-form v-model="newsForm" label-width="50px">
      <el-row class="form-item">
        <el-col :span="1">标题</el-col>
        <el-col :span="23">
          <el-input v-model="newsForm.title" placeholder="请输入新闻标题" />
        </el-col>
      </el-row>
      <el-row class="form-item">
        <el-col :span="1">内容</el-col>
        <el-col :span="23" style="background-color: white">
          <vue-editor id="editor" v-model="newsForm.content"></vue-editor>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="gotoNewsList()">返回</el-button>
      <el-button type="primary" @click="addNews()">确 定</el-button>
    </div>
  </div>
</template>
<script>
import { VueEditor } from 'vue2-editor'
export default {
  name: 'AddNews',
  components: {
    VueEditor
  },
  data: () => ({
    newsForm: {
      content: '',
      title: ''
    },
    editorOption: {}
  }),
  mounted () {
  },
  methods: {
    gotoNewsList () {
      return this.$router.push('/user-list')
    },
    addNews (file) {
      this.$axios.post('/vue/news', {data: this.newsForm}).then(result => {
        console.log(result)
        let url = result.data.filePath // Get url from response
        console.log(url)
      })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
  #content-editor {
    background-color: white;
  }
  #editor{
    height: 500px;
    background-color: white;
  }
  .form-item {
    margin-top: 10px;
  }
  #news {
  }
  .dialog-footer {
    margin-top: 10px;
  }
</style>
