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
    var ProjectShowHeader = new Crossedout.Views.ProjectHeaderView({model: newProject});
    var ProjectShowView = new Crossedout.Views.ProjectShowView({model: newProject});
    $(".content-header").html(ProjectShowHeader.render().$el);
    $(".left-header").html("<span class='header-text'>Tasks</span>");
    $(".pane-left-not-header").html(ProjectShowView.render().$el);
  },
  
});
