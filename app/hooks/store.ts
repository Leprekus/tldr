import { IInitialState } from '@/typings'
import { create } from 'zustand'


/*
fetch fullname/comments
comments fetched

currentCommentId = string | null

displayComments = (id) => {
    if(currentCommentId) {
        comments[currentCommentId].display = false
    }
    comments[id].display = true
    currentCommentId = id
}
toggleComments = (id) => {
    const state = !comments[id].display
    if(state) {
        currentCommentId = id
    }
    if(!state) {
        currentCommentId = null
    }
    comments[id].display = state
}
 */





const useStore = create<IInitialState>((set, get) => ({
    bears: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
    comments: {
        currentCommentId: null
    },
    setComments: (id: string) => set((state) => ({ comments: {
        ...state.comments,
        [id]: {
            display: false
        }
    } 
    })),
    toggleComments: (id: string) => set((state) => ({ comments: {
            ...state.comments,
            [id]: { 
                ...state.comments[id], 
                display: !state.comments[id]?.display
            }
        }
    }))

  }));

export default useStore