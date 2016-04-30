import React from 'react';
import Axios from 'axios';
import _ from 'lodash';

class Nearby extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
      locationTrue: ["Waiting on location data (async delay)...", "Waiting on location data (async delay)..."],
      canPush: false
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log("Nearby component received prop change!");
    if(nextProps && nextProps.location[0] != this.state.locationTrue[0] && nextProps.location[1] != this.state.locationTrue[1]) {
      this.setState({locationTrue: nextProps.location, canPush: true}, () => {
        // this.getWeather();
        // console.log("CAN PUSH!!!", this.state.canPush);
      });

    }
  }
  handleClick() {
    let url = '/nearby';
    let dataToSend = {
      latLng: this.state.locationTrue
    };
    Axios.post(url, dataToSend)
      .then( (response) => {
        console.log("/nearby post succeeded: ", response.data);
        this.populateMap(response.data);
      })
      .catch( (response) => {
        console.log("Error getting nearby!");
    });
  }
  populateMap(results) {
    let data = results.results;
    // console.log("map data", data);
    let map;
    let infowindow;

    infowindow = new google.maps.InfoWindow();

    let initMap = () => {
      var start = {
        lat: this.state.locationTrue[0],
        lng: this.state.locationTrue[1]
      };

      map = new google.maps.Map(document.getElementById('map'), {
        center: start,
        zoom: 15
      });
    }

    initMap();

    const createMarker = (place) => {
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });
      // listener for markers clicked
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
    }

    // creates markers for all results
    for (var i = 0; i < data.length; i++) {
      createMarker(data[i]);
    }

    var userLocation = new google.maps.LatLng(this.state.locationTrue[0], this.state.locationTrue[1]);

    // var userWindow = new google.maps.InfoWindow({
    //     map: map,
    //     position: userLocation,
    //     content:
    //         '<h1>Location pinned from HTML5 Geolocation!</h1>' +
    //         '<h2>Latitude: ' + this.state.locationTrue[0] + '</h2>' +
    //         '<h2>Longitude: ' + this.state.locationTrue[1] + '</h2>'
    // });

    // var userMarker = new google.maps.Marker({
    //   position: userLocation,
    //   map: map,
    //   icon: im
    // });

  }
  render() {
    let hiddenStyle = {
      display: "none"
    };
    let showStyle = {
      display: "inline"
    };
    let mainStyle = {
      // width: "25%",
      border: "2px dotted purple",
      margin: "8px",
      float: "left",
      overflow: "scroll"
    };

    return (
      <div style={this.state.canPush ? _.extend(_.clone(mainStyle), showStyle) : _.extend(_.clone(mainStyle), hiddenStyle)}>
        <button onClick={this.handleClick.bind(this)}>Push this button</button>
        <div style={{height: "300px", width: "300px", border: "1px solid black"}} id="map"></div>
      </div>
    );
  }

}

export default Nearby;


// return (
//   <div style={this.state.canPush ? showStyle : hiddenStyle}>
//     <button onClick={this.handleClick.bind(this)}>Push this button</button>
//   </div>
// );


// let maybeButton = "Not yet!";
// if (this.state.canPush) {
// //  alert(this.state.canPush);
//  maybeButton = <button onClick={this.handleClick.bind(this)}>Push this button</button>;
// maybeButton = "yoyoyo";
// }
