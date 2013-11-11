Crossedout.Views.CurrentUserTeamsShow = Backbone.View.extend({
  template: JST["teams/current_user_teams"],
  
	events: {
    
	},
  
  render: function () {
    var renderedContent = this.template({
      current_user: Crossedout.current_user
    })
    this.$el.html(renderedContent);
    return this;
  },
  
});
