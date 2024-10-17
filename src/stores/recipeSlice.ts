import { StateCreator } from "zustand"
import { getCategories, getRecipeByID, getRecipes } from "../services/RecipeService"
import type { Categories, Drinks, Recipe } from "../types"



export type RecipesSliceType = {
    categories: Categories,
    drinks: Drinks,
    selectedRecipe: Recipe,
    modal: boolean,
    fetchCategories: () => Promise<void>
    searchRecipes: (searchFilter: SearchFilter) => Promise<void>
    selectRecipe: (id: Drink['idDrnk']) => Promise<void>
    closeModal: () => void
}

export const createRecipesSlice : StateCreator<RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    selectedRecipe: {} as Recipe,
    modal: false,
    fetchCategories: async () =>{
        const categories = await getCategories()
        set({
            categories
        })
    },
    searchRecipes: async (filters) => {
        const drinks = await getRecipes(filters)
        set({
            drinks
        })
    },
    selectRecipe: async (id) => {
        const selectedRecipe = await getRecipeByID(id)        
        set({
            selectedRecipe,
            modal: true
        })
    },
    closeModal: () =>{
        set({
            modal: false,
            selectedRecipe: {} as Recipe
        })
    }
})