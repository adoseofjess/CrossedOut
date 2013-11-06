Crossedout.Views.TaskShowView = Backbone.View.extend({
  template: JST["tasks/show"],
  
  events: {
  
  },
  
  render: function () {
    var renderedContent = this.template({
      task: this.model,
    });
    this.$el.html(renderedContent);
    return this;
  },
    
});