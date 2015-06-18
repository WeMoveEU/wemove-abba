// Copyright (c) 2012 Thumbtack, Inc.

$(function() {
    // override default result colors for charts
    Abba.RESULT_COLORS = {
        neutral: '#B8B8B8',
        lose: '#B42647',
        win: '#26B43C'
    };

    var presenter = new Abba.Presenter(Abba.Abba);
    presenter.bind(
        new Abba.InputsView($('.inputs'), document.getElementById('hidden-iframe')),
        $('.results')
    );

    $("#files").on('change', function(event){
        var reader = new FileReader();
        reader.readAsText(event.target.files[0]);

        reader.onload = function(){
            var jsonContent = JSON.parse(reader.result);
            var i = 0;
            for (var variant in jsonContent.data) {
                if (i == 0) {
                    $(".input-row.baseline-input-row input.label-input").val(variant);
                    $(".input-row.baseline-input-row input.num-successes-input").val(jsonContent.data[variant].number_of_successes);
                    $(".input-row.baseline-input-row input.num-samples-input").val(jsonContent.data[variant].number_of_trials);
                } else {
                    $(".input-row:not(.baseline-input-row) input.label-input").val(variant);
                    $(".input-row:not(.baseline-input-row) input.num-successes-input").val(jsonContent.data[variant].number_of_successes);
                    $(".input-row:not(.baseline-input-row) input.num-samples-input").val(jsonContent.data[variant].number_of_trials);
                }
                i++;
            }
        };
    });
});
