Crossedout.Views.TaskShowView = Backbone.View.extend({
  initialize: function () {
    this.listenTo(Crossedout.tasks, "remove add reset projectChange", this.render);	
    this.listenTo(Crossedout.tasks, "projectShift", this.renderNew);
  },
  
  template: JST["tasks/show"],
  
  events: {
  "keyup input": "enterTaskInfo",
  },
  
  render: function () {
    console.log("right-pane rerendering")
    var renderedContent = this.template({
      task: this.model,
    });
    this.$el.html(renderedContent);
    return this;
  },
  
  enterTaskInfo: function (event) {
    if (event.keyCode !== 13) {
      this.model.set($(event.currentTarget).attr("class"), $(event.currentTarget).val())
      Crossedout.tasks.trigger("taskChange");
    }
    else {
      event.preventDefault();
    
      this.model.set($(event.currentTarget).attr("class"), $(event.currentTarget).val())
      this.model.save({}, {
        success: function () { alert("Success!")}
      }, 
      {
        error: function () { alert("No success!") }
      })
    }
    
  },
  
  renderNew: function (taskId) {
    this.model = Crossedout.tasks.get(taskId)
    this.render();
  },
    
});