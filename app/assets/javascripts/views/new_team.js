Crossedout.Views.TeamNewView = Backbone.View.extend({
  template: JST["teams/new"],
  
	events: {
		"submit form": "createTeam",
	},
  
  render: function () {
    var renderedContent = this.template()
    this.$el.html(renderedContent);
    return this;
  },
  
  createTeam: function (event) {
    event.preventDefault();

    var formData = $(event.currentTarget).serializeJSON();

    var newTeam = Crossedout.teams.create(formData.team, 
      {
        wait: true,
        success: function () {
          
          $(".sidebar").prepend(new Crossedout.Views.AddMemberView(newTeam).render().$el)
          $(".sidebar").prepend(new Crossedout.Views.TeamShowView(newTeam).render().$el)
          console.log("Team created")  
      }
    })
    
    
  },
  
});
