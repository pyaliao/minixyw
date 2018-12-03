const app = getApp()
Page({
    data: {
        listFlag: true,
        hotVal: 3,
        videoTitle:"",
        videoDetail:"",
        id: "",
        titles: [
            "播放列表",
            "推荐"
        ],
        state: "",
        color: "#00a5e0",
        videoUrl: "",
        pageGesture: true,
        direction: -90,
        movieName: "",
        scrollHeight: "",
        videoInfo: [     
        ],
        recommend: [
        ]
    },
    showList: function () {
        this.setData({
          listFlag: !this.data.listFlag,
        })
    },
    tab: function (e) {
        var that = this
        var key = e.currentTarget.dataset.key
        that.setData({
            state: key
        })
        wx.request({
            url: 'https://www.1958xy.com:80/mini/getPlayInfo/' + this.data.id,
            data: {}, //发送给后台的数据,
            header: {
              "Content-Type": "application/json"
            }, //请求头
            method: "GET",
            success: function (res) {
                var data = res.data
                var avList = res.data.avList
                var suggestList = res.data.suggestList
                var PlayURL = res.data.PlayURL
                
                if (that.data.state == '0') {
                    that.setData({
                        videoInfo: avList,
                        videoUrl: PlayURL    
                    })
                }
                if (that.data.state == '1') {
                    that.setData({
                        recommend: suggestList,
                        videoUrl: PlayURL
                    })
                }
            },
            fail: function () {
              console.log("数据请求失败！")
            } 
        })
    },
    onLoad: function (option) {
        var that = this
        var id = option.id
        wx.request({
            url: 'https://www.1958xy.com/mini/getPlayInfo/' + id,
            // url: 'http://localhost/mini/getPlayInfo/' + id,
            data: {}, //发送给后台的数据,
            header: {
              "Content-Type": "application/json"
            }, //请求头
            method: "GET",
            success: function (res) {
                var data = res.data
                var avList = res.data.avList
                var suggestList = res.data.suggestList
                var PlayURL = res.data.PlayURL
                var movieName = res.data.MovieName
                console.log(res.data)
                var hotVal = res.data.vpd.HOT
                var videoTitle = res.data.vpd.TITLE
                var videoDetail = res.data.vpd.DESCRIPTION
                that.setData({
                    videoInfo: avList,
                    recommend: suggestList,
                    videoUrl: PlayURL,
                    id: id,
                    movieName:videoDetail,
                    hotVal: hotVal ? hotVal: 3,
                    videoTitle: videoTitle ,
                    videoDetail: videoDetail ? videoDetail: '抱歉，暂时没有简介！'
                })
                wx.setNavigationBarTitle({
                    title: that.data.videoTitle
                })
            },
            fail: function () {
              console.log("数据请求失败！")
            } 
        })

        let selector = wx.createSelectorQuery()
        selector.select('.xyVideoBox').boundingClientRect()
        selector.exec((res) => {
            // console.log('********', wx.getSystemInfoSync())
            var xyVideoBoxHeight = res[0].height
            var screenHeight = wx.getSystemInfoSync().windowHeight
            var scrollHeight = screenHeight - xyVideoBoxHeight
            console.log(scrollHeight)
            that.setData({
                scrollHeight: scrollHeight
            })
        })
    }
})