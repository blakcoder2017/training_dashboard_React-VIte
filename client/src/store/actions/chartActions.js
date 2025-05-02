import dataServices from "../../services/dataService";

export const GET_ALL_DATA = "GET_ALL_DATA";
export const GET_ALL_DATA_SUCCESS = "GET_ALL_DATA_SUCCESS";
export const GET_ALL_DATA_FAILURE = "GET_ALL_DATA_FAILURE";


export const GET_BENEFICIARY_BY_GENDER_DATA = "GET_BENEFICIARY_BY_GENDER_DATA";
export const GET_BENEFICIARY_BY_GENDER_DATA_SUCCESS = "GET_BENEFICIARY_BY_GENDER_DATA_SUCCESS";
export const GET_BENEFICIARY_BY_GENDER_DATA_FAILURE = "GET_BENEFICIARY_BY_GENDER_DATA_FAILURE";

export const GET_TIME_SERIES_DATA = "GET_TIME_SERIES_DATA";
export const GET_TIME_SERIES_DATA_SUCCESS = "GET_TIME_SERIES_DATA_SUCCESS";
export const GET_TIME_SERIES_DATA_FAILURE = "GET_TIME_SERIES_DATA_FAILURE";

export const GET_TOPICS_BY_FREQUENCY_DATA = "GET_TOPICS_BY_FREQUENCY_DATA";
export const GET_TOPICS_BY_FREQUENCY_DATA_SUCCESS = "GET_TOPICS_BY_FREQUENCY_DATA_SUCCESS";
export const GET_TOPICS_BY_FREQUENCY_DATA_FAILURE = "GET_TOPICS_BY_FREQUENCY_DATA_FAILURE";

export const GET_TRAINING_DISTRICT_DATA = "GET_TRAINING_DISTRICT_DATA";
export const GET_TRAINING_DISTRICT_DATA_SUCCESS = "GET_TRAINING_DISTRICT_DATA_SUCCESS";
export const GET_TRAINING_DISTRICT_DATA_FAILURE = "GET_TRAINING_DISTRICT_DATA_FAILURE";

export const SET_ERROR = "SET_ERROR";
export const SET_LOADING = "SET_LOADING";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const CLEAR_LOADING = "CLEAR_LOADING";


// Loading and Error Actions
export const setLoading = () => ({ type: SET_LOADING });
export const clearLoading = () => ({ type: CLEAR_LOADING });
export const setError = (error) => ({ type: SET_ERROR, payload: error });
export const clearError = () => ({ type: CLEAR_ERROR });

export const setActiveComponent = (component) => {
    return {
        type: 'SET_ACTIVE_COMPONENT',
        payload: component
    };
};

const fetchDataAndDispatch = (endpoint, successActionType, failureActionType) => {
    return async (dispatch) => {
        dispatch(setLoading());
        try {
            const response = await dataServices.fetchData(endpoint); // Make the API call
            const data = response.data;
            dispatch({ type: successActionType, payload: data });
            dispatch(clearError()); // Clear error on success
        } catch (error) {
            dispatch({ type: failureActionType, payload: error.message || 'Something went wrong' });
            dispatch(setError(error.message || 'Something went wrong')); // Dispatch error
        } finally {
            dispatch(clearLoading()); // Set loading to false once the process is done
        }
    };
};

// Specific Data Fetching Actions using fetchDataAndDispatch
export const getAllData = () => fetchDataAndDispatch('/api/v1/data', GET_ALL_DATA_SUCCESS, GET_ALL_DATA_FAILURE);
export const getBeneficiaryByGenderData = () => fetchDataAndDispatch('/api/v1/data/beneficiaries-by-gender', GET_BENEFICIARY_BY_GENDER_DATA_SUCCESS, GET_BENEFICIARY_BY_GENDER_DATA_FAILURE);
export const getTimeSeriesData = () => fetchDataAndDispatch('/api/v1/data/time-series', GET_TIME_SERIES_DATA_SUCCESS, GET_TIME_SERIES_DATA_FAILURE);
export const getTrainingDistrictData = () => fetchDataAndDispatch('/api/v1/data/training-by-district', GET_TRAINING_DISTRICT_DATA_SUCCESS, GET_TRAINING_DISTRICT_DATA_FAILURE);
export const getTopicsByFrequencyData = () => fetchDataAndDispatch('/api/v1/data/training-topic-frequency', GET_TOPICS_BY_FREQUENCY_DATA_SUCCESS, GET_TOPICS_BY_FREQUENCY_DATA_FAILURE);


