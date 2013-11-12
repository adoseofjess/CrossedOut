Crossedout.Views.CurrentUserTeamsShow = Backbone.View.extend({
  initialize: function (current_user, collection) {
    this.current_user = current_user;
    this.collection = collection;
    // console.log(current_user.get('teams'))
    // this.listenTo(this.collection, "remove add change", this.render);
  }, 
  
  template: JST["teams/current_user_teams"],
  
	events: {
    "click .team-show-link": "showTeamDetail",
    "click button": "leaveTeam",
	},
  
  render: function () {
    
    console.log("rendering")
    var renderedContent = this.template({
      current_user: Crossedout.current_user
    })
    this.$el.html(renderedContent);
    return this;
  },
  
  showTeamDetail: function (event) {
    event.preventDefault();
    
    var team = Crossedout.teams.get(parseInt($(event.currentTarget).attr("data-id")))
    var TeamDetailView = new Crossedout.Views.TeamShowView(team);
    $(".center-pane").html(TeamDetailView.render().$el);
  },
  
  leaveTeam: function (event) {
    
    var that = this;
    var userteamjoin = this.collection.findWhere({
      team_id: parseInt($(event.currentTarget).attr("data-id")), 
      user_id: this.current_user.id
    })
      
    
    userteamjoin.destroy({
      success: function () {
        console.log("destroyed");
      }, 
      wait: true
    })
    that.collection.remove(userteamjoin);
  },    
  
});
