$(function () {
    $('.dynamicform_wrapper').on('afterInsert', function (e, target) {
        $(target).find('.fileinput-remove').click();
    })
});