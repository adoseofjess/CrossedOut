Crossedout.Views.ProjectShowView = Backbone.View.extend({
  initialize: function () {
    this.listenTo(Crossedout.tasks, "remove add reset taskChange", this.render);    
  },
  
  template: JST["projects/show"],
  
  events: {
    "click .task-show-link": "showTaskDetail",
    "keyup input": "enterProjectOrTaskInfo",
    "click .add-new-task": "createNewInput",
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
  
  enterProjectOrTaskInfo: function (event) {
    if (event.keyCode == 13) { 
      if (event.currentTarget.parentElement.className == "task-show-link") {
        console.log("enter")
        var that = this;
        var task = Crossedout.tasks.get(parseInt(event.currentTarget.parentElement.getAttribute("data-id")))
        task.set("title", $(event.currentTarget).val())
        task.save({}, {success: function () {
        }})
      } 
      this.model.set($(event.currentTarget).attr("class"), $(event.currentTarget).val())
      this.model.save({})
    }
    else {
      if (event.currentTarget.parentElement.className == "task-show-link") {
        var task = Crossedout.tasks.get(parseInt(event.currentTarget.parentElement.getAttribute("data-id")))
        task.set("title", $(event.currentTarget).val())
        Crossedout.tasks.trigger("projectChange");
      }
      else {
        this.model.set($(event.currentTarget).attr("class"), $(event.currentTarget).val())
      }
    }
  },
  
  createNewInput: function () {
    console.log("hi")
    Crossedout.tasks.create({project_id: this.model.id}, {wait: true});
    // var newTask = new Crossedout.Models.Task();
    // 
    // Crossedout.tasks.add([newTask]);
    // $(".center-pane").append("<div class='task-show-link' data-id='" + newTask.cid + "'><input data-id='" + newTask.cid + "' type='text'></input></div>");
    //come back here
    
    
    // <div class='task-show-link' data-id='<%=newTask.escape('cid')%>'><input data-id='<%=newTask.escape('cid')%>' type='text'></input></div>
  },
   
});

// original: "<div class="task-show-link" data-id="<%= (Crossedout.tasks.length + 1) %>"><input data-id="<%= (Crossedout.tasks.length + 1) %>" type="text"></input></div>"
