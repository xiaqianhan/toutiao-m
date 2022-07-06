<template>
  <div class="my-container">

    <!-- 已登陆 -->
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <!-- <van-image
            class="avatar"
            src="userInfo.photo"
            round
            fit="cover"
          /> -->
          <van-image
            class="avatar"
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            round
            fit="cover"
          />
          <span class="name">黑马头条</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">
            <!-- {{ userInfo.art_count }} -->
            10
          </span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">
            <!-- {{ userInfo.follow_count }} -->
            10
          </span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">
            <!-- {{ userInfo.fans_count }} -->
            10
          </span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">
            <!-- {{ userInfo.like_count  }} -->
            10
          </span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>

    <!-- 未登录 -->
    <div v-else class="header not-login">
      <div class="longin-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="">
        <span class="text">登录/注册</span>
      </div>
    </div>

    <!-- 导航 -->
    <van-grid class="grid-nav" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>

    <van-cell title="消息通知" is-link />
    <van-cell class="mb-9" title="小智同学" is-link />
    <van-cell
      v-if="user"
      class="logout-cell"
      clickable
      title="退出登录"
      @click="onLogout"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'

export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data () {
    return {
      user: true
      // userInfo: {}
    }// 用户信息
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    // 如果用户登录了，则请求加载用户信息数据
    if (this.user) {
      this.loadUserInfo()
    }
  },
  mounted () {},
  methods: {
    onLogout () {
      // 退出提示
      // 在组件中需要使用 this.$dialog 来调用弹框组件
      this.$dialog.confirm({
        title: '确认退出吗？'
      }).then(() => {
        // on confirm
        // 确认退出：清除登录状态（容器中的 user + 本地存储中的 user）
        this.$store.commit('setUser', null)
      }).catch(() => {
        // on cancel
        console.log('取消执行这里')
      })
    },

    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (err) {
        this.$toast('获取数据失败，请稍后重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.my-container {
  .header {
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;//水平居中
    align-items: center;//垂直居中
    .longin-btn {
      display: flex;
      flex-direction: column;//垂直分布，默认水平分布
      justify-content: center;//水平居中
      align-items: center;//垂直居中
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: fff;
      }
    }
  }
  .user-info {
    .base-info {
      height: 231px;
      padding: 96px 32px 23px;
      box-sizing: border-box;//把pading计算在高度中
      display: flex;
      justify-content: space-between;//往两边撑开
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
        }
        .name {
          font-size: 30px;
          color: #fff;
          margin: 23px;
        }
      }
    }
    .data-stats {
      // height: 130px;
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;//所有子元素平分宽度
        display: flex;
        flex-direction: column;//垂直分布
        justify-content: center;
        align-items: center;
        color: #fff;
        .cout {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    .grid-item {
      height: 141px;
      i.toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
  .logout-cell {
    text-align: center;
    color: #d86262;
  }

  .mb-9 {
    margin-bottom: 9px;
  }
}
</style>
