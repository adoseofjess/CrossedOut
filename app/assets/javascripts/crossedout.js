window.Crossedout = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {  
    Crossedout.users = new Crossedout.Collections.Users();
//     Crossedout.tasks = new Crossedout.Collections.Tasks();
//     Crossedout.projects = new Crossedout.Collections.Projects();
//     Crossedout.teams = new Crossedout.Collections.Teams();
//     Crossedout.userteamjoins = new Crossedout.Collections.UserTeamJoins();
    // var current_user = JSON.parse($("#bootstrapped_current_user_json").html());
    var userData = JSON.parse($("#bootstrapped_current_user_json").html());
    Crossedout.current_user = new Crossedout.Models.User(userData, { parse: true });

    console.log(Crossedout.current_user)
    var that = this;
    new Crossedout.Routers.CrossedOutRouter($(".three-panes"));
    Backbone.history.start();
    this.sidebar();
    Crossedout.users.fetch();
    // Crossedout.projects.fetch({ 
    //   success: function () {

    //     Crossedout.users.fetch();
    //     Crossedout.tasks.fetch();
    //     Crossedout.teams.fetch();
    //     Crossedout.userteamjoins.fetch({
    //       success: function () {
    //           that.sidebar();
    //       }
    //     });
    //     
    //     },
    // });    
  },
  
  sidebar: function() {

    var indexView = new Crossedout.Views.ProjectIndexView({
		  collection: Crossedout.current_user.projects(),
	  });
    var newProjectView = new Crossedout.Views.TeamNewView({
      collection: Crossedout.current_user.teams()
    });
    var currentUserTeamsView = new Crossedout.Views.CurrentUserTeamsIndex({
      collection: Crossedout.current_user.teams()
    });
    
    $(".sidebar").html(indexView.render().$el);
    $(".sidebar").append(currentUserTeamsView.render().$el);
  }
};

$(document).ready(function(){
  Crossedout.initialize();
});
