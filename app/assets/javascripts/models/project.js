Crossedout.Models.Project = Backbone.Model.extend({
  urlRoot: "/projects",
  
  tasks: function() {
    if (!this._tasks) {
      this._tasks = new Crossedout.Collections.Tasks([], { project: this });
    }
    
    return this._tasks;
  },
  
  parse: function (serverAttributes, options) {
    
    //turn team members into user collection
    this.tasks().reset(serverAttributes.tasks, { parse: true });
  
    delete serverAttributes.tasks;
    return serverAttributes;
  },
  
  //when this is called a team doesn't have any members yet
  toJSON: function () {
    
    var json = _.extend({}, this.attributes);
    json.tasks = this.tasks().toJSON();
    
    return json;
  },
  
});