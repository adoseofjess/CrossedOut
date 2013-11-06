Crossedout.Views.ProjectShowView = Backbone.View.extend({
  template: JST["projects/show"],
  
  events: {
    "click .task-show-link": "showTaskDetail",
    "keypress input[type=text]": "enterTaskInfo"
  },
  
  render: function () {
    var renderedContent = this.template({
      project: this.model,
      tasks: Crossedout.tasks.where({project_id: this.model.id})
    });
    this.$el.html(renderedContent);
    return this;
  },
  
  showTaskDetail: function (event) {
    event.preventDefault();
    var id = parseInt($(event.currentTarget).attr('data-id'))    
    var taskDetailView = new Crossedout.Views.TaskShowView({ model: Crossedout.tasks.get(id) });
    $(".right-pane").html(taskDetailView.render().$el);
  },
  
  enterTaskInfo: function (event) {
    if (event.keyCode !== 13) {
      return;
    }
    console.log($(event.currentTarget).attr("class"))
    console.log($(event.currentTarget).val())
    
    this.model.set($(event.currentTarget).attr("class"), $(event.currentTarget).val())
    this.model.save({}, {
      success: function () { alert("Success!")}
    }, 
    {
      error: function () { alert("No success!") }
    })
    // console.log($(event.currentTarget).attr("class"))
    // console.log($(event.currentTarget).val())    
  },
    
});