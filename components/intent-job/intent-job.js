// components/intent-job/intent-job.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    close: {
      type: Boolean,
      default: false
    }
  },
  observers: {
    'close': function(close){
      this.setData({
        isCloseIntent: close
      });
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    w: 0, //可视屏屏宽
    h: 0, //可视屏屏高
    navInstance: 0,
    secondWidth: 0, //
    isCloseIntent:false,//关闭求职意向
    topSpace: 0, //按钮距离顶部的位置
    buttonHeight: 0,  //按钮的高度,
    intentArray:{
      intent1:['销售代表','销售助理','销售经理/主管','销售总监','电话销售','销售支持','汽车销售','医药代表','医疗器械销售','网络销售','区域销售','渠道专员','销售数据分析','渠道经理/总监','客户经理/主管','大客户经理','团购业务员/经理','销售培训师/讲师'],
      intent2:['客服专员/助理','客服经理/主管','客服总监','售前/售后服务','电话客服','客户关系管理','网络/在线客服','投诉专员','VIP专员']
    },
    showSecondList: [],
    selectedFirst: '',
    checkJob: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //显示子分类
    showCatelogue: function(e){
      var t = e.currentTarget.dataset.intenttype;
      this.setData({
        secondWidth: this.data.w / 2,
        showSecondList: this.data.intentArray['intent' + t],
        selectedFirst: t
      });
    },
    //选择职位
    clickJob: function(e){
      var t = e.currentTarget.dataset.tickindex;
      this.setData({
        checkJob: parseInt(t)
      });
    },
    //关闭求职意向
    choseIntent: function(){
      this.setData({
        isCloseIntent: true
      });
      var _this = this;
      //延迟初始化数据
      var deferInit = setTimeout(function(){
        _this.setData({
          secondWidth: 0,
          showSecondList: [],
          selectedFirst: '',
          checkJob: ''
        });
        clearTimeout(deferInit);
      },500);
      this.triggerEvent('triggerClose');
    }
  },
  //生命周期
  lifetimes: {
    attached: function () {
      var menuButton = wx.getMenuButtonBoundingClientRect();
      var _this = this;
      wx.getSystemInfo({
        success: function (res) {
          _this.setData({
            w: res.screenWidth,
            h: res.screenHeight,
            topSpace: menuButton.top,
            buttonHeight: menuButton.height
          });
        }
      });
    }
  },
  pageLifetimes: {
    show: function () {
      var app = getApp();
      this.setData({
        navInstance: app.globalData.navInstance,
      });
    }
  }
})
