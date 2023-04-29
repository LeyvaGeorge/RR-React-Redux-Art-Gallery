import { createSlice } from '@reduxjs/toolkit'
const getApiUrl = artId => `https://collectionapi.metmuseum.org/public/collection/v1/objects/${artId}`

const initialState = {
    objectId: 24576,
    apiData: {},
    isLoggedIn: true
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        loadData: (state,action) => {
            state.apiData = action.payload;
        },
        nextImage: (state) => {
            state.artId++;
        },
        prevImage: (state) => {
            state.artId--;
        },
        setArtId: (state, action) => {
            state.artId = action.payload;
        },
        reset: () => {
            return initialState;
        },
    }
})

export const { 
    loadData, 
    nextImage, 
    prevImage,
    setArtId, 
    reset
} = dataSlice.actions

export const fetchData = () => {
    return async (dispacth, getState) => {
        const data = getState();
        const { artId } = data.data;
        const response = await fetch(getApiUrl(artId));
        const json = await response.json();
        dispacth(loadData(json))
    }
}

export default dataSlice.reducer