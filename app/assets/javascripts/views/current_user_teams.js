Crossedout.Views.CurrentUserTeamsIndex = Backbone.View.extend({
  initialize: function (options) {
    this.collection = options.teams;
    // console.log(current_user.get('teams'))
    this.listenTo(this.collection, "remove add change", this.render);
    
    //listen to the projects that belong to the teams
    // *fix this*
    this.listenTo(Crossedout.current_user.projects(), "remove add change", this.render)
  }, 
  
  template: JST["teams/current_user_teams"],
  
	events: {
    "click .team-show-link": "showTeamDetail",
    "click button": "leaveTeam",
    "click .team-project-link": "showProjectDetail",
    "click .new-team-link": "createNewTeam",
    
	},
  
  render: function () {
    var renderedContent = this.template({
      current_user: Crossedout.current_user
    })
    this.$el.html(renderedContent);
    return this;
  },
  
  showTeamDetail: function (event) {
    event.preventDefault();
    // $(".center-pane").toggleClass("focus");
    var team = this.collection.get(parseInt($(event.currentTarget).attr("data-id")))
    var TeamDetailView = new Crossedout.Views.TeamShowView({team: team});
    
    var TeamProjects = new Crossedout.Views.TeamProjectsShowView({projects: team.projects()});
    $(".right-pane").html("")
    $(".center-pane").html(TeamDetailView.render().$el);
    $(".center-pane").append(TeamProjects.render().$el);
  },
  
  // leaveTeam: function (event) {
//     
//     var that = this;
//     var team = this.collection.get(parseInt($(event.currentTarget).attr("data-id")))
//     team.members().remove(Crossedout.current_user);  
//     this.collection.remove(team);
//     $.ajax({
//       url: "/teams/" + team.get("id") + "/users/" + Crossedout.current_user.id,
//       type: "DELETE",
//       success: function () {     
//       }
//     });
//   },
  
  showProjectDetail: function (event) {
    event.preventDefault();
    var team = this.collection.get(parseInt($(event.currentTarget).attr("data-team-id")))
    var project = team.projects().get(parseInt($(event.currentTarget).attr("data-project-id")))
    var ProjectShowView = new Crossedout.Views.ProjectShowView({model: project})
    $(".center-pane").html(ProjectShowView.render().$el)
  },    
  
  createNewTeam: function (event) {
    event.preventDefault();
    // $(".center-pane").toggleClass("focus");
    var newTeamForm = new Crossedout.Views.TeamNewView({ collection: Crossedout.current_user.teams() });
    $(".center-pane").html(newTeamForm.render().$el)
  },
  
});
