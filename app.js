//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    videoID: 0,
    state:'',
    listName: [
      {text:'首页', url: "/pages/index/index"},
      {text:'电影', url: "/pages/movie/movie"},
      {text:'文化', url: "/pages/wenhua/wenhua"},
      {text:'原创', url: "/pages/yc/yc"},
      {text:'榜样', url: "/pages/by/by"},
      {text:'纪录片', url: "/pages/jlp/jlp"},
      {text:'旅游', url: "/pages/ly/ly"},
      {text:'体育', url: "/pages/ty/ty"},
      {text:'音乐', url: "/pages/music/music"},
      {text:'教育', url: "/pages/jy/jy"},
      {text:'美食', url: "/pages/ms/ms"},
      {text:'圈子', url: "/pages/qz/qz"}
    ],
    blocksPath: {
      index: {
        swiper: 'xy_1_mod_focus',
        recommend: 'xy_2_mod_10_1',
        movie: 'xy_3_mod_7',
        wenhua: 'xy_4_mod_10_1',
        yuanchuang: 'xy_5_mod_10_1',
        bangyang: 'xy_6_mod_10_1',
        music: 'xy_7_mod_10_1',
        lvyou: 'xy_8_mod_10_1',
        tiyu: 'xy_9_mod_10_1',
        jiaoyu: 'xy_10_mod_10_1',
        quanzi: 'xy_11_mod_7'
      },
      movie: {
        swiper: 'mv_1_mod_focus',
        recommend: 'mv_2_mod_10_1',
        classic: 'mv_3_mod_7',
        micromovie: 'mv_4_mod_10_1',
        oldmovie: 'mv_5_mod_7'
      },
      wenhua: {
        swiper: 'rw_1_mod_focus',
        recommend: 'rw_111_mod_61',
        guoxue: 'rw_3_mod_5',
        yishu: 'rw_444_mod_5hb',
        minsu: 'rw_4_mod_5',
        lishi: 'rw_5_mod_5',
      },
      yuanchuang: {
        swiper: 'yc_1_mod_focus',
        recommend: 'yc_111_mod_61',
        xiaodian: 'yc_2_mod_5',
        zizhi: 'yc_444_mod_5hb',
        gaoneng: 'yc_4_mod_5',
        yuexiang: 'yc_5_mod_5',
      },
      bangyang: {
        swiper: 'by_1_mod_focus',
        bangyang: 'by_111_mod_61',
        jianshou: 'by_2_mod_5',
        aixin: 'by_444_mod_5hb',
        bufan: 'by_222_mod_61',
        lizhi: 'by_3_mod_5',
        jingye: 'by_4_mod_5',
        chengxin: 'by_5_mod_5',
      },
      jilupian: {
        swiper: 'jlp_1_mod_focus',
        jingxuan: 'jlp_111_mod_61',
        baitai: 'jlp_3_mod_5',
        zhuanji: 'jlp_444_mod_5hb',
        jishi: 'jlp_4_mod_5',
        fengyun: 'jlp_5_mod_5'
      },
      lvyou: {
        swiper: 'ly_1_mod_focus',
        lvxing: 'ly_111_mod_61',
        lvtu: 'ly_222_mod_pin7',
        pinwei: 'ly_3_mod_5',
        manji: 'ly_4_mod_5',
      },
      tiyu: {
        swiper: 'ty_1_mod_focus',
        toutiao: 'ty_2_mod_61',
        zuqiu: 'ty_444_mod_5hb',
        lanqiu: 'ty_5_mod_5',
        niuren: 'ty_6_mod_5',
        jianshen: 'ty_7_mod_5',
      },
      music: {
        swiper: 'music_1_mod_focus',
        tingjue: 'music_111_mod_61',
        gequ: 'music_444_mod_5hb',
        xiaosheng: 'music_4_mod_5',
        yuansheng: 'music_5_mod_5',
        diantai: 'music_2_mod_5',
      },
      jiaoyu: {
        swiper: 'jy_1_mod_focus',
        jineng: 'jy_111_mod_61',
        mingshi: 'jy_33_mod_5',
        yuandi: 'jy_444_mod_5hb',
        daka: 'jy_3_mod_5',
        chengguo: 'jy_6_mod_61',
      },
      meishi: {
        swiper: 'food_1_mod_focus',
        luandun: 'food_111_mod_61',
        liaoli: 'food_3_mod_5',
        chihuo: 'food_333_mod_5',
        mishi: 'food_444_mod_5hb',
        chajiu: 'food_4_mod_5',
        weilei: 'food_5_mod_5',
      },
      quanzi: {
        swiper: 'qz_1_mod_focus',
        huodong: 'qz_2_mod_focus',
        quanzi: 'qz_5_mod_focus',
        shebei: 'qz_6_mod_focus',
      },
    }
  }
})