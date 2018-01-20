import { ERROR_MESSAGE, BASE_URL } from './constants';
import { actionDisplayMessage } from './../actions/NotificationAction';

import axios from 'axios';
import store from './store';

const handleError = (error, message) => {
    console.log(error);
    console.log(error.response);

    if (error.response) {
        if (error.response.status) {
            store.dispatch(
                actionDisplayMessage(
                    error.response.data
                        ? error.response.data.message
                        : 'Token Invalidated. Please login to continue',
                    Date.now(),
                    'error'
                )
            );
            if (error.response.status === 401)
                return {
                    requireLogin: true,
                    error: true
                };
        }
    } else if (!error.status) {
        store.dispatch(
            actionDisplayMessage(
                'Unable to connect to network. Please check your connection',
                Date.now(),
                'warning'
            )
        );
        return {
            networkDown: true,
            error: true
        };
    } else {
        store.dispatch(actionDisplayMessage(message, Date.now(), 'error'));
    }

    return {
        requireLogin: false,
        error: true
    };
};

export const getEventsPage = pageNumber => {
    return axios
        .get(`${BASE_URL}/events?_page=${pageNumber}&_limit=10`)
        .then(response => response.data)
        .catch(error => handleError(error, ERROR_MESSAGE));
};

export const getEventDetails = eventId => {
    return axios
        .get(`${BASE_URL}/events/${eventId}`)
        .then(response => response.data)
        .catch(error => handleError(error, ERROR_MESSAGE));
};

export const getEventComments = eventId => {
    return axios
        .get(`${BASE_URL}/events/${eventId}?_embed=comments`)
        .then(response => response.data)
        .catch(error => handleError(error, ERROR_MESSAGE));
};

export const getEventByOrganiser = organiser => {
    return axios
        .get(`${BASE_URL}/events?organiser=${organiser}`)
        .then(response => response.data)
        .catch(error => handleError(error, ERROR_MESSAGE));
};

export const addNewEvent = (title, date, organiser, price) => {
    return axios
        .post(`${BASE_URL}/events`, {
            title: title,
            date: date,
            organiser: organiser,
            price: price
        })
        .then(response => response.data)
        .catch(error => handleError(error, ERROR_MESSAGE));
};

export const addNewComment = (eventId, body) => {
    return axios
        .get(`${BASE_URL}/comments`, {
            body: body,
            postId: eventId
        })
        .then(response => response.data)
        .catch(error => handleError(error, ERROR_MESSAGE));
};
