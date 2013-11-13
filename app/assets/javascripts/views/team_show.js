Crossedout.Views.TeamShowView = Backbone.View.extend({
  template: JST["teams/show"],
  
  initialize: function (team) {
    this.team = team;
  }, 
  
	events: {
		
	},
  
  render: function () {
    
    var renderedContent = this.template({ 
      team: this.team,
      
    })
    this.$el.html(renderedContent);
    return this;
  },  
});
