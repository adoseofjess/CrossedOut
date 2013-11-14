Crossedout.Views.TeamShowHeaderView = Backbone.View.extend({
  initialize: function (options) {
    this.model = options.team;
    
  },
  
  template: JST["teams/show_header"],
  
  events: {
  },
  
  render: function () {
    // $(".trashcan").html("<div class="trashcan-icon"><i class="fa fa-trash-o"></i></div>")
    var renderedContent = this.template({
      team: this.model,
    });
    this.$el.html(renderedContent);
    return this;
  },
});
