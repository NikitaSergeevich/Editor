// Menu selectize
var $input = $('#menu-nodes-selectize');
if ($input.length) {
    var selected = $input.val();

    $input.val("");

    $input.selectize({
        plugins: ['clear_selection'],
        valueField: 'id',
        labelField: 'name',
        searchField: 'name',
        create: false,
        preload: true,
        maxItems: 1,
        render: {
            option: function(item, escape) {
                return '<div class="option" data-selectable="" data-value="'+item.value+'">' +
                    Array(item.depth + 1).join(" - ")
                    + item.name +
                    '</div>';
            }
        },
        load: function(query, callback) {
            $.ajax({
                url: $input.data('url') + "/" + encodeURIComponent(query),
                type: 'GET',
                error: function() {
                    callback();
                },
                success: function(res) {
                    callback(res.result.slice(0, 30));

                    if (selected) {
                        $input[0].selectize.addItem(selected, true);
                    }
                }
            });
        }
    });
}

// Remote selectize
var $remoteSelectizeInputs = $('.selectize-remote');
if ($remoteSelectizeInputs.length) {
    $remoteSelectizeInputs.each(function(key, dropdown){
        $(dropdown).selectize({
            plugins: ['remove_button'],
            valueField: 'id',
            labelField: 'name',
            searchField: 'name',
            create: false,
            preload: true,
            load: function(query, callback) {
                $.ajax({
                    url: $(dropdown).data('url') + "/" + encodeURIComponent(query),
                    type: 'GET',
                    error: function() {
                        callback();
                    },
                    success: function(res) {
                        callback(res.result.slice(0, 30));
                    }
                });
            }
        });
    });
}