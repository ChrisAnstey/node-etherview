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

    // check if we have a wshost set
    if ($("body").data('wshost') != '') {
        // if so, setup the ws
        var ws = new WebSocket($("body").data('wshost'));
        // currently we're just listening for messages, and updating latest block on status page
        ws.onmessage = function (event) {
            var data = jQuery.parseJSON( event.data );
            $(".latestBlockLink").attr('href', '/blocks/' + data.latestBlock);
            $(".latestBlockLinkText").html( data.latestBlock );
        };
    }

});
