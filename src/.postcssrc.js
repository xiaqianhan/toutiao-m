/**
 *  PostCSS 配置文件
 */
module.exports = {
  // 配置要使用的PostCSS插件
  plugins: {
    // 配置使用的autoprefixer插件
    // 作用：生成浏览器CSS样式规则前缀
    // VueCLI内部已经配置了autoprefixer
    // 所以又配置了一次，产生冲突了
    // 'autoprefixer': {//autoprefixer 插件的配置
    //     // 配置要兼容到的环境信息
    //     browsers: ['Android>=4.0', 'iOS>=8']
    // },
    // 配置使用postcss-pxtorem插件
    // 作用：把px转为rem
    'postcss-pxtorem': {
      // lib-flexible的REM适配方案：把一行分为10份，每份就是十分之一
      // 所以rootValue应该设置为你的设计稿的宽度的十分之一
      // 比如我们的设计稿为750，所以应该设置为750/10=75
      // 但是Vant建议设置为37.5，为什么？因为Vant是基于375写的
      // 所以必须是37.5，唯一的缺点是使用我们设计稿的尺寸都必须/2

      // 如果是Vant的样式，就是按37.5来转换
      // 如果是我们自己的样式，就是按75来转换
      // 通过查阅文档，我们发现rootValue支持两种类型:
      //  数字:固定的数值
      //  函数:可以动态处理返回
      //      PostCSS处理每个CSS文件的时候都会调用这个函数
      //      它会把被处理的CSS文件相关的信息通过参数传递给
      rootValue ({ file }) {
        // console.log('处理的文件',file)
        // return 37.5
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // rootValue: 37.5,

      // 配置要转换的CSS属性
      // * 表示所有
      propList: ['*']
    }
  }
}
