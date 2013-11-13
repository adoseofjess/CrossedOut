Crossedout.Views.CurrentUserTeamsIndex = Backbone.View.extend({
  initialize: function (options) {
    this.collection = options.collection;
    // console.log(current_user.get('teams'))
    this.listenTo(this.collection, "remove add change", this.render);
  }, 
  
  template: JST["teams/current_user_teams"],
  
	events: {
    "click .team-show-link": "showTeamDetail",
    "click button": "leaveTeam",
	},
  
  render: function () {
    
    console.log("current user team index rendering")
    var renderedContent = this.template({
      current_user: Crossedout.current_user
    })
    this.$el.html(renderedContent);
    return this;
  },
  
  showTeamDetail: function (event) {
    event.preventDefault();
    
    var team = this.collection.get(parseInt($(event.currentTarget).attr("data-id")))
    var TeamDetailView = new Crossedout.Views.TeamShowView(team);
    $(".center-pane").html(TeamDetailView.render().$el);
  },
  
  leaveTeam: function (event) {
    
    var that = this;
    var team = this.collection.get(parseInt($(event.currentTarget).attr("data-id")))
    team.members().remove(Crossedout.current_user);  
    this.collection.remove(team);
    $.ajax({
      url: "/teams/" + team.get("id") + "/users/" + Crossedout.current_user.id,
      type: "DELETE",
      success: function () {
        console.log("Deleted")
       
      }
    });
  },    
  
});
