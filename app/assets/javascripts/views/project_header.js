Crossedout.Views.ProjectHeaderView = Backbone.View.extend({
  initialize: function (options) {
    this.model = options.model;
    this.listenTo(this.model, "remove add reset taskChange", this.render);  
    this.listenTo(this.model.tasks(), "remove add reset taskChange", this.render);    
  },
  
  template: JST["projects/header"],
  
  events: {
    "click .task-input": "showTaskDetail",  
  },
  
  render: function () {
    // $(".trashcan").html("<div class="trashcan-icon"><i class="fa fa-trash-o"></i></div>")
    var renderedContent = this.template({
      project: this.model,
    });
    this.$el.html(renderedContent);
    return this;
    
  },

});
