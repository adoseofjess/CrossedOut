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
      // members: 
    })
    console.log("from teamshowview render")
    console.log(this.team.get("users"))
    this.$el.html(renderedContent);
    return this;
  },  
});
