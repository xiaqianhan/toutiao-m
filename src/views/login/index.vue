<template>
  <div class="login-container">
      <!-- 导航栏 -->
      <van-nav-bar class="page-nav-bar" title="登录"  >
         <van-icon name="arrow-left" size="18" slot="left" @click="$router.back()"/>
      </van-nav-bar>

      <!-- 登陆表单 -->
      <!-- 表单验证
        1、当van-field组件配置rules验证规则
          参考文档
          使用 Field 的rules属性可以定义校验规则，可选属性如下:

          键名          说明  类型
          required  是否为必选字段，当值为空字符串、空数组、undefined、null 时，校验不通过 boolean
          message   错误提示文案                                  string | (value, rule) => string
          validator 通过函数进行校验                              (value, rule) => boolean | string | Promise
          pattern   通过正则表达式进行校验                         RegExp
          trigger   本项规则的触发时机，可选值为 onChange、onBlur   string
          formatter 格式化函数，将表单项的值转换后进行校验           (value, rule) => any
        2、当表单提交的时候会自动触发表单验证
          如果验证通过，会触发submit事件
          如果验证不通过，不会触发submit事件
        3、通过 ref 可以获取到 Form 实例并调用实例方法
       -->
      <van-form ref="loginFrom" @submit="onSubmit">
        <van-cell-group style="margin-top:20px" inset>
            <!-- 代表输入框 \
            v-model：绑定数据；
            name：名；
            label：左侧提示文本；
            placeholder：中间提示信息
            :rules：输入框验证规则，required：必填项，message：验证失败后的提示消息-->
            <van-field
                v-model="user.mobile"
                name="mobile"
                placeholder="请输入手机号"
                :rules="userFormRules.mobile"
                type="number"
                maxlength="11"
            >
            <!-- Slots可自定义插槽，在vant文档Field输入框中有 -->
                <i slot="left-icon" class="toutiao toutiao-shouji"></i>
            </van-field>
            <van-field
                v-model="user.code"
                name="code"
                placeholder="请输入验证码"
                :rules="userFormRules.code"
                type="number"
                maxlength="6"
            >
                <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
                <!-- 插槽 round为圆角 size为button大小，type为button类型-->
                <template #button>
                  <!--
                    time:倒计时事件，单位毫秒
                    v-if:如果是false则不渲染该组件,渲染v-else的组件
                    finish:倒计时结束时触发
                  -->
                    <van-count-down
                      v-if="isCoutDownShow"
                     :time="1000*60"
                      format="ss s"
                      @finish= "isCoutDownShow = flase"
                   />
                    <van-button
                     v-else
                     class="send-sms-btn"
                     native-type="button"
                     round size="small"
                     type="default"
                     @click="onSendSms"
                    >发送验证码</van-button>
                </template>
            </van-field>
        </van-cell-group>
        <div class="login-btn-wrap">
            <!-- round：配置为圆角 -->
            <van-button class="login-btn" block type="primary" native-type="submit">
            登录
            </van-button>
        </div>
      </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () { // 数据
    return {
    //   username: '',
    //   password: ''
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '请填写密码'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      isCoutDownShow: false // 是否展示倒计时
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: { // 方法
    async onSubmit () {
    //   console.log('submit', values)
      // 1、获取表单数据
      // const user = this.user

      // 2、表单验证
      // 在组件中必须通过this.$toast来调用
      this.$toast.loading({
        message: '登陆中...',
        forbidClick: true, // 禁止背景点击
        duratiaon: 0 // 持续时间，默认是2000，如果为0则持续展示
      })

      // 3、提交表单请求登录
      try {
        const { data } = await login(this.user)
        // console.log('登录成功', res)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
        // 登录成功，跳转回原来页面
        // back 的方式不严谨，后面讲功能优化的时候再说
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          // console.log('手机号或验证码错误')
          this.$toast.fail('手机号或验证码错误')
        } else {
          // console.log('登录失败，请稍后重试', err)
          this.$toast.fail('登录失败，请稍后重试')
        }
      }

    // 4、根据请求响应结果处理后续操作
    },

    async onSendSms () {
      // console.log('onSendSms')
      // 1、校验手机号
      // validate：验证表单，支持传入一个或多个 name 来验证单个或部分表单项，不传入 name 时，会验证所有表单项
      try {
        this.$refs.loginFrom.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }

      // 2、验证通过显示倒计时
      this.isCoutDownShow = true

      // 3、请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container{
    .toutiao{
        font-size: 37px;
    }
    .send-sms-btn{
        width: 162px;
        height: 56px;
        line-height: 56px;
        color: #666;
        background-color: #ededed;
    }
    .login-btn-wrap{
        padding: 53px 33px;
        .login-btn{
            background-color: #6db4fb;
            border: none;
        }
    }
}
</style>>
