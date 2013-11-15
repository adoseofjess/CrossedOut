Crossedout.Views.TeamProjectsShowView = Backbone.View.extend({
  template: JST["teams/projects_show"],
  
  initialize: function (options) {
    this.collection = options.projects;
    
    this.listenTo(this.collection, "add remove change", this.render);
  }, 
  
	events: {
    "click .delete-team-project-button": "deleteProject",
    "click .project-show": "showProjectDetail",
    
	},
  
  render: function () {
    
    var renderedContent = this.template({ 
      projects: this.collection,      
    })
    this.$el.html(renderedContent);
    return this;
  },  
  
  // deleteProject: function (event) {
  //   var project = this.collection.get(parseInt($(event.currentTarget).attr("data-id")));
  //   project.destroy({success: function(model, response) {
  //     console.log("Deleted")
  //   }})
  // },
  
  showProjectDetail: function (event) {
    debugger
    event.preventDefault();
    var project = this.collection.get(parseInt($(event.currentTarget).attr("data-id")))
    var ProjectTasksView = new Crossedout.Views.TeamProjectTasksShowView({project: project});
    $(".content-right-pane").html(ProjectTasksView.render().$el);
    
    
  },
});
