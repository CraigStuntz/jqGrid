module("grid.history.js");

var bbqStub = function() {
    var hash = {};
    return {
        getState: function() { return hash; },
        pushState: function(val) { hash = val; }
    };
};

var data = "<?xml version='1.0' encoding='utf-8'?><invoices><rows><row><cell>data1</cell><cell>data2</cell><cell>data3</cell></row></rows></invoices>";

test("Options initialized from hash", function() {
    var expected = { page: 2, rowNum: 5 };
    var bbq = bbqStub();
    bbq.pushState(expected);

    var div = $("<div><table id='testOptionInit'></table></div>");
    var grid = div.find("table").jqGridHistory({
        beforeRequest: undefined,
        colNames: ['1', '2', '3'],
        colModel: [{name: '1'}, {name: '2'}, {name: '3'} ],
        datatype: 'xmlstring',
        datastr: data,
        history: {
            bbq: bbq
        },
        mtype: undefined,
        page: 1,
        rowNum: 10,
        url: undefined
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
        colNames: ['1', '2', '3'],
        colModel: [{ name: '1' }, { name: '2' }, { name: '3'}],
        datatype: 'xmlstring',
        datastr: data,
        history: {
            bbq: bbq
        },
        page: 1,
        rowNum: 10,
        url: undefined
    });

    var expected = { page: 4, rowNum: 15 };
    bbq.pushState(expected);
    $(window).trigger("hashchange");

    var actual = grid.getGridParam();
    equals(actual.page, expected.page);
    equals(actual.rowNum, expected.rowNum);

    div.remove();
});

