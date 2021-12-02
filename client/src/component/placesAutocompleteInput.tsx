import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

interface InputPlacesProps {
  address: string;
  coordinates: {
    lat: number | null;
    lng: number | null;
  };
  handleSelect: (value: string) => void;
  handlePlacesChange: (value: string) => void;
}

export default function PlacesAutocompleteInput(props: InputPlacesProps) {
  return (
    <div>
      <PlacesAutocomplete
        value={props.address}
        onChange={props.handlePlacesChange}
        onSelect={props.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input {...getInputProps({ placeholder: "location" })} />

            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}  key={suggestion.placeId}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}
