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
    if (event.keyCode == 8) {
      if (event.currentTarget.value.length == 0) {
        
        //if input field is not populated and is a task, delete
        if (event.currentTarget.parentElement.className == "task-show-link") {

          
          var input = Crossedout.tasks.get(parseInt(event.currentTarget.getAttribute("data-id")))
          input.destroy({
            wait: true,
            success: function () {

            //testing
            Crossedout.tasks.trigger("projectShift", $('.task-input').last().attr('data-id'));
            
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
          var task = Crossedout.tasks.get(parseInt(event.currentTarget.parentElement.getAttribute("data-id")))
          task.set("title", $(event.currentTarget).val())
          Crossedout.tasks.trigger("projectChange");
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
        var task = Crossedout.tasks.get(parseInt(event.currentTarget.parentElement.getAttribute("data-id")))
        task.set("title", $(event.currentTarget).val())
        
        //save the task
        task.save({}, {success: function () {
          
          //if it's the last task, then create a new task
          if ($(".task-show-link").last().get(0) == $(event.currentTarget).parent().get(0)) {
            console.log("in last task creating new task")
            Crossedout.tasks.create({project_id: that.model.id}, {
              wait: true,
              success: function () {
                
                $('.task-input').last().focus();
                Crossedout.tasks.trigger("projectShift", $('.task-input').last().attr('data-id'));
                
              }
            });
            //this is also not working
            
          }
          //if it's not the last task, then move onto the next task
          else {
            $(event.currentTarget).parent().parent().next().children().find("input").focus()
            
            //rerender the right-pane here
            // debugger
            Crossedout.tasks.trigger("projectShift", $(event.currentTarget).parent().parent().next().find("input").attr("data-id"));
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
      Crossedout.tasks.trigger("projectShift", $(event.currentTarget).attr("data-id"));
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
    Crossedout.tasks.create({project_id: this.model.id}, {wait: true});
    // var newTask = new Crossedout.Models.Task();
    // 
    // Crossedout.tasks.add([newTask]);
    // $(".center-pane").append("<div class='task-show-link' data-id='" + newTask.cid + "'><input data-id='" + newTask.cid + "' type='text'></input></div>");
    //come back here
    
    
    // <div class='task-show-link' data-id='<%=newTask.escape('cid')%>'><input data-id='<%=newTask.escape('cid')%>' type='text'></input></div>
  },
  
   
});
