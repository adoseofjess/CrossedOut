Crossedout.Views.ProjectIndexView = Backbone.View.extend({
  template: JST["projects/index"],
  
  initialize: function () {
    this.listenTo(Crossedout.projects, "remove add reset change", this.render);
  },
  
  events: {
    "click .project-index-link": "showProjectDetail",
    "click .project-new-link": "showProjectNew",
    "click .delete-project-button": "deleteProject",
  },
  
  render: function () {
    var renderedContent = this.template({
      projects: this.collection
    });
    this.$el.html(renderedContent);
    return this;
  },
  
  showProjectDetail: function (event) {
    event.preventDefault();

    var id = parseInt($(event.currentTarget).attr('data-id'))    
    var projectDetailView = new Crossedout.Views.ProjectShowView({ model: this.collection.get(id) });
    $(".center-pane").html(projectDetailView.render().$el);
  },

  showProjectNew: function(event) {
    event.preventDefault();
    
    var projectNewView = new Crossedout.Views.ProjectNewView();
    $(".center-pane").html(projectNewView.render().$el);
  },
  
  deleteProject: function(event) {
    event.preventDefault();
    
    var project = Crossedout.projects.get(parseInt($(event.currentTarget).attr("data-id")))
    project.destroy({success: function(model, response) {
      console.log("Deleted")
    }})
    
    
  },
});