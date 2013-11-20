Crossedout.Views.ProjectEditView = Backbone.View.extend({
  initialize: function (options) {
    this.model = options.model;
    // this.listenTo(this.model, "remove add reset taskChange", this.render);  
//     this.listenTo(this.model.tasks(), "remove add reset taskChange", this.render);
    this.$el = $("<div class=\"header-container\"></div>")    
  },
  
  template: JST["projects/edit"],
  
  events: {
    "submit form": "updateProject"
  },
  
  render: function () {
    // $(".trashcan").html("<div class="trashcan-icon"><i class="fa fa-trash-o"></i></div>")
    var renderedContent = this.template({
      project: this.model,
    });
    this.$el.html(renderedContent);
    return this;
    
  },
  
  updateProject: function (event) {
    event.preventDefault();
    
    var formData = $(event.currentTarget).serializeJSON();
    var that = this;
    this.model.save({project: formData.project}, {
      success: function () {

        var UpdatedProjectShowHeader = new Crossedout.Views.ProjectHeaderView({model: that.model})
        var UpdatedProjectShowView = new Crossedout.Views.ProjectShowView({model: that.model})
        $(".content-header").html(UpdatedProjectShowHeader.render().$el);
        $(".pane-left-not-header").html(UpdatedProjectShowView.render().$el);
        
      }
    })
    
    // this.model.destroy({
    //   success: function () {
    //     $(".content-header").html("");
    //     $(".content-left-pane").html("");
    //   }
    // })
  },
  
});
