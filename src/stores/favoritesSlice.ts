import { StateCreator } from "zustand";
import { Recipe } from "../types";
import { createNotificationSlice } from "./notificationSlice";

export type FavoritesSliceType = {
    favorites: Recipe[],
    handleClickFavorite: (recipe: Recipe) => void,
    favoriteExists: (id: Recipe['idDrink']) => boolean
    loadFromStorage: () => void
}

export const createFavoriteSlice : StateCreator<FavoritesSliceType> = (set, get) => ({
    favorites: [],
    handleClickFavorite: (recipe) => {
        if(get().favorites.some(favorite => favorite.idDrink === recipe.idDrink)){
            set((state) => ({
                favorites: state.favorites.filter( favorite => favorite.idDrink !== recipe.idDrink)
            }))
            createNotificationSlice(set).showNotification({text: 'Eliminado de Favoritos', error: false})
        }else{
            set((state) => ({
                favorites: [ ...state.favorites, recipe]
            }))
            createNotificationSlice(set).showNotification({text: 'Agregado a Favoritos', error: false})
        }
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },
    favoriteExists: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    loadFromStorage: () => {
        const storageFavorites = localStorage.getItem('favorites')
        if(storageFavorites) {
            set({
                favorites: JSON.parse(storageFavorites)
            })
        }
    }
})