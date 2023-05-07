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


  }));

export default useStore