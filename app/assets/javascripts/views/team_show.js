Crossedout.Views.TeamShowView = Backbone.View.extend({
  template: JST["teams/show"],
  
  initialize: function (options) {
    this.model = options.team;
    this.listenTo(this.model, "add remove change", this.render);
    this.listenTo(this.model.projects(), "add remove change", this.render);
  }, 
  
	events: {
		"click .create-new-team-project": "showCreateTeamProjectForm",
    "click .team-leave-button": "leaveTeam",
    "click .delete-team-project-button": "deleteProject",
    "click .project-show-link": "showProjectDetail",
	},
  
  render: function () {
    
    var renderedContent = this.template({ 
      team: this.model,
      members: this.model.members(),
      projects: this.model.projects(),
      
    })
    this.$el.html(renderedContent);
    return this;
  },
  
  showCreateTeamProjectForm: function (event) {
    event.preventDefault();
    
    var newProjectForm = new Crossedout.Views.NewTeamProjectView({team: this.model})
    
    this.$el.find(".all-projects").after(newProjectForm.render().$el)
    // this.$el.append(newProjectForm.render().$el);
    return this;
  }, 
  
  leaveTeam: function (event) {
    console.log("LEAVING TEAM")
    
    $(".content-header").html("");
    $(".content-right-pane").html("");
    this.remove();
    
    var that = this;
    event.preventDefault();
    this.model.members().remove(Crossedout.current_user);  
    Crossedout.current_user.teams().remove(this.model);
    $.ajax({
      url: "/teams/" + this.model.get("id") + "/users/" + Crossedout.current_user.id,
      type: "DELETE",
      success: function () { 
      }
    });
  },
  
  deleteProject: function (event) {
    var project = this.model.projects().get(parseInt($(event.currentTarget).attr("data-id")));
    project.destroy({success: function(model, response) {
      console.log("Deleted")
    }})
  },
  
  showProjectDetail: function (event) {
    console.log("SHOW PROJECT DETAIL")
    event.preventDefault();
    var project = this.model.projects().get(parseInt($(event.currentTarget).attr("data-id")))
    var TeamProjectHeader = new Crossedout.Views.TeamProjectHeaderView({model: project})
    var TeamProjectDetailView = new Crossedout.Views.TeamProjectShowView({model: project})
    $(".content-header").html(TeamProjectHeader.render().$el);
    $(".left-header").html("<span class='header-text'>Tasks</span>")
    $(".pane-left-not-header").html(TeamProjectDetailView.render().$el);
    $(".right-header").html("");
    $(".pane-right-not-header").html("");
    
    
  },
  
});
