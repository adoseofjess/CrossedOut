Crossedout.Views.TeamMembersShowView = Backbone.View.extend({
  template: JST["teams/members_show"],
  
  initialize: function (options) {
    this.model = options.team;
    
    this.listenTo(this.model, "add remove change", this.render);
  }, 
  
	events: {
   
	},
  
  render: function () {
    
    var renderedContent = this.template({ 
      members: this.model.members(),      
    })
    this.$el.html(renderedContent);
    return this;
  },  
});
