Crossedout.Views.TeamNewView = Backbone.View.extend({
  template: JST["teams/new"],
  
  initialize: function(options) {
    this.collection = options.collection;
    this.listenTo(this.collection, "remove add change", this.render);
  }, 
  
	events: {
		"submit form": "createTeam",
	},
  
  render: function () {
    console.log("team new view rendering")
    var renderedContent = this.template()
    this.$el.html(renderedContent);
    return this;
  },
  
  createTeam: function (event) {
    event.preventDefault();
    
    var formData = $(event.currentTarget).serializeJSON();
    var that = this;
    var newTeam = Crossedout.current_user.teams().create(formData.team, 
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
    
    
  },
  
});
