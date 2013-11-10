window.Crossedout = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {  
    Crossedout.users = new Crossedout.Collections.Users();
    Crossedout.tasks = new Crossedout.Collections.Tasks();
    Crossedout.projects = new Crossedout.Collections.Projects();
    Crossedout.teams = new Crossedout.Collections.Teams();
    var that = this;
    Crossedout.projects.fetch({ 
      success: function () {
        new Crossedout.Routers.CrossedOutRouter($(".three-panes"));
        Backbone.history.start();
        Crossedout.users.fetch();
        Crossedout.tasks.fetch();
        Crossedout.teams.fetch();
        that.sidebar();
        },
    });    
  },
  
  sidebar: function() {
    var indexView = new Crossedout.Views.ProjectIndexView({
		  collection: Crossedout.projects
	  });
    var newProjectView = new Crossedout.Views.TeamNewView();
	  
    $(".sidebar").html(indexView.render().$el);
  }
};

$(document).ready(function(){
  Crossedout.initialize();
});
