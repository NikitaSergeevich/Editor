function addGetParam(key, value)
{
    key = encodeURI(key);
    value = encodeURI(value);

    var queryParams = document.location.search.substr(1).split('&');

    var iterator=queryParams.length;

    while(iterator--) {
        var paramParts = queryParams[iterator].split('=');

        if (paramParts[0]==key) {
            paramParts[1] = value;
            queryParams[iterator] = paramParts.join('=');
            break;
        }
    }

    if(iterator<0) {
        queryParams[queryParams.length] = [key,value].join('=');
    }

    document.location.search = queryParams.join('&');
}

var selectionCheckboxSelector = "[name='selection[]']",
    selectAllCheckboxSelector = "[name='selection_all']",
    deleteBtnSelector = '#btn-delete-selected',
    restoreBtnSelector = '#btn-restore-selected';

$(deleteBtnSelector + "," +restoreBtnSelector).attr('disabled', true);

$(selectionCheckboxSelector).on("click", function(){

    $(deleteBtnSelector + "," +restoreBtnSelector).attr('disabled', true);

    if ($(selectionCheckboxSelector+":checked").length) {
        $(deleteBtnSelector + "," +restoreBtnSelector).attr('disabled', null);
    }
});

$(selectAllCheckboxSelector).on("click", function(){

    $(deleteBtnSelector + "," +restoreBtnSelector).attr('disabled', true);

    if ($(selectAllCheckboxSelector+":checked").length) {
        $(deleteBtnSelector + "," +restoreBtnSelector).attr('disabled', null);
    }
});

$(function () {
    $('.money-input').each(function () {
        var $input = $(this);

        if (0 == $input.val()) {
            $input.val("0.00");
        }

        $input.maskMoney({
            decimal: '.',
            thousands: '',
            allowZero: true
        });
    });
});
