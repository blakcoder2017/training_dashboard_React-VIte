import { 
    GET_ALL_DATA,
    GET_ALL_DATA_FAILURE,
    GET_ALL_DATA_SUCCESS, 
    GET_BENEFICIARY_BY_GENDER_DATA_FAILURE,
    GET_BENEFICIARY_BY_GENDER_DATA_SUCCESS,
    GET_TIME_SERIES_DATA_FAILURE,
    GET_TIME_SERIES_DATA_SUCCESS,
    GET_TOPICS_BY_FREQUENCY_DATA_FAILURE,
    GET_TOPICS_BY_FREQUENCY_DATA_SUCCESS,
    GET_TRAINING_DISTRICT_DATA_FAILURE,
    GET_TRAINING_DISTRICT_DATA_SUCCESS,
    SET_ERROR,
    SET_LOADING,
    CLEAR_ERROR,
    CLEAR_LOADING 
} from "../actions/chartActions";

const initialState = {
    timeSeriesData: [],
    beneficiaryByGenderData: [],
    trainingDistrictData: [],
    topicsByFrequencyData: [],
    allData: [],
    loading: false,
    error: null,
    activeComponent: 'dataTable',
};

const chartReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return { ...state, loading: true };
        case CLEAR_LOADING:
            return { ...state, loading: false };
        case SET_ERROR:
            return { ...state, error: action.payload };
        case CLEAR_ERROR:
            return { ...state, error: null };
        case GET_ALL_DATA_SUCCESS:
            return { ...state, allData: action.payload, loading: false, error: null };
        case GET_BENEFICIARY_BY_GENDER_DATA_SUCCESS:
            return { ...state, beneficiaryByGenderData: action.payload, loading: false, error: null };
        case GET_TIME_SERIES_DATA_SUCCESS:
            return { ...state, timeSeriesData: action.payload, loading: false, error: null };
        case GET_TRAINING_DISTRICT_DATA_SUCCESS:
            return { ...state, trainingDistrictData: action.payload, loading: false, error: null };
        case GET_TOPICS_BY_FREQUENCY_DATA_SUCCESS:
            return { ...state, topicsByFrequencyData: action.payload, loading: false, error: null };
        case GET_ALL_DATA_FAILURE:
        case GET_BENEFICIARY_BY_GENDER_DATA_FAILURE:
        case GET_TIME_SERIES_DATA_FAILURE:
        case GET_TRAINING_DISTRICT_DATA_FAILURE:
        case GET_TOPICS_BY_FREQUENCY_DATA_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case 'SET_ACTIVE_COMPONENT':
            return {
                ...state,
                activeComponent: action.payload,
            };
        default:
            return state;
    }
};

export default chartReducer;