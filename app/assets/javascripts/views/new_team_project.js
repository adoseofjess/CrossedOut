Crossedout.Views.NewTeamProjectView = Backbone.View.extend({
  template: JST["projects/new_team_project"],
  
  initialize: function (options) {
    this.model = options.team;
  },
  
	events: {
		"submit form": "createTeamProject",
	},
  
  render: function () {
    var renderedContent = this.template({team: this.model})
    this.$el.html(renderedContent);
    return this;
  },
  
  createTeamProject: function (event) {
    event.preventDefault();
    
    var formData = $(event.currentTarget).serializeJSON();
    var that = this;
    var newTeamProject = this.model.projects().create(formData.project, 
      {
        wait: true,
        success: function () {
          that.remove();
          //remove the newteamview
          
          //rerender the user's teams index
          
          // $(".sidebar").prepend(new Crossedout.Views.AddMemberView(newTeam).render().$el)
          // $(".sidebar").prepend(new Crossedout.Views.TeamShowView(newTeam).render().$el)
      }
    })
    
    var newTeamProjectHeader = new Crossedout.Views.TeamProjectHeaderView({model: newTeamProject});
    var newTeamProjectShow = new Crossedout.Views.TeamProjectShowView({model: newTeamProject});
    $(".content-header").html(newTeamProjectHeader.render().$el);
    $(".content-left-pane").html(newTeamProjectShow.render().$el);
    $(".content-right-pane").html("");
  },
  
});
