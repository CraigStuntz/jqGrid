module("grid.history.js");

var bbqStub = function() {
    var hash = {};
    return {
        getState: function() { return hash; },
        setState: function(val) { hash = val; }
    };
};

test("Options initialized from hash", function() {
    var expected = { page: 2, rowNum: 5 };
    var bbq = bbqStub();
    bbq.setState(expected);

    var div = $("<div><table id='testOptionInit'></table></div>");
    var grid = div.find("table").jqGridHistory({
        history: {
            bbq: bbq
        },
        page: 1,
        rowNum: 10
    });
    
    var actual = grid.getGridParam();
    equals(actual.page, expected.page);
    equals(actual.rowNum, expected.rowNum);

    div.remove();
});

test("hashchange event updates grid", function() {
    var div = $("<div><table id='testHashChange'></table></div>");
    var bbq = bbqStub();
    var grid = div.find("table").jqGridHistory({
        history: {
            bbq: bbq
        },
        page: 1,
        rowNum: 10
    });

    var expected = { page: 4, rowNum: 15 };
    bbq.setState(expected);
    $(window).trigger("hashchange");

    var actual = grid.getGridParam();
    equals(actual.page, expected.page);
    equals(actual.rowNum, expected.rowNum);

    div.remove();
});

