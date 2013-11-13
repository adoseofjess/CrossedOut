Crossedout.Views.TeamShowView = Backbone.View.extend({
  template: JST["teams/show"],
  
  initialize: function (options) {
    this.model = options.team;
  }, 
  
	events: {
		"click .create-new-team-project": "showCreateTeamProjectForm",
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
  
});
