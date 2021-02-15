const initialState = ''

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case 'SET_NOTIFICATION':
        return  payload

    default:
        return state
    }
}

export const setNotification = (payload) => ({
    type: 'SET_NOTIFICATION',
    payload
})

