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
    
    // $(".center-pane").html(newview.$el);
    // var project = this.collection.get(id)
//     var tasks = Crossedout.tasks.where({project_id: id})
//     var renderedContent = JST["projects/show"]({  
//       project: this.collection.get(id),
//       tasks: Crossedout.tasks.where({project_id: id}),
//     });
//     $(".center-pane").html(renderedContent);
//     return this;
  },
  
  showTaskDetail: function (event) {
    event.preventDefault();
    console.log("showTaskDetail")
  },
});