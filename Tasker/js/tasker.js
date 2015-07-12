var tasker = {
    init: function(){
        tasker.initAutoComplete();
    },

    initAutoComplete: function(){
        $('#task').autocomplete({
            source: ['Create', 'Plan', 'Complete', 'Build', 'Develop', 'Test']
        });

        $('#time').autocomplete({
            source: ['5m', '15m', '30m', '45m', '1h', '1.5h', '2h', '2.5h',
                '3h', '3.5h', '4h', '4.5h', '5h', '5.5h', '6h', '6.5h', '7h',
                '7.5h', '1d', '2d', '3d', '4d', '5d']
        });

        $(".who-chosen-select").chosen({no_results_text: "nothing found!", max_selected_options: 10})
            .bind("chosen:maxselected", function () { alert('you cannot select more than ten'); });

        $(".urgency-chosen-select").chosen({no_results_text: "nothing found!", max_selected_options: 2})
            .bind("chosen:maxselected", function () { alert('you cannot select more than two'); })
            .change(function(){tasker.validateUrgencyInput();});

        $('#when').autocomplete({
            source: ['Today', 'Tomorrow', 'Next Week'].concat(dateUtility.getDateRange(14))
        });
    },

    validateUrgencyInput: function () {
        if($.inArray('High Importance', $(".urgency-chosen-select").chosen().val()) > -1){
            $("select#urgency-select option[value='Low Importance']").remove();
        }else if($.inArray('Low Importance', $(".urgency-chosen-select").chosen().val()) > -1){
            $("select#urgency-select option[value='High Importance']").remove();
        }else{
            $("select#urgency-select option[value='Low Importance']").remove();
            $("select#urgency-select option[value='High Importance']").remove();
            $("select#urgency-select").append('<option value="Low Importance">Low Importance</option>');
            $("select#urgency-select").append('<option value="High Importance">High Importance</option>');
        }
        if($.inArray('High Urgency', $(".urgency-chosen-select").chosen().val()) > -1){
            $("select#urgency-select option[value='Low Urgency']").remove();
        }else if($.inArray('Low Urgency', $(".urgency-chosen-select").chosen().val()) > -1){
            $("select#urgency-select option[value='High Urgency']").remove();
        }else{
            $("select#urgency-select option[value='Low Urgency']").remove();
            $("select#urgency-select option[value='High Urgency']").remove();
            $("select#urgency-select").append('<option value="Low Urgency">Low Urgency</option>');
            $("select#urgency-select").append('<option value="High Urgency">High Urgency</option>');
        }
        $('.urgency-chosen-select').trigger("chosen:updated");
    },

    validateInput : function () {
      if(!$('#task').val()){
          alert('Please enter a task description');
          return false;
      }
      if($(".urgency-chosen-select").chosen().val() == null){
          alert('Please choose an urgency');
          return false;
      }
      if(!$('#time').val()){
          alert('Please choose a time range');
          return false;
      }
      if($(".who-chosen-select").chosen().val() == null){
          alert('Please choose who will do the task');
          return false;
      }
      if(!$('#when').val()){
          alert('Please choose when the task will start');
          return false;
      }
      return true;
    },

    selectUrgency : function () {
        var i  = ($.inArray('Low Importance', $(".urgency-chosen-select").chosen().val()) > -1 ? 'LI' : 'HI');
        var u = ($.inArray('Low Urgency', $(".urgency-chosen-select").chosen().val()) > -1 ? 'LU' : 'HU');
        return i +'.' + u ;
    },

    letsDoIt: function () {
        if(!tasker.validateInput())
            return;
        console.log('here');
        var val = $(".who-chosen-select").chosen().val();
        var who = '';
        $.each(val, function (i, item) {
            who += (i == 0 ? item : ', ' + item);
        });
        console.log(who);

        alert($('#task').val() + ' (!' + tasker.selectUrgency() +
             ') (#' + $('#time').val() + ') (@' + who + ') (*' + $('#when').val() + ')');
    }
};

var dateUtility = {
    getFormattedDate : function(y, m , d){
        return y + '/' + (m < 10 ? '0' + m : m) + '/' + (d < 10 ? '0' + d : d);
    },

    getDateByCount : function (count) {
        var currentDate = new Date(new Date().getTime() + count * 24 * 60 * 60 * 1000);
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();

        return dateUtility.getFormattedDate(year, month, day);
    },

    getDateRange : function(upto){
        var dates = [];
        for(var i = 0; i < upto; i++)
        {
            dates.push(dateUtility.getDateByCount(i));
        }

        return dates;
    }
};
