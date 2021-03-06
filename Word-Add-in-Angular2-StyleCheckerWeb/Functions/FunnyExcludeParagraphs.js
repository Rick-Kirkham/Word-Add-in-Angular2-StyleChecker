﻿// The initialize function must be run each time a new page is loaded.
(function () {

    Office.initialize = function (reason) {

        var something = true;
        // If you need to initialize something you can do so here.
    //    var excludedParagraphs = Office.context.document.settings.get("ExcludedParagraphs");
    //    if (excludedParagraphs === (undefined || null)) {
    //        excludedParagraphs = [];
    //        Office.context.document.settings.set("ExcludedParagraphs", excludedParagraphs);
    //        Office.context.document.settings.saveAsync();
        //    }      

        var app = window.app || {};
        app.excludedParagraphs = app.excludedParagraphs || [];
    };
})();

function excludeParagraphs() {

    Word.run(function (context) {
        //context.document.getSelection().

        var paragraphs = context.document.getSelection().paragraphs;
        //range.load();
        context.load(paragraphs, 'text');
        return context.sync()
            .then(function () {
               // var excludedParagraphs = Office.context.document.settings.get("ExcludedParagraphs");
                for (i = 0; i < paragraphs.items.length; i++) {
                    app.excludedParagraphs.push(paragraphs.items[i]);                  
                }

                //excludedParagraphs.push(range);
                //Office.context.document.settings.set("ExcludedParagraphs", excludedParagraphs);
                //Office.context.document.settings.saveAsync();
            })
    }).catch(function (error) {
        console.log('Error: ' + JSON.stringify(error));
        if (error instanceof OfficeExtension.Error) {
            console.log('Debug info: ' + JSON.stringify(error.debugInfo));
        }
    });
}