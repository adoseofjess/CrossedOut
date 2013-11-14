Crossedout.Views.TeamShowView = Backbone.View.extend({
  template: JST["teams/show"],
  
  initialize: function (options) {
    this.model = options.team;
  }, 
  
	events: {
		"click .create-new-team-project": "showCreateTeamProjectForm",
    "click .team-leave-button": "leaveTeam",
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
    
    this.$el.append(newProjectForm.render().$el);
    return this;
  }, 
  
  leaveTeam: function (event) {
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
  
});
