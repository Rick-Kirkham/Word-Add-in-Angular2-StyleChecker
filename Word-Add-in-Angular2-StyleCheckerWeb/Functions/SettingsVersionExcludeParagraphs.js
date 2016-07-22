// The initialize function must be run each time a new page is loaded.
(function () {
    Office.initialize = function (reason) {
        // If you need to initialize something you can do so here.
        var excludedRanges = Office.context.document.settings.get("ExcludedRanges");
        if (excludedRanges === (undefined || null)) {
            excludedRanges = [];
            Office.context.document.settings.set("ExcludedRanges", excludedRanges);
            Office.context.document.settings.saveAsync();
        }       
    };
})();

function excludeParagraphs() {

    Word.run(function (context) {
        var range = context.document.getSelection();
        range.load();
        return context.sync()
            .then(function () {
                var excludedRanges = Office.context.document.settings.get("ExcludedRanges");
                excludedRanges.push(range);
                Office.context.document.settings.set("ExcludedRanges", excludedRanges);
                Office.context.document.settings.saveAsync();
            })
    }).catch(function (error) {
        console.log('Error: ' + JSON.stringify(error));
        if (error instanceof OfficeExtension.Error) {
            console.log('Debug info: ' + JSON.stringify(error.debugInfo));
        }
    });
}