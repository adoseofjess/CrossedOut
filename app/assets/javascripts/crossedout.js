window.Crossedout = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    alert("Hello from Backbone!")
    
    Crossedout.users = new Crossedout.Collections.Users();
    Crossedout.tasks = new Crossedout.Collections.Tasks();
    Crossedout.projects = new Crossedout.Collections.Projects();
    console.log("About to fetch")
    var that = this;
    Crossedout.projects.fetch({ 
      success: function () {
        console.log("Crossedout.projects: ", Crossedout.projects)
        new Crossedout.Routers.CrossedOutRouter($(".three-panes"));
        Backbone.history.start();
        Crossedout.users.fetch();
        Crossedout.tasks.fetch();
        that.sidebar();
        },
    });
    // $.when(Crossedout.users.fetch(), Crossedout.tasks.fetch(), Crossedout.projects.fetch()).then(function() {
    //   new Crossedout.Routers.CrossedOutRouter($(".content"));
    //   
    //   this.sidebar();
    //   Backbone.history.start();
    //   console.log(Crossedout.users.length, Crossedout.tasks.length, Crossedout.projects.length);
    // })
    
  },
  
  sidebar: function() {
    var indexView = new Crossedout.Views.ProjectIndexView({
		  collection: Crossedout.projects
	  });
	  $(".sidebar").html(indexView.render().$el);
  }
};

$(document).ready(function(){
  Crossedout.initialize();
});
