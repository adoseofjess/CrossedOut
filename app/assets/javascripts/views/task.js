Crossedout.Views.TaskShowView = Backbone.View.extend({
  initialize: function (options) {
    this.model = options.model;
    this.listenTo(this.model, "remove add reset projectChange", this.render);	
    this.listenTo(this.model, "projectShift", this.renderNew);
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
    this.getDatePicker();
    // this.$el.prepend($('.date-pick').datePicker({clickInput:true}))
    return this;
  },
  
  enterTaskInfo: function (event) {
    if (event.keyCode !== 13) {
      this.model.set($(event.currentTarget).attr("class"), $(event.currentTarget).val())
      this.model.set("due_date", $(".datepicker").datepicker( "getDate" ))
      this.model.trigger("taskChange");
    }
    else {
      event.preventDefault();
      
      this.model.set($(event.currentTarget).attr("class"), $(event.currentTarget).val())
      this.model.set("due_date", $(".datepicker").datepicker( "getDate" ))
      this.model.save({})
    }
  
  },
  
  renderNew: function (model) {
    this.model = model
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
  },
  
  getDatePicker: function () {
      this.$el.find('.datepicker').datepicker();
  }
});