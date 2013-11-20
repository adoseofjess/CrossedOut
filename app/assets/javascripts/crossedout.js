window.Crossedout = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {  
    Crossedout.users = new Crossedout.Collections.Users();
    var userData = JSON.parse($("#bootstrapped_current_user_json").html());
    var usersData = JSON.parse($("#bootstrapped_all_users_json").html());

    Crossedout.current_user = new Crossedout.Models.User(userData, { parse: true });
    Crossedout.users.reset(usersData);
    // $( ".sidebar" ).resizable();
    new Crossedout.Routers.CrossedOutRouter($(".three-panes"));
    Backbone.history.start();
    this.sidebar();   
  },
  
  sidebar: function() {

    // var dropdown = new Crossedout.Views.Dropdown({
    //   teams: Crossedout.current_user.teams(),
    // });
    
    // var tabs = new Crossedout.Views.Tabs({
    //   teams: Crossedout.current_user.teams(),
    // });
    
    var indexView = new Crossedout.Views.ProjectIndexView({
		  collection: Crossedout.current_user.projects(),
	  });
    var newProjectView = new Crossedout.Views.TeamNewView({
      collection: Crossedout.current_user.teams(),
    });
    var currentUserTeamsView = new Crossedout.Views.CurrentUserTeamsIndex({
      teams: Crossedout.current_user.teams(),
    });
    
    // $(".sidebar").append(dropdown.render().$el);
    $(".sidebar").append(indexView.render().$el);
    $(".sidebar").append(currentUserTeamsView.render().$el);
  }
};

$(document).ready(function(){
  Crossedout.initialize();
});
