/// <reference path="/Scripts/FabricUI/MessageBanner.js" />


(function () {
    "use strict";

    var messageBanner;
 //   var textField;

    // The initialize function must be run each time a new page is loaded.
    Office.initialize = function (reason) {

        // If not using required version of Word APIs, use fallback logic.
        if (!Office.context.requirements.isSetSupported('WordApi', '1.3')) {
            errorHandler("Sorry, your version of Word does not support this add-in.")
            return;
        }

        addTestContent();

        $(document).ready(function () {
            // Initialize the FabricUI notification mechanism and hide it
            var element = document.querySelector('.ms-MessageBanner');
            messageBanner = new fabric.MessageBanner(element);

            // Initialize stylized fabric UI for text fields.


           $('.ms-TextField').each(function () {
               new fabric.TextField(this);
           });

            
          //  $(".ms-TextField").TextField();

            var searchString = $('#searchString').text;
            var replaceString = $('#replaceString').text;
            var excludedParagraphs = $('#excludedParagraphs').text;



            // Add a click event handler for the replace button.
            $('#replace-button').click(
                replace);
        });
    };

    function replace() {
        Word.run(function (context) {

            var foundItems = context.document.body.search(searchString.value, { matchCase: false, matchWholeWord: true }).load();
            var paras = context.document.body.paragraphs.load();
            return context.sync()

                .then(function () {          
                    var excludedRanges = [];
                    excludedRanges.push(paras.items[excludedParagraphs.value].getRange('Whole'));

                    var replacementCandidates = [];

                    for (var i = 0; i < foundItems.items.length; i++) {
                        for (var j = 0; j < excludedRanges.length; j++) {                        
                            replacementCandidates.push({
                                range: foundItems.items[i],
                                locationRelation: foundItems.items[i].compareLocationWith(excludedRanges[j])
                            });
                        }
                    }
                    return context.sync()
                        .then(function () {

                            replacementCandidates.forEach(function (item) {
                                switch (item.locationRelation.m_value) {
                                    case "Inside":
                                    case "Equal":
                                        break;
                                    default:
                                        item.range.insertText(replaceString.value, 'Replace');
                                }
                            });
                        });
                });
        })
        .catch(errorHandler);
    }

    function addTestContent() {

        // Run a batch operation against the Word object model.
        Word.run(function (context) {

            // Create a proxy object for the document body.
            var body = context.document.body;

            // Queue a commmand to clear the contents of the body.
            body.clear();

            // Queue commands to insert text into the end of the Word document body.
            body.insertText("This is a sample paragraph inserted in the document. This is another Msft sentence.", "End");
            body.insertParagraph("This is another sample paragraph inserted in the document. This is another Msft sentence.", 'End');
            body.insertParagraph("This is still another sample paragraph inserted in the document. This is another Msft sentence.", 'End');

            // Synchronize the document state by executing the queued commands, and return a promise to indicate task completion.
            return context.sync();
        })
        .catch(errorHandler);
    }


    //$$(Helper function for treating errors, $loc_script_taskpane_home_js_comment34$)$$
    function errorHandler(error) {
        // $$(Always be sure to catch any accumulated errors that bubble up from the Word.run execution., $loc_script_taskpane_home_js_comment35$)$$
        showNotification("Error:", error);
        console.log("Error: " + error);
        if (error instanceof OfficeExtension.Error) {
            console.log("Debug info: " + JSON.stringify(error.debugInfo));
        }
    }

    // Helper function for displaying notifications
    function showNotification(header, content) {
        $("#notificationHeader").text(header);
        $("#notificationBody").text(content);
        messageBanner.showBanner();
        messageBanner.toggleExpansion();
    }
})();
