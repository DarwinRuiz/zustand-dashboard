import { create, type StateCreator } from "zustand";
import { devtools, persist, } from "zustand/middleware";
import { firebaseStorage } from "../storages/firebase.storage";
import { useWeddingBoundStore } from "../wedding";

interface PersonState {
    firstName: string;
    lastName: string;
}

interface Actions {
    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;
}

const storeAPI: StateCreator<PersonState & Actions, [["zustand/devtools", never]]> = (set) => ({
    firstName: '',
    lastName: '',

    setFirstName: (firstName: string) => set(state => ({ firstName }), false, 'setFirstName'),
    setLastName: (lastName: string) => set(state => ({ lastName }), false, 'setLastName'),
})




export const usePersonStore = create<PersonState & Actions>()(
    devtools(persist(storeAPI, { name: 'person-store', storage: firebaseStorage }))
);


usePersonStore.subscribe((nextState, prevState) => {
    const { firstName, lastName } = nextState;

    useWeddingBoundStore.getState().setFirstName(firstName);
    useWeddingBoundStore.getState().setLastName(lastName);
})