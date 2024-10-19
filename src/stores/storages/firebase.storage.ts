import { createJSONStorage, StateStorage } from "zustand/middleware";

const firebaseUrl: string = 'https://firebase.realtimedb.uri/zustand';

const storage: StateStorage = {
    getItem: async function (name: string): Promise<string | null> {
        try {
            const data = await fetch(`${firebaseUrl}/${name}.json`).then(res => res.json());
            return JSON.stringify(data);
        } catch (error) {
            throw error;
        }
    },
    setItem: async function (name: string, value: string): Promise<void> {
        await fetch(`${firebaseUrl}/${name}.json`, {
            method: 'PUT',
            body: value
        }).then(res => res.json());
        return;
    },
    removeItem: function (name: string): void | Promise<void> {
        sessionStorage.removeItem(name);
    }
}


export const firebaseStorage = createJSONStorage(() => storage)