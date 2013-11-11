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
    Crossedout.userteamjoins = new Crossedout.Collections.UserTeamJoins();
    // var current_user = JSON.parse($("#bootstrapped_current_user_json").html());
    
    Crossedout.current_user = new Crossedout.Models.User(JSON.parse($("#bootstrapped_current_user_json").html()))
    // debugger
    
    
    var that = this;
    Crossedout.projects.fetch({ 
      success: function () {
        new Crossedout.Routers.CrossedOutRouter($(".three-panes"));
        Backbone.history.start();
        Crossedout.users.fetch();
        Crossedout.tasks.fetch();
        Crossedout.teams.fetch();
        Crossedout.userteamjoins.fetch();
        // $(".sidebar").html(new Crossedout.Views.CurrentUserTeamsShow(current_user));
        // debugger
        that.sidebar();
        },
    });    
  },
  
  sidebar: function() {
    // this.current_user = current_user
    var indexView = new Crossedout.Views.ProjectIndexView({
		  collection: Crossedout.projects
	  });
    var newProjectView = new Crossedout.Views.TeamNewView();
    var currentUserTeamsView = new Crossedout.Views.CurrentUserTeamsShow(Crossedout.current_user);
    $(".sidebar").html(indexView.render().$el);
    $(".sidebar").append(currentUserTeamsView.render().$el);
  }
};

$(document).ready(function(){
  Crossedout.initialize();
});
