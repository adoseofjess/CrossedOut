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
  "submit .task-edit-form": "saveTask",
  "click .delete-task": "deleteTask",
  },
  
  render: function () {
    // this.remove();
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
    var that = this;
    
    if (this.model.get("completed")) {
      this.model.set({
        "completed": false,
        "completed_at": null, 
      })
      this.model.save({}, {
        success: function () {
          that.model.trigger("projectChange");
        }
      });
    }
    else {
      this.model.set({
        "completed": true,
        "completed_at": new Date().toDateString(), 
      })
      this.model.save({}, {
        success: function () {
          that.model.trigger("projectChange");
        }
      });
    }
  },
  
  getDatePicker: function () {
      this.$el.find('.datepicker').datepicker();
  },
  
  saveTask: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    var that = this;
   
    this.model.save({task: formData.task}, {success: function () {
    }}
    )
  },
  
  deleteTask: function (event) {
    event.preventDefault();
    this.remove();
    //to do 
    //when i delete, i want to grab the element before and render the right-pane
    
    this.model.destroy({success: function () {
      console.log("task deleted")
    }});
  },
});