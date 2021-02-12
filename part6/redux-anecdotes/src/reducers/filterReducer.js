

const initialState = ''

export default (state = initialState, { type, payload:content }) => {

    switch (type) {

    case 'CHANGE':
        return content

    default:
        return state
    }
}



export const setFilter = (payload) => ({
    type: 'CHANGE',
    payload
})
