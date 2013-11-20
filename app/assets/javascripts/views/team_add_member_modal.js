Crossedout.Views.TeamAddMemberModalView = Backbone.View.extend({
  template: JST["teams/add_member_modal"],
  
  initialize: function (options) {
    this.model = options.model;
    this.collection = options.collection;
    this.listenTo(this.model, "add remove change", this.render);
    // this.listenTo(this.collection, "add remove change", this.render);
  }, 
  
	events: {
    "click .submit-update": "updateTeam",
    "click .submit-invite": "inviteMember",
	},
  
  render: function () {
    console.log("rendering")
    var renderedContent = this.template({ 
      team: this.model,
      members: this.collection,      
    })
    this.$el.html(renderedContent);
    this.$el.find(".typeahead").typeahead({
      name: 'users',                                                          
      local: Crossedout.users.pluck("username"),                                         
      limit: 10,    
    })
    return this;
    
  },  
  
  updateTeam: function (event) {
    console.log("in update team")
    event.preventDefault();
    var formData = $(event.currentTarget).parent().serializeJSON();
    
    this.model.save({team: formData.team}, {
      success: function () {
        console.log("update team")
    }});
  },
  
  inviteMember: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).parent().serializeJSON();
    var newMember = (Crossedout.users.findWhere({username: formData.team.email}) || new Crossedout.Models.User() )
    
    if (!!this.collection.findWhere({id: newMember.id})) {
      
      //change to flash message
      alert("User is already in team")
    }
    else {
      var that = this;
      $.ajax({
        type: 'POST',
        url: '/teams/' + this.model.id + '/invite/' + formData.team.email,
        dataType: 'json',
        success: function (data) {
          console.log("Email sent");
          console.log(data);
          // that.$el.find(".member-show").after("<tr><td><span class='name'>" + newMember.escape('username') + "</span></td></tr>")
          
          that.collection.add(newMember);
          debugger
        },
        errors: function(xhr, status, error) {
          console.log("ERROR");
          console.log(xhr.responseText);
        }
      });
    }
  },
  
  
  
});
