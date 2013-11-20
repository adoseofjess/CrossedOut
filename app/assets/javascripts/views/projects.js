Crossedout.Views.ProjectIndexView = Backbone.View.extend({
  template: JST["projects/index"],
  
  initialize: function (options) {
    this.collection = options.collection;
    this.listenTo(this.collection, "remove add reset change", this.render);
  },
  
  events: {
    "click .project-index-link": "showProjectDetail",
    "click .project-new-link": "showProjectNew",
    "click .create-new-project": "showProjectNew",
    // "click .delete-project-button": "deleteProject",
    // "click .new-team-link": "createNewTeam",
  },
  
  render: function () {
    var renderedContent = this.template({
      projects: this.collection
    });
    this.$el.html(renderedContent);
    return this;
  },
  
  showProjectDetail: function (event) {
    // $(".center-pane").toggleClass("focus");
    console.log("show project detail");
    event.preventDefault();
    
    var id = parseInt($(event.currentTarget).attr('data-id'))    
    
    var projectHeader = new Crossedout.Views.ProjectHeaderView({ model: this.collection.get(id) });
    var projectDetailView = new Crossedout.Views.ProjectShowView({ model: this.collection.get(id) });
     
    $(".content-header").html(projectHeader.render().$el);
    // $(".content-left-pane").html(projectDetailView.render().$el);
    // $(".content-right-pane").html("");
    
    $(".left-header").html("<span class='header-text'>Tasks</span>")    
    $(".pane-left-not-header").html(projectDetailView.render().$el);
    $(".pane-right-not-header").html("");
  },

  showProjectNew: function(event) {
    event.preventDefault();
    var newProjectHeader = new Crossedout.Views.ProjectNewHeader();
    var projectNewView = new Crossedout.Views.ProjectNewView( { collection: Crossedout.current_user.projects()});
    
    // $(".content-header").html(newProjectHeader.render().$el);
    // $(".content-left-pane").html(projectNewView.render().$el);
    // $(".content-right-pane").html("")
    
    $(".content-header").html("");
    $(".right-header").html("");
    $(".left-header").html("<span class='header-text'>Create Project</span>")    
    $(".pane-left-not-header").html(projectNewView.render().$el);
    $(".pane-right-not-header").html("")
    
  },
  
  
  
});