const userRules = {
  userName: [
    // { validator: validateName, trigger: 'blur' }
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在3到20之间', trigger: 'blur' }
  ],
  nickName: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 3, max: 20, message: '昵称长度在3到20之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码最短为6位', trigger: 'blur' }
  ],
  age: [
    { type: 'number', message: '必须是数字', trigger: 'blur' }
  ],
  phoneNumber: [
    { type: 'number', message: '必须是数字', trigger: 'blur' },
    { len: 11, message: '手机号长度为11位', trigger: 'blur' }
  ],
  email: [
    { type: 'email', message: '必须符合邮箱格式', trigger: 'blur' }
  ],
  address: [
    { max: 50, message: '最大长度为50', trigger: 'blur' }
  ]
}

export default {
  userRules
}
