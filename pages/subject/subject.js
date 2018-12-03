
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
        showImageHeights: [],
        current: "",
        pd: "",
        title: ""
    },
  //事件处理函数
    imageLoad: function (e) {
        // var windowWidth =  wx.getSystemInfoSync().screenWidth
        var curImgHgt = e.detail.height
        var curImgWth = e.detail.width
        var showImageHeight = 675/curImgWth*curImgHgt
        this.data.showImageHeights.push(showImageHeight)
        this.setData({
            showImageHeights: this.data.showImageHeights
        })  
        console.log(this.data.showImageHeights)
    },
    bindchange: function (e) {
        this.setData({
            current: e.detail.current
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
            url: 'https://www.1958xy.com/mini/getSubjectInfo/' + id,
            data: {}, //发送给后台的数据,
            header: {
              "Content-Type": "application/json"
            }, //请求头
            method: "GET",
            success: function (res) { 
                if (res.data) {
                    var title = res.data.NAME
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
