function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 30.263735,
      lng: -97.740940
    },
    zoom: 13,
    mapTypeId: 'roadmap'
  });

  // Create the search box and link it to the UI element.
  var service = new google.maps.places.PlacesService(map);
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });
  getLocations();
  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    console.log(places);

    // Clear out the old markers.
    markers.forEach(function(marker) {
      $("#locSearch").empty();
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    var count = 0;
    places.forEach(function(place) {

      newDiv = $("<div>");
      newDiv.attr("data", count);
      newDiv.addClass("searchLinks");
      newDiv.append("<h5>" + place.name + "</h5>");

      for (i = 0; i < place.types.length; i++) {
        if (place.types[i] === "food") {

          $("#locSearch").append(newDiv);
        };
      };
      //console.log(newDiv);

      if (!place.geometry) {
        //console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({map: map, icon: icon, title: place.name, position: place.geometry.location}));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
      count++;
    });
    map.fitBounds(bounds);

    $(".searchLinks").on("click", function() {
      var location = null;

      service.getDetails({
        placeId: places[$(this).attr("data")].place_id
      }, function(chplace, status) {
        //console.log(chplace);
        location = {
          address: chplace.formatted_address,
          ratingAvg: 0,
          name: chplace.name,
          website: chplace.website,
          mapsUrl: chplace.url
        }
        //console.log(location);
        $("#results").empty();
        $("#results").append("<h5>" + location.name + "</h5>");
        $("#results").append("<h5>" + location.address + "</h5>");
        $("#results").append("<h5>" + location.website + "</h5>");
        $("#results").append("<h5>" + location.mapsUrl + "</h5>");

        $("#submit").on("click", function() {
          if (location != null) {
            $.post("/locations/add", location).then(function() {
              console.log("done");
              location = null;
              getLocations();
            });
          }
        });
      });
    });
  });

  function getLocations() {
    $.get("/api/locations", function(data) {
      $("#locDatabase").empty();
      console.log(data);
      for (i = 0; i < data.length; i++) {
        newDiv = $("<div>");
        newDiv.addClass("col-md-6");
        newDiv.append("<h5>" + data[i].address + "</h5>");
        newDiv.append("<h5>" + data[i].name + "</h5>");
        newDiv.append("<button data='" + data[i].id + "' type='button' class='delete btn btn-default'>Delete</button>");
        $("#locDatabase").append(newDiv);
      };
    });

  };
  $(document).on("click", ".delete", function() {
    console.log($(this).attr("data"));
    $.ajax({
      method: "DELETE",
      url: "/locations/add/" + $(this).attr("data")
    }).done(function() {
      console.log("deleted");
      getLocations();
    });
  });
};
