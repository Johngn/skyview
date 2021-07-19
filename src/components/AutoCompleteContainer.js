import PlacesAutocomplete from 'react-places-autocomplete';

const AutoCompleteContainer = ({ inputProps }) => {
  return (
    <div>
      <PlacesAutocomplete inputProps={inputProps} />
    </div>
  );
};

export default AutoCompleteContainer;
