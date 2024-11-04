interface AssetState {
    assetSensorType?: string;
    assetStatus?: string;
    elementName?: string;
  }
  
  export const initialState: AssetState = {
    assetSensorType: '',
    assetStatus: '',
    elementName: ''
  };
  
  type Action =
    | { type: 'SET_ASSET_SENSOR_TYPE'; payload: string }
    | { type: 'SET_ASSET_STATUS'; payload: string }
    | { type: 'SET_ELEMENT_NAME'; payload: string };
  
  export const assetReducer = (state: AssetState, action: Action): AssetState => {
    switch (action.type) {
      case 'SET_ASSET_SENSOR_TYPE':
        return { ...state, assetSensorType: action.payload };
        
      case 'SET_ASSET_STATUS':
        return { ...state, assetStatus: action.payload };
        
      case 'SET_ELEMENT_NAME':
        return { ...state, elementName: action.payload };
        
      default:
        return state;
    }
  }
  