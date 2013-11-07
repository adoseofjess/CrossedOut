Crossedout.Views.ProjectIndexView = Backbone.View.extend({
  template: JST["projects/index"],
  
  initialize: function () {
  },
  
  events: {
    "click .project-index-link": "showProjectDetail",
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
  
  showTaskDetail: function (event) {
    event.preventDefault();
  },
});