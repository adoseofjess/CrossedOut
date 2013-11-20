Crossedout.Views.TeamShowHeaderView = Backbone.View.extend({
  initialize: function (options) {
    this.model = options.team;
    this.$el = $("<div class=\"header-container\"></div>")    
  },
  
  template: JST["teams/show_header"],
  
  events: {
    "click .remove": "deleteTeam",
    "click .edit": "editTeam",
  },
  
  render: function () {
    // $(".trashcan").html("<div class="trashcan-icon"><i class="fa fa-trash-o"></i></div>")
    var renderedContent = this.template({
      team: this.model,
    });
    this.$el.html(renderedContent);
    return this;
  },
  
  deleteTeam: function () {
    this.model.destroy({
      success: function () {
        $(".content-header").html("");
        $(".left-header").html("");
        $(".right-header").html("");
        $(".pane-left-not-header").html("");
        $(".pane-right-not-header").html("");
      }
    })
  },
  
  editTeam: function (event) {
    event.preventDefault();
    var EditTeamView = new Crossedout.Views.TeamEditView({model: this.model});
    $(".content-header").html(EditTeamView.render().$el);
  },
});
