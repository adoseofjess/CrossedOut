Crossedout.Views.TaskShowView = Backbone.View.extend({
  initialize: function () {
    this.listenTo(Crossedout.tasks, "remove add reset projectChange", this.render);	
    this.listenTo(Crossedout.tasks, "projectShift", this.renderNew);
  },
  
  template: JST["tasks/show"],
  
  events: {
  "keyup input": "enterTaskInfo",
  "click .completed": "checkTaskOff",
  },
  
  render: function () {
    console.log("right-pane rerendering")
    var renderedContent = this.template({
      task: this.model,
    });
    this.$el.html(renderedContent);
    // this.$el.prepend($('.date-pick').datePicker({clickInput:true}))
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
      this.model.save({})
    }
    
  },
  
  renderNew: function (taskId) {
    this.model = Crossedout.tasks.get(taskId)
    this.render();
  },
  
  checkTaskOff: function (event) {
    var taskId = parseInt($(event.currentTarget).parent().attr("data-id"))
    var task = Crossedout.tasks.get(taskId)
    
    if (task.get("completed")) {
      task.set({
        "completed": false,
        "completed_at": null, 
      })
      task.save({}, {
        success: function () {
          Crossedout.tasks.trigger("projectChange");
        }
      });
    }
    else {
      task.set({
        "completed": true,
        "completed_at": new Date().toDateString(), 
      })
      task.save({}, {
        success: function () {
          Crossedout.tasks.trigger("projectChange");
        }
      });
    }
  }
});