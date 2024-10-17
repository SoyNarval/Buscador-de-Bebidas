import { StateCreator, create } from "zustand";

type Notification = {
    text: string
    error: boolean
    show: boolean
}

export type NotificationSilceType = {
    notification: Notification
    showNotification: (payload: Pick<Notification, 'text' | 'error'>) => void
    hideNotification: () => void
}

export const createNotificationSlice : StateCreator<NotificationSilceType> = (set, get) => ({
    notification: {
        text: '',
        error: false,
        show: false
    },
    showNotification: (payload) => {
        set({
            notification: {
                text: payload.text,
                error: payload.error,
                show: true
            }
        })
        setTimeout(() => {
            set(() => ({
                notification: {
                    text: '',
                    error: false,
                    show: false
                }
            }));
        }, 3000)
    },
    hideNotification: () => {
        set({
            notification: {
                text: '',
                error: false,
                show: false
            }
        })
    }
})