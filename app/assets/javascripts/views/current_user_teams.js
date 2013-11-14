Crossedout.Views.CurrentUserTeamsIndex = Backbone.View.extend({
  initialize: function (options) {
    this.collection = options.teams;
    this.listenTo(this.collection, "remove add change", this.render);
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
    var TeamHeaderView = new Crossedout.Views.TeamShowHeaderView({team: team});
    var TeamProjects = new Crossedout.Views.TeamProjectsShowView({projects: team.projects()});
    var TeamMembers = new Crossedout.Views.TeamMembersShowView({team: team})
    $(".content-header").html(TeamHeaderView.render().$el);
    $(".content-right-pane").html("")
    $(".content-left-pane").html(TeamDetailView.render().$el);
    $(".content-left-pane").append(TeamProjects.render().$el);
    $(".content-right-pane").html(TeamMembers.render().$el);
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
    $(".content-left-pane").html(ProjectShowView.render().$el)
  },    
  
  createNewTeam: function (event) {
    event.preventDefault();
    $(".content-right-pane").html("")
    var newTeamHeader = new Crossedout.Views.NewTeamHeaderView();
    $(".content-header").html(newTeamHeader.render().$el);
    // $(".center-pane").toggleClass("focus");
    var newTeamForm = new Crossedout.Views.TeamNewView({ collection: Crossedout.current_user.teams() });
    $(".content-left-pane").html(newTeamForm.render().$el)
  },
  
});
