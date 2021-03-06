import axios from "axios";
import JWT from 'jsonwebtoken'


/* INITIAL STATE *////////////////////////////
export const initialState = {
  user: {
    id: 0,
    email: "",
    firstname: "",
    lastname: "",
    age: "",
    city:"",
    isTourist: "",
    isTutor: "",
    meetupType: "",
    publicMessage: "",
    nativeLanguage: "",
    targetLanguage: "",
    image: ""
  },
  register: {
    error: false,
    loading: false,
  },
  login: {
    error: false,
    loading: false,
  },

  loggedIn: false,
};

/* ACTION TYPES *//////////////////////////////

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGOUT = "LOGOUT";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR"
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS"

/* ACTION CREATORS *//////////////////////////////////////

export const loginUser = (username, password, registeredResponse = null) => (dispatch) => {
    axios.post(`${process.env.REACT_APP_ENDPOINT}/login_check`, {
      // axios.post(`http://localhost:8000/api/login_check`, {
      username: username,
      password: password,
    })
    .then((response) => dispatch(loginSuccess(response.data.token)))
    .catch((error) => console.log(error));
};


export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const loginError = (msg) => ({
  type: LOGIN_ERROR,
  payload: msg,
});


export const logoutUser = () => ({
  type: LOGOUT,
});

export const registerUser = (email, password, firstName, lastName, age, city, meetupCity, nativeLang, targetLang, meetupType, startDate, endDate, role) => (dispatch) => {
    const config = {
      headers: {
      'Content-Type': "application/json;charset=UTF-8"
      },
    };
    const data = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      age: age,
      city: city,
      meetupCity: meetupCity,
      meetupType: meetupType,
      // startDate: new Date(startDate*1000),
      // endDate: new Date(endDate*1000),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      nativeLanguage: nativeLang,
      targetLanguage: targetLang,
      role: role
    }
    axios.post(`${process.env.REACT_APP_ENDPOINT}/register`, data, config)
    .then((response) => {
    dispatch(loginUser(email, password, response.data))
    console.log('email and password:' + email, password);
    })
    .catch((error) => console.log(error));
};

export const updateUser = (id, firstname, lastname, age, cityIri, meetupCityIri, meetupType, nativeLanguageIri, targetLanguageIri) => (dispatch) => {
  const config = {
    headers: {
    'Content-Type': "application/json;charset=UTF-8",
    'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
  };
  const data = {
    firstname: firstname,
    lastname: lastname,
    age: parseInt(age),
    city: cityIri, 
    meetupCity: meetupCityIri,
    meetupType: meetupType,
    // startDate: startDate,
    // endDate: endDate,
    nativeLanguage: nativeLanguageIri,
    targetLanguage: targetLanguageIri,
    
  }
  axios.put(`${process.env.REACT_APP_ENDPOINT}/users/${id}`, data, config)
  .then((response) => {
    // dispatch(updateUserSuccess(response.data))
    console.log('update user success')
  })
  .catch((error) => console.log(error));
};

export const updatePublicMessage = (id, publicMessage) => (dispatch) => {
  const config = {
    headers: {
    'Content-Type': "application/json;charset=UTF-8",
    'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
  };
  const data = {
    publicMessage: publicMessage
  }
  axios.put(`${process.env.REACT_APP_ENDPOINT}/users/${id}`, data, config)
  .then((response) => {
    // dispatch(updateUserSuccess(response.data))
    console.log('update public message success')
  })
  .catch((error) => console.log(error));
};

export const updateDates = (id, startDate, endDate) => (dispatch) => {
  const config = {
    headers: {
    'Content-Type': "application/json;charset=UTF-8",
    'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
  };
  const data = {
    availStartDate: new Date(startDate),
    availEndDate: new Date(endDate)
  }
  axios.put(`${process.env.REACT_APP_ENDPOINT}/users/${id}`, data, config)
  .then((response) => {
    // dispatch(updateUserSuccess(response.data))
    console.log('update dates success')
  })
  .catch((error) => console.log(error));
};


export const updateUserPhoto = (id, imageIri, email, password) => (dispatch) => {
  const config = {
    headers: {
    'Content-Type': "application/json;charset=UTF-8",
    'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
  };
  const data = {
    image: imageIri
  }
  axios.put(`${process.env.REACT_APP_ENDPOINT}/users/${id}`, data, config)
  .then((response) => {
    // dispatch(updateUserSuccess(response.data))
    console.log('update user image success' + response.data)
    dispatch(loginUser(email, password))
  })
  .catch((error) => console.log(error));
};


export const registerSuccess = (data) => ({
  type: REGISTER_SUCCESS,
  payload: data,
});

export const registerError = (msg) => ({
  type: REGISTER_ERROR,
  payload: msg
});

export const updateUserSuccess = (data) => ({
  type: UPDATE_USER_SUCCESS,
  payload: data
});



/* REDUCER *//////////////////////////////////

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      // const user = jwt_decode(payload);
      localStorage.setItem('token', payload)
      const decoded = JWT.decode(payload, { complete: true })
      console.log(decoded.payload.image)
      return {
        ...state,
        user: {
          ...state.auth,
          id: decoded.payload.id,
          email: decoded.payload.username,
          firstName: decoded.payload.firstName,
          lastName: decoded.payload.lastName,
          age: decoded.payload.age,
          city: decoded.payload.city,
          cityId: decoded.payload.cityId,
          meetupCity: decoded.payload.meetupCity,
          meetupCityId: decoded.payload.meetupCityId,
          meetupType: decoded.payload.meetupType,
          publicMessage: decoded.payload.publicMessage,
          isTourist: decoded.payload.isTourist,
          isTutor: decoded.payload.isTutor,
          nativeLanguage: decoded.payload.nativeLanguage,
          targetLanguage: decoded.payload.targetLanguage,
          startDate: decoded.payload.availStartDate.date,
          endDate: decoded.payload.availEndDate.date,
          image: decoded.payload.image
        },
        loggedIn: true,
      };
    
    case LOGOUT:
      localStorage.removeItem('token');
    return {
      ...state,
      loggedIn: false,
    };

    case REGISTER_SUCCESS:
    return {
      ...state,
      register: {
        error: false,
        loading: false
      },
      loggedIn: true,
    };

    default:
      return state;
  }
};