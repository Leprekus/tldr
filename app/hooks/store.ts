import { IInitialState } from '@/typings'
import { create } from 'zustand'

const useStore = create<IInitialState>((set, get) => ({
    bears: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
    comments: {
        currentCommentId: null
    },
    setCurrentCommentId: (id: string) => set((state) => ({ comments: {
        ...state.comments,
        currentCommentId: id
    } 
    })),
    removeCurrentCommentId: () => set((state) => ({ comments: {
        ...state.comments,
        currentCommentId: null
    } 
    })),
    alert: {
        display : false,
        message: '',
        severity: 'informational',
        setMessage: (message: string) => set((state) => ({
            alert: { 
                ...state.alert, 
                message: message,
            }
        })),
        setDisplay: (value: boolean) => set((state) => ({
            alert: { 
                ...state.alert, 
                display: value
            }
        })),
        setSeverity: (value: "informational" | "warning" | "success" | "error" | undefined) => set((state) => ({
            alert: {
                ...state.alert,
                severity: value
            }
        }))
    }


  }));

export default useStore