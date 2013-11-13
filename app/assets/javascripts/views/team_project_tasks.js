Crossedout.Views.TeamProjectTasksShowView = Backbone.View.extend({
  template: JST["teams/team_project_tasks"],
  
  initialize: function (options) {
    this.collection = options.project.tasks();
    
    this.listenTo(this.collection, "add remove change", this.render);
  }, 
  
	events: {
    "click .delete-team-project-button": "deleteProject",
	},
  
  render: function () {
    
    var renderedContent = this.template({ 
      projects: this.collection,      
    })
    this.$el.html(renderedContent);
    return this;
  },  
  
  deleteProject: function (event) {
    var project = this.collection.get(parseInt($(event.currentTarget).attr("data-id")));
    project.destroy({success: function(model, response) {
      console.log("Deleted")
    }})
    
  },
});
