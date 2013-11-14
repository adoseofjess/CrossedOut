Crossedout.Views.Dropdown = Backbone.View.extend({
  template: JST["dropdown"],
  
  initialize: function (options) {
    this.collection = options.teams;
    this.listenTo(this.collection, "remove add change", this.render);
  },
  
	events: {
		"click .overview": "showOverview",
    "click .personal": "showPersonal",
    "click .team": "showTeam",
	},
  
  render: function () {
    var renderedContent = this.template({
      teams: this.collection,
    })
    this.$el.html(renderedContent);
    return this;
  },
    
  showOverview: function (event) {
    console.log("show overview")
    var dropdown = new Crossedout.Views.Dropdown({
      teams: Crossedout.current_user.teams(),
    });
    var indexView = new Crossedout.Views.ProjectIndexView({
		  collection: Crossedout.current_user.projects(),
	  });
    var newProjectView = new Crossedout.Views.TeamNewView({
      collection: Crossedout.current_user.teams(),
    });
    var currentUserTeamsView = new Crossedout.Views.CurrentUserTeamsIndex({
      teams: Crossedout.current_user.teams(),
    });
    
    $(".sidebar").html("")
    $(".sidebar").append(dropdown.render().$el);
    $(".sidebar").append(indexView.render().$el);
    $(".sidebar").append(currentUserTeamsView.render().$el);
  },
  
  showPersonal: function (event) {
    event.preventDefault();
    console.log("show personal")
    var dropdown = new Crossedout.Views.Dropdown({
      teams: Crossedout.current_user.teams(),
    });
    var indexView = new Crossedout.Views.ProjectIndexView({
		  collection: Crossedout.current_user.projects(),
	  });
    $(".sidebar").html("")
    $(".sidebar").append(dropdown.render().$el);
    $(".sidebar").append(indexView.render().$el);
    
  },
  
  showTeam: function (event) {
    console.log("show team")
    var team = this.collection.get(parseInt($(event.currentTarget).attr("data-id")))
    var dropdown = new Crossedout.Views.Dropdown({
      teams: Crossedout.current_user.teams(),
    });
    var currentUserTeamsView = new Crossedout.Views.CurrentUserTeamsIndex({
      teams: Crossedout.current_user.teams(),
    });
    $(".sidebar").html("")
    $(".sidebar").append(dropdown.render().$el);
    $(".sidebar").append(currentUserTeamsView.render().$el);
     
  },
  
  
});
