import { SET_IS_LOADING } from "../reducers/board.reducer";
import { store } from "../store";


export function setIsLoading(isLoading) {
    store.dispatch({ type: SET_IS_LOADING, isLoading })
}