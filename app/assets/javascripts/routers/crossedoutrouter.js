Crossedout.Routers.CrossedOutRouter = Backbone.Router.extend({
  initialize: function (domcontent) {
    this.domcontent = domcontent;
    console.log("Router initialized")
  },
  
  routes: {
    "": "showIndex",
  },
    
  showIndex: function () {
    
  },
  
})