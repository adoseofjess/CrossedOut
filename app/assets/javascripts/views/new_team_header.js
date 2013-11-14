Crossedout.Views.NewTeamHeaderView = Backbone.View.extend({
  initialize: function () {

  },
  
  template: JST["teams/header"],
  
  events: {
    // "click .task-input": "showTaskDetail",  
  },
  
  render: function () {
    // $(".trashcan").html("<div class="trashcan-icon"><i class="fa fa-trash-o"></i></div>")
    var renderedContent = this.template({
      // project: this.model,
    });
    this.$el.html(renderedContent);
    return this;
    
  },

});
