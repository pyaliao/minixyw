//music.js
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
      image: []
    },
    tingjue:{
      image: [
      ],
      imageTitle: "", 
    },
    gequ:{
      image: [
      ],
      imageTitle: "", 
    },
    xiaosheng:{
      image: [
      ],
      imageTitle: "", 
    },
    yuansheng:{
      image: [
      ],
      imageTitle: "", 
    },
    diantai:{
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
      console.log(curImgWth, curImgHgt, showImageHeight)
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
      case 'tingjue':
          var title = res.data.titleArr[0]
          break
      case 'gequ':
          var title = res.data.titleArr[1]
          break
      case 'xiaosheng':
          var title = res.data.titleArr[2]
          break
      case 'yuansheng':
          var title = res.data.titleArr[3]
          break
      case 'diantai':
          var title = res.data.titleArr[4]
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
      // url: "http://localhost/mini/toMiniProgram/music",
      url: "https://www.1958xy.com/mini/toMiniProgram/music",
      data: {}, //发送给后台的数据,
      header: {
        "Content-Type": "application/json"
      }, //请求头
      method: "GET",
      success: function (res) {
        //渲染轮播图模块
        that.setInfo(res, 'music', 'swiper')
        //渲染体坛最头条模块
        that.setInfo(res, 'music', 'tingjue')
        //渲染足球营地模块
        that.setInfo(res, 'music', 'gequ')
        //渲染篮球部落模块
        that.setInfo(res, 'music', 'xiaosheng')
        //渲染体育牛人模块
        that.setInfo(res, 'music', 'yuansheng')
        //渲染运动健身模块
        that.setInfo(res, 'music', 'diantai')
      },
      fail: function () {
        console.log("数据请求失败！")
      }  
    })
  }
})
