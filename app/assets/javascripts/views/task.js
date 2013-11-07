Crossedout.Views.TaskShowView = Backbone.View.extend({
  initialize: function () {
    this.listenTo(Crossedout.tasks, "remove add reset projectChange", this.render);	
  },
  
  template: JST["tasks/show"],
  
  events: {
  "keyup input": "enterTaskInfo",
  },
  
  render: function () {
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
    
});