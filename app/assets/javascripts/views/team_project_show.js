Crossedout.Views.TeamProjectShowView = Backbone.View.extend({
  initialize: function (options) {
    this.model = options.model;
    this.listenTo(this.model, "remove add reset taskChange", this.render);  
    this.listenTo(this.model.tasks(), "remove add reset taskChange", this.render);    
  },
  
  template: JST["teams/team_project_show"],
  
  events: {
    // "click .task-input": "showTaskDetail",
   //  "keyup input": "enterProjectOrTaskInfo",
   //  "click .add-new-task": "createNewInput",
    "click .delete-project-button": "deleteProject",
    // "mouseenter .task-show-link": "showTaskDetail",
  },
  
  render: function () {
    
    var renderedContent = this.template({
      project: this.model,
      tasks: this.model.tasks(),
    });
    this.$el.html(renderedContent);
    return this;
  },
  
  deleteProject: function(event) {
    event.preventDefault();
    this.remove();
    this.model.destroy({success: function(model, response) {
      console.log("Deleted")
    }})
  },
  
});