Crossedout.Models.Team = Backbone.Model.extend({
  urlRoot: "/teams",
  
  // teamMembers: function() {
  //   
  //   if (!this._teamMembers) {
  //     this._teamMembers = new Crossedout.Collections.teamMembers([], { team: this });
  //   }
  //   
  //   return this._teamMembers;
  // },
  
  // parse: function (serverAttributes, options) {
  //   
  //   this.teamMembers().reset(serverAttributes.members);
  //   delete serverAttributes.members;
  //   
  //   return serverAttributes;
  // },
  
  // toJSON: function () {
  //   
  //   var json = _.extend({}, this.attributes);
  //   json.teamMembers = this.teamMembers().toJSON();
  //   
  //   return json;
  // },

});