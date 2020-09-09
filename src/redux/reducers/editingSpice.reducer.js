
const EditingSpiceReducer = (state = {}, action) => {
    switch (action.type) {
      case 'STORE_SPICE_FOR_EDIT':
        return action.payload;
      case 'UNSET_USER':
        return {};
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default EditingSpiceReducer;