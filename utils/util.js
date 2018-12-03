const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const setInfo = (res, name, blocksPath, setData) => {
  var that = this
    var image = []
    var count = 0
    res.data.msg.forEach((value, index) => {
      if (value.BLOCKS_PATH && value.BLOCKS_PATH.indexOf(blocksPath[name]) !== -1 && value.PIC !== "" && value.M_ODR > 0) {
        var obj = {
          text: value.TITLE,
          imageUrl: value.PIC
        }
        image[count++] = obj 
      }
    })
    var images = name + '.image'
    that.setData({
      [images]: image
    })
}

module.exports = {
  formatTime: formatTime,
  setInfo: setInfo
}
