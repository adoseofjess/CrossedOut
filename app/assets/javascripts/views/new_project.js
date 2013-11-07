Crossedout.Views.ProjectNewView = Backbone.View.extend({
  template: JST["projects/new"],
  
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
    console.log("Form submitted")
    
    var formData = $(event.currentTarget).serializeJSON();
		var newPost = Crossedout.projects.create(formData.project, 
			{
        wait: true,
        success: function () {
          console.log("project created!")	
      }
    })
  },
  
});
