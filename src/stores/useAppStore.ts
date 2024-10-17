import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipesSlice, RecipesSliceType } from "./recipeSlice";
import { FavoritesSliceType, createFavoriteSlice } from "./favoritesSlice";
import { NotificationSilceType, createNotificationSlice } from "./notificationSlice";

export const useAppStore = create<RecipesSliceType & FavoritesSliceType & NotificationSilceType>()(devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoriteSlice(...a),
    ...createNotificationSlice(...a)
})))