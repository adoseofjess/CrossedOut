Crossedout.Routers.CrossedOutRouter = Backbone.Router.extend({
  initialize: function (domcontent) {
    this.domcontent = domcontent;
  },
  
  routes: {
    "": "showIndex",
  },
    
  showIndex: function () {
    
  },
  
})