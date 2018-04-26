import React, { Component } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete'


class LocationSearchInput extends React.Component {
    constructor(props) {
      super(props);  
    }
    
    state = {
        currentLocation:{lat:"", lng: ""}
    }

    handleChange = (currentLocation) => {
        this.setState({lat = this.target.value.currentLocation, lng = this.target.value.currentLocation})
      }
    
    componentDidMount() {
        console.log("here");
      }
      render() {
        return (
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: 'Search Places ...',
                    className: 'location-search-input'
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {suggestions.map(suggestion => {
                    const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <div {...getSuggestionItemProps(suggestion, { className, style })}>
                        <span>{suggestion.description}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        );
      }
    }


