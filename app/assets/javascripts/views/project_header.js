Crossedout.Views.ProjectHeaderView = Backbone.View.extend({
  initialize: function (options) {
    this.model = options.model;
    // this.listenTo(this.model, "remove add reset taskChange", this.render);  
//     this.listenTo(this.model.tasks(), "remove add reset taskChange", this.render);
    this.$el = $("<div class=\"header-container\"></div>")    
  },
  
  template: JST["projects/header"],
  
  events: {
    "click .task-input": "showTaskDetail",  
    "click .remove": "deleteProject",
    "click .edit": "editProject",
  },
  
  render: function () {
    // $(".trashcan").html("<div class="trashcan-icon"><i class="fa fa-trash-o"></i></div>")
    var renderedContent = this.template({
      project: this.model,
    });
    this.$el.html(renderedContent);
    return this;
    
  },
  
  deleteProject: function () {
    this.model.destroy({
      success: function () {
        $(".content-header").html("");
        $(".left-header").html("");
        $(".pane-left-not-header").html("");
      }
    })
  },
  
  editProject: function () {
    var EditProjectView = new Crossedout.Views.ProjectEditView({model: this.model});
    $(".content-header").html(EditProjectView.render().$el);
    
  },

});
