import { defineStore } from "pinia";

//Simple pinia store to track if the user is 
export const useAdminStore = defineStore('admin', {
    state: () => ({
        //Wether the user is an admin
        isAdminMode: false
    })
})