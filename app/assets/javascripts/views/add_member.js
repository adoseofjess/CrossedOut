Crossedout.Views.AddMemberView = Backbone.View.extend({
  template: JST["teams/addmember"],
  
  initialize: function (team) {
    this.team = team;
  }, 
  
	events: {
		"submit form": "addMember",
	},
  
  render: function () {
    var renderedContent = this.template( { team: this.team } )
    this.$el.html(renderedContent);
    return this;
  },
  
  addMember: function (event) {
    event.preventDefault();
    console.log("HIIII")
        
    var formData = $(event.currentTarget).serializeJSON();
		var newTeamMember = Crossedout.userteamjoins.create(formData.userteamjoin, 
			{
        wait: true,
        success: function () {
          console.log("User team join made")
      }
    })
  },
  
});
