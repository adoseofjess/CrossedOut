Crossedout.Views.CurrentUserTeamsIndex = Backbone.View.extend({
  initialize: function (options) {
    this.collection = options.teams;
    this.listenTo(this.collection, "remove add change", this.render);
    // this.listenTo(Crossedout.current_user.projects(), "remove add change", this.render)
  }, 
  
  template: JST["teams/current_user_teams"],
  
	events: {
    "click .team-show-link": "showTeamDetail",
    "click .leave-team": "leaveTeam",
    "click .team-project-link": "showProjectDetail",
    "click .new-team-link": "createNewTeam",
    "click .invite-manage-members": "inviteManageMembers",
    "click .maximize": "maximizePane",
    "click .minimize": "minimizePane",
	},
  
  
  render: function () {
    var renderedContent = this.template({
      current_user: Crossedout.current_user
    })
    this.$el.html(renderedContent);
    return this;
  },
  
  showTeamDetail: function (event) {
    console.log("in show team detail")
    event.preventDefault();
    // $(".center-pane").toggleClass("focus");
    var team = this.collection.get(parseInt($(event.currentTarget).attr("data-id")))
    var TeamDetailView = new Crossedout.Views.TeamShowView({team: team});
    var TeamHeaderView = new Crossedout.Views.TeamShowHeaderView({team: team});
    var AddTeamMembers = new Crossedout.Views.AddMemberView({team: team});
    // var TeamProjects = new Crossedout.Views.TeamProjectsShowView({projects: team.projects()});
    var TeamMembers = new Crossedout.Views.TeamMembersShowView({team: team})
    $(".content-header").html(TeamHeaderView.render().$el);
    // $(".content-right-pane").html("")
    // $(".content-left-pane").html(TeamDetailView.render().$el);
    // $(".content-left-pane").append(TeamProjects.render().$el);
    // $(".content-right-pane").html(TeamMembers.render().$el);
    // $(".content-right-pane").append(AddTeamMembers.render().$el);
    $(".left-header").html("<span class='header-text'>Projects</span>")
    $(".right-header").html("<span class='header-text'>Members</span>")
    $(".pane-right-not-header").html("")
    $(".pane-left-not-header").html(TeamDetailView.render().$el);
    $(".pane-right-not-header").html(TeamMembers.render().$el);
    $(".pane-right-not-header").append(AddTeamMembers.render().$el);
  },
  
  leaveTeam: function (event) {
    console.log("leave team")
    var that = this;
    var team = this.collection.get(parseInt($(event.currentTarget).attr("data-id")))
    team.members().remove(Crossedout.current_user);  
    this.collection.remove(team);
    
    $.ajax({
      url: "/teams/" + team.get("id") + "/users/" + Crossedout.current_user.id,
      type: "DELETE",
      success: function () {  
        $("content-header").html("");
        $("left-header").html("");
        $("right-header").html("");
        $("pane-left-not-header").html("");
        $("pane-right-not-header").html("");   
      }
    });
  },
  
  showProjectDetail: function (event) {
    event.preventDefault();
    var team = this.collection.get(parseInt($(event.currentTarget).attr("data-team-id")))
    var project = team.projects().get(parseInt($(event.currentTarget).attr("data-project-id")))
    var ProjectShowView = new Crossedout.Views.ProjectShowView({model: project})
    // $(".content-left-pane").html(ProjectShowView.render().$el)
    
    $(".pane-left-not-header").html(ProjectShowView.render().$el)
  },    
  
  createNewTeam: function (event) {
    event.preventDefault();
    // $(".content-right-pane").html("")
    var newTeamHeader = new Crossedout.Views.NewTeamHeaderView();
    // $(".content-header").html(newTeamHeader.render().$el);
    // $(".center-pane").toggleClass("focus");
    var newTeamForm = new Crossedout.Views.TeamNewView({ collection: Crossedout.current_user.teams() });
    // $(".content-left-pane").html(newTeamForm.render().$el)
    
    $(".content-header").html("");
    $(".left-header").html("<span class='header-text'>Create Team</span>")  
    $(".pane-left-not-header").html(newTeamForm.render().$el);
    $(".pane-right-not-header").html("");
    $(".right-header").html("");
        
  },
  
  inviteManageMembers: function (event) {
    
    var team = this.collection.get(parseInt($(event.currentTarget).attr("data-id")))
    var teamMembers = new Crossedout.Collections.Users(team.members().models);
    var addManageMembersModal = new Crossedout.Views.TeamAddMemberModalView({model: team, collection: teamMembers});
    
    $("#modal").html(addManageMembersModal.render().$el);
    $("#myModal").modal({show: true, backdrop: false});
  },
  
  maximizePane: function (event) {
    // $(".content-left-pane").css({"right": "200px", "width": "75%"});
    this.$el.find(".my-teams-header").before("<div class='minimize'><button><span class='glyphicon glyphicon-chevron-right'></span></button></div")
    this.$el.find(".maximize").html("")
    $(".content-left-pane").animate({"margin-left": "-22%", "width": "59%"}, 1000)
  },
  
  minimizePane: function (event) {
    this.$el.find(".my-teams-header").before("<div class='maximize'><button><span class='glyphicon glyphicon-chevron-left'></span></button></div")
    this.$el.find(".minimize").html("")
    $(".content-left-pane").animate({"margin-left": "5%", "width": "32%"}, 1000)
  },
});
