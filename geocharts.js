         google.charts.load("current", {
        packages: ["geochart"],
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        // 'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
        // 'mapsApiKey': 'AIzaSyDBRx0crV33B-rLPoQr7SkYl4_ZrUOZzig'
      });
      google.charts.setOnLoadCallback(drawRegionsMap);

      function drawRegionsMap() {
        // Collect the data from the API
        var jsonDataString = $.ajax({
          url:
            "http://emotional-apps.com/apis/meit/stats/getdata.php?test=1&gender=all&age=all&begindate=2000-01-01&enddate=2014-11-24",
          dataType: "json",
          async: false
        }).responseText;

        console.log(jsonDataString)
        // Convert 
        var jsonDataObject = JSON.parse(jsonDataString);
        var jsonDataTableFormat =
          '{"cols": [ {"id":"","label":"Country","pattern":"","type":"string"},{"id":"","label":"Score","pattern":"","type":"number"}],"rows": [';

        $.each(jsonDataObject, function() {
          jsonDataTableFormat +=
            '{"c":[{"v":"' +
            this.country +
            '","f":null},{"v":' +
            this.score_average +
            ',"f":null}]},';
        });
        // Removing extra comma
        jsonDataTableFormat = jsonDataTableFormat.slice(0, -1);
        jsonDataTableFormat += "]}";
        
        var jsonData = JSON.parse(jsonDataTableFormat);
        var data = new google.visualization.DataTable(jsonData);
        var options = {};
        var chart = new google.visualization.GeoChart(
          document.getElementById("regions_div")
        );

        chart.draw(data, options);
      }
