Demo = (function () {
    var data = function (postData) {
        var start = (postData.page - 1) * postData.rows;
        var end = start + parseInt(postData.rows, 10);
        var asc = postData.sord.toLowerCase() === "asc";
        var next = asc ? function (v) { return ++v; } : function (v) { return --v; };
        var val = asc ? 1 + start : 100 - start;
        var rows = [];
        for (var i = start; i < end; i++) {
            rows.push({ "id": val, "cell": [val, "Row " + val] });
            val = next(val);
        }
        return {
            "total": 100 / postData.rows,
            "page": postData.page,
            "records": 100,
            "rows": rows
        };
    };
    var gridOpts = function (caption, pager) {
        return {
            datatype: function (postData) {
                var d = data(postData);
                var grid = $("#" + this.id)[0];
                grid.addJSONData(d);
            },
            colNames: ["Value", "Name"],
            colModel: [
                { name: 'value', index: 'value', sorttype: 'int' },
                { name: 'name', index: 'name', sorttype: 'text' }
            ],
            caption: caption,
            height: "auto",
            pager: pager,
            rowList: [10, 20, 30],
            rowNum: 10
        };
    };
    return {
        setupGrids: function () {
            var nh = $("#noHistory");
            nh.jqGrid(gridOpts("No History", $("#noHistoryPager")));
            var wh = $("#withHistory");
            wh.jqGridHistory(gridOpts("With History", $("#withHistoryPager")));
        }
    };
})();

$(document).ready(function () {
    Demo.setupGrids();
});