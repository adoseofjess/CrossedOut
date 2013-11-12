Crossedout.Views.ProjectIndexView = Backbone.View.extend({
  template: JST["projects/index"],
  
  initialize: function (options) {
    this.collection = options.collection;
    this.listenTo(this.collection, "remove add reset change", this.render);
  },
  
  events: {
    "click .project-index-link": "showProjectDetail",
    "click .project-new-link": "showProjectNew",
    "click .delete-project-button": "deleteProject",
    "click .new-team-link": "createNewTeam",
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
    
    var project = this.collection.get(parseInt($(event.currentTarget).attr("data-id")))
    project.destroy({success: function(model, response) {
      console.log("Deleted")
    }})
  },
  
  createNewTeam: function (event) {
    event.preventDefault();
    
    var newTeamForm = new Crossedout.Views.TeamNewView();
    $(".sidebar").prepend(newTeamForm.render().$el)
  },
});