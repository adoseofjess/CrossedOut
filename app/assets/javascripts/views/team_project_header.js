Crossedout.Views.TeamProjectHeaderView = Backbone.View.extend({
  initialize: function (options) {
    this.model = options.model;
    
  },
  
  template: JST["teams/team_project_header"],
  
  events: {
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
