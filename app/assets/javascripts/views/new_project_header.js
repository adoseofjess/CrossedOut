Crossedout.Views.ProjectNewHeader = Backbone.View.extend({
  initialize: function () {

  },
  
  template: JST["projects/new_header"],
  
  events: {
    // "click .task-input": "showTaskDetail",  
  },
  
  render: function () {
    var renderedContent = this.template({
    });
    this.$el.html(renderedContent);
    return this;
    
  },

});
