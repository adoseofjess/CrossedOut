Crossedout.Views.TeamNewView = Backbone.View.extend({
  template: JST["teams/new"],
  
	events: {
		"submit form": "createTeam",
	},
  
  render: function () {
    console.log("new team form rendering")
    var renderedContent = this.template()
    this.$el.html(renderedContent);
    return this;
  },
  
  createTeam: function (event) {
    event.preventDefault();
        
    var formData = $(event.currentTarget).serializeJSON();
		var newTeam = Crossedout.teams.create(formData.project, 
			{
        wait: true,
        success: function () {
          	
      }
    })
  },
  
});
