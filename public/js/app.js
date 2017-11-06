$( document ).ready(function() {
    // react to clicks of .showhide buttons
    $(".showhide").click(function() {
        // if we're currently hidden...
        if($(".showhideitem").hasClass("out")) {
            // reshow the items
            $(".showhideitem").addClass("in");
            $(".showhideitem").removeClass("out");
        } else {
            // otherwise, we're currently shown, so hide items
            $(".showhideitem").addClass("out");
            $(".showhideitem").removeClass("in");
        }
    });
});
