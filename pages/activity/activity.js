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
        showImageHeight: "",
        pd: "",
        title: ""
    },
  //事件处理函数
    imageLoad: function (e) {
        var windowWidth =  wx.getSystemInfoSync().screenWidth
        var curImgHgt = e.detail.height
        var curImgWth = e.detail.width
        var showImageHeight = windowWidth/curImgWth*curImgHgt
        this.setData({
            showImageHeight: showImageHeight
        })  
    },
    showList: function () {
      this.setData({
        listFlag: !this.data.listFlag,
      })
    },
    onLoad: function (option) {
        var that = this
        var id = option.id
        wx.request({
            // url: 'http://localhost/mini/getActivityInfo/' + id,
            url: 'https://www.1958xy.com/mini/getActivityInfo/' + id,
            data: {}, //发送给后台的数据,
            header: {
              "Content-Type": "application/json"
            }, //请求头
            method: "GET",
            success: function (res) { 
                if (res.data) {
                    var title = res.data.NAME != '' ? res.data.NAME : '西影网'
                    that.setData({
                        pd: res.data,
                        title: title
                    })
                }
                wx.setNavigationBarTitle({
                    title: that.data.title
                })
            },
            fail: function () {
              console.log("数据请求失败！")
            }  
        })
    }
})
