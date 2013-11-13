Crossedout.Views.ProjectShowView = Backbone.View.extend({
  initialize: function (options) {
    this.model = options.model;
    this.listenTo(this.model, "remove add reset taskChange", this.render);  
    this.listenTo(this.model.tasks(), "remove add reset taskChange", this.render);    
  },
  
  template: JST["projects/show"],
  
  events: {
    "click .task-show-link": "showTaskDetail",
    "keyup input": "enterProjectOrTaskInfo",
    "click .add-new-task": "createNewInput",
    // "mouseenter .task-show-link": "showTaskDetail",
  },
  
  render: function () {
    
    var renderedContent = this.template({
      project: this.model,
      tasks: this.model.tasks(),
    });
    this.$el.html(renderedContent);
    return this;
  },
  
  showTaskDetail: function (event) {
    if (this.taskDetailView) this.taskDetailView.remove();
    event.preventDefault();
    var id = parseInt($(event.currentTarget).attr('data-id'))    
    var taskDetailView = new Crossedout.Views.TaskShowView({ model: this.model.tasks().get(id) });
    this.taskDetailView = taskDetailView;
    $(".right-pane").html(taskDetailView.render().$el);
  },
  
  enterProjectOrTaskInfo: function (event) {
    if (event.keyCode == 8) {
      if (event.currentTarget.value.length == 0) {
        var that = this;
        //if input field is not populated and is a task, delete
        if (event.currentTarget.parentElement.className == "task-show-link") {            
          var input = this.model.tasks().get(parseInt(event.currentTarget.getAttribute("data-id")))
          input.destroy({
            wait: true,
            success: function () {

            //testing
              that.model.tasks().trigger("projectShift", $('.task-input').last().attr('data-id'));
            
            // $(event.currentTarget).parent().parent().prev().children().find("input").focus()
            
            $(".right-pane").html();
          }});
          
          
          // fix this part so when i backspace and delete, it focuses on the previous input element
          
        }
      //if input field is not populated and is not a task, don't do anything
      } 
      else {
        //if input field is populated and is a task, just update
        if (event.currentTarget.parentElement.className == "task-show-link") {
          var task = this.model.tasks().get(parseInt(event.currentTarget.parentElement.getAttribute("data-id")))
          task.set("title", $(event.currentTarget).val())
          task.trigger("projectChange");
        }
        //if input field is populated and is not a task, just update
        else {
          this.model.set($(event.currentTarget).attr("class"), $(event.currentTarget).val())
        }        
      }     
    }
    else if (event.keyCode == 13) { 
      
      //this is a task detail input
      if (event.currentTarget.parentElement.className == "task-show-link") {
        var that = this;
        var task = this.model.tasks().get(parseInt(event.currentTarget.parentElement.getAttribute("data-id")))
        task.set("title", $(event.currentTarget).val())
        
        //save the task
        task.save({}, {
          success: function () {
          //if it's the last task, then create a new task
          if ($(".task-show-link").last().get(0) == $(event.currentTarget).parent().get(0)) {
    
            that.model.tasks().create({project_id: that.model.id}, {
              wait: true,
              success: function (newTask) {
                
                $('.task-input').last().focus();
                
                if (this.taskDetailView) this.taskDetailView.remove();
                var taskDetailView = new Crossedout.Views.TaskShowView({ model: newTask });
                this.taskDetailView = taskDetailView;
                $(".right-pane").html(taskDetailView.render().$el);
                
                // task.trigger("projectShift", newModel);
                
              }
            });          
          }
          //if it's not the last task, then move onto the next task
          else {
            $(event.currentTarget).parent().parent().next().children().find("input").focus()
            var newTaskId = $(event.currentTarget).parent().parent().next().children().last().attr("data-id");
            
            var newTask = that.model.tasks().get(parseInt(newTaskId))
            
            //get data-id
            
            if (this.taskDetailView) this.taskDetailView.remove();
            var taskDetailView = new Crossedout.Views.TaskShowView({ model: newTask });
            this.taskDetailView = taskDetailView;
            $(".right-pane").html(taskDetailView.render().$el);
            // that.model.tasks().trigger("projectShift", $(event.currentTarget).parent().parent().next().find("input").attr("data-id"));
          }
        }})
      } 
      
      //this is not a task detail input
      else {
        this.model.set($(event.currentTarget).attr("class"), $(event.currentTarget).val())
        this.model.save({})
      }
    }
    
    else if (event.keyCode == 9) {
      console.log("Tabbing")
      this.model.tasks().trigger("projectShift", $(event.currentTarget).attr("data-id"));
    }
    
    else {
      if (event.currentTarget.parentElement.className == "task-show-link") {
        var task = this.model.tasks().get(parseInt(event.currentTarget.parentElement.getAttribute("data-id")))
        task.set("title", $(event.currentTarget).val())
        task.trigger("projectChange");
      }
      else {
        this.model.set($(event.currentTarget).attr("class"), $(event.currentTarget).val())
      }
    }
  },

  createNewInput: function () {
    console.log('create new input called')
    
    
    
    // var newTask = new Crossedout.Models.Task({project_id: this.model.id});
    // this.model.tasks().add(newTask);
    //have to add newTask to server
    var that = this;
    var newTask = this.model.tasks().create({project_id: this.model.id}, {
      success: function () {
        console.log("task created")
        // that.$el.find(".task-show-link").append("<div class='task-show-link' data-id='" + newTask.id + "'><input data-id='" + newTask.id + "' type='text' class='task-show-link'></input></div>");
      }
    });
    
    
    
    
    
    // Crossedout.current_user.projects().tasks().create({project_id: this.model.id}, {wait: true});
    // var newTask = new Crossedout.Models.Task();
    // 
    // Crossedout.tasks.add([newTask]);
    
    //come back here
    
    
    // <div class='task-show-link' data-id='<%=newTask.escape('cid')%>'><input data-id='<%=newTask.escape('cid')%>' type='text'></input></div>
  },
  
   
});
