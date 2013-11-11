Crossedout.Views.CurrentUserTeamsShow = Backbone.View.extend({
  template: JST["teams/current_user_teams"],
  
	events: {
    "click .team-show-link": "showTeamDetail",
	},
  
  render: function () {
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
  
});
