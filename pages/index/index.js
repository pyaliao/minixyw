//index.js
//获取应用实例
//swiperHeight用来动态指定swiper的高度，wxml文件暂时去掉该数据的渲染,该变量的单位为px
//wxml中也去掉了轮播图图片的bindLoad事件绑定
const app = getApp()

Page({
  data: {
    listFlag: true,
    listName: app.globalData.listName,
    indicatorDots: true,
    indicatorColor: 'rgb(255,255,255)',
    indicatorActiveColor: '#ff0000',
    autoplay: true,
    interval: 3000,
    duration: 500,
    circular:true,
    swiperHeight: "",
    swiper: {
      image: [
      ]
    },
    recommend:{
      image: [
      ],
      imageTitle: "", 
    },
    movie:{
      image: [
      ],
      imageTitle: "", 
    },
    wenhua:{
      image: [
      ],
      imageTitle: "", 
    },
    yuanchuang:{
      image: [
      ],
      imageTitle: "", 
    },
    bangyang: {
      image: [
      ],
      imageTitle: "", 
    },
    music: {
      image: [
      ],
      imageTitle: "", 
    },
    lvyou: {
      image: [
      ],
      imageTitle: "", 
    },
    tiyu: {
      image: [
      ],
      imageTitle: "", 
    },
    jiaoyu: {
      image: [
      ],
      imageTitle: "", 
    },
    quanzi: {
      image: [
      ],
      imageTitle: "", 
    },
  },
  //事件处理函数
  showList: function () {
    this.setData({
      listFlag: !this.data.listFlag,
    })
  },
  imageLoad: function (e) {
      var windowWidth =  wx.getSystemInfoSync().screenWidth
      var curImgHgt = e.detail.height
      var curImgWth = e.detail.width
      var showImageHeight = windowWidth/curImgWth*curImgHgt
      this.setData({
        swiperHeight: showImageHeight
      })
  },
  setInfo: function (res, pagename, modname) {
    var that = this
    var image = []
    var count = 0
    var to
    res.data.video_block_list.forEach((value, index) => {
      if (value.BLOCKS_PATH && value.BLOCKS_PATH.indexOf(app.globalData.blocksPath[pagename][modname]) !== -1 && value.M_PIC !== "" && value.M_ODR > 0) {
        switch (value.TYPE) {
            case 'video':
                to = '/pages/video/video?id=' + value.VIDEO_ID 
                break
            case 'subject':
                to = '/pages/subject/subject?id=' + value.SUBJECT_ID
                break
            case 'news':
                to = '/pages/activity/activity?id=' + value.ACTIVITY_ID
                break
        }      
        var obj = {
          text: value.TITLE,
          imageUrl: value.M_PIC,
          to: to
        }
        image[count++] = obj 
      }
    })

    var title
    var imageTitle = modname + '.imageTitle'
    var images = modname + '.image'
    switch (modname) {
      case 'recommend':
          title = res.data.titleArr[0]
          break
      case 'movie':
          title = res.data.titleArr[1]
          break
      case 'wenhua':
          title = res.data.titleArr[2]
          break
      case 'yuanchuang':
          title = res.data.titleArr[3]
          break
      case 'bangyang':
          title = res.data.titleArr[4]
          break
      case 'music':
          title = res.data.titleArr[5]
          break
      case 'lvyou':
          title = res.data.titleArr[6]
          break
      case 'tiyu':
          title = res.data.titleArr[7]
          break
      case 'jiaoyu':
          title = res.data.titleArr[8]
          break
      case 'quanzi':
          title = res.data.titleArr[9]
          break
    }
    if (modname != 'swiper') {
      that.setData({
        [images]: image,
        [imageTitle]: title
      })
    } else {
      that.setData({
        [images]: image,
      })
    }
  },
  onShow: function () {
    
  },
  onLoad: function () {
    var that = this
    wx.request({
      // url: 'http://localhost/mini/toMiniProgram/xy',
      url: "https://www.1958xy.com/mini/toMiniProgram/xy",
      data: {}, //发送给后台的数据,
      header: {
        "Content-Type": "application/json"
      }, //请求头
      method: "GET",
      success: function (res) {
        //渲染轮播图模块
        that.setInfo(res, 'index', 'swiper')
        //渲染推荐模块
        that.setInfo(res, 'index', 'recommend')
        //渲染电影模块
        that.setInfo(res, 'index', 'movie')
        //渲染文化模块
        that.setInfo(res, 'index', 'wenhua')
        //渲染原创模块
        that.setInfo(res, 'index', 'yuanchuang')
        //渲染榜样模块
        that.setInfo(res, 'index', 'bangyang')
        //渲染音乐模块
        that.setInfo(res, 'index', 'music')
        //渲染旅游模块
        that.setInfo(res, 'index', 'lvyou')
        //渲染体育模块
        that.setInfo(res, 'index', 'tiyu')
        //渲染教育模块
        that.setInfo(res, 'index', 'jiaoyu')
        //渲染圈子模块
        that.setInfo(res, 'index', 'quanzi')
      },
      fail: function () {
        console.log("数据请求失败！")
      }  
    })
  }
})
