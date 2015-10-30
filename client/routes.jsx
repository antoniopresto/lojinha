window.subsManager = new SubsManager();

FlowRouter.route("/", {
    action: function() {
        ReactLayout.render(MainLayout, {
            //content: <img />
        });
    }
});
