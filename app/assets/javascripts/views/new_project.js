Crossedout.Views.ProjectNewView = Backbone.View.extend({
  template: JST["projects/new"],
  
  initialize: function (options) {
    this.collection = options.collection;
    this.listenTo(this.collection, "remove add change", this.render);
  },
  
	events: {
		"submit form": "createProject",
	},
  
  render: function () {
    var renderedContent = this.template()
    this.$el.html(renderedContent);
    return this;
  },
  
  createProject: function (event) {
    event.preventDefault();
    console.log("Creating project")    
    var formData = $(event.currentTarget).serializeJSON();
		var newProject = Crossedout.current_user.projects().create(formData.project, 
			{
        wait: true,
        success: function () {
          	
      }
    })
  },
  
});
