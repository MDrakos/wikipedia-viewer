/**
 * Created by mike on 2017-06-18.
 */

$(document).ready(function () {
    var results = [];
    var html = '';

    // Store results as objects
    function Result(title, snippet) {
      this.title = title;
      this.snippet = snippet;
    }

    function search() {
      $.ajax({
            url: 'https://en.wikipedia.org/w/api.php?action=query&list=search&' +
             'format=json&srsearch=' + $('#search').val(),
            dataType: 'jsonp',
            type: 'POST',
            headers: {
                'Api-User-Agent': 'Example/1.0',
              },
            success: function (data) {

                // Clear results, in the case of another search
                $('.results').empty();
                results.length = 0;

                // store received data
                var received = data.query.search;

                // generate each article results
                for (var result in received) {
                  results.push(new Result(received[result].title, received[result].snippet));
                  html = '<div id="articles" class="well"><a href="https://en.wikipedia.org/wiki/' +
                  received[result].title + '"target="_blank"><h3>' + received[result].title +
                  '</h3><p>' + received[result].snippet + '</p></a></div>';
                  $('.results').append(html);
                }
              }
          });
    }

    $('#search').keyup(function (e) {
        if (e.which === 13) {
          search();
        } else if (!$(this).val()) {
          $('.results').empty();
        }
      });
  });
