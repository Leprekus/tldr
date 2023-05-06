import { IIniitalState } from '@/typings'
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





const useStore = create<IIniitalState>((set, get) => ({
    bears: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
    comments: {},
    setComments: (id: string) => set((state) => ({ comments: {
        [id]: {
            display: false
        }
    } 
    })),

  }));

export default useStore