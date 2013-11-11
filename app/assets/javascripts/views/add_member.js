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
        
    var formData = $(event.currentTarget).serializeJSON();
		var newTeamMember = Crossedout.userteamjoins.create(formData.userteamjoin, 
			{
        wait: true,
        success: function () {
          
          console.log("User team join made")
          
          $.ajax({
            type: 'POST',
            url: '/teams/' + parseInt(formData.userteamjoin.team_id) + '/' + Crossedout.users.get(parseInt(formData.userteamjoin.user_id)).get("username"),
            dataType: 'json',
            success: function (data) {
              console.log("Email sent");
              console.log(data);
            },
            errors: function(xhr, status, error) {
              console.log("ERROR");
              console.log(xhr.responseText);
            }
          })
          
      }
    })
  },
  
});
