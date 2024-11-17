import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
  state: () => {
    return {
      user: null,
      errors: {},
    }
  },
  getters: {},
  actions: {
    async getUser() {
      if (localStorage.getItem('_token')) {
        const res = await fetch(`/api/user`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('_token')}`
          }
        })

        const data = await res.json()
        if (res.ok) {
          this.user = data
        }
      }
    },
    async register(formData) {
      const res = await fetch(`/api/register`, {
        method: "POST",
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (data.errors) {
        this.errors = data.errors
      } else {
        localStorage.setItem('_token', data.token)
        this.user = data.user
        this.errors = {}
        this.router.push({name: 'home'})
      }
    },
    async login(formData) {
      const res = await fetch(`/api/login`, {
        method: "POST",
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (data.errors) {
        this.errors = data.errors
      } else {
        localStorage.setItem('_token', data.token)
        this.user = data.user
        this.errors = {}
        this.router.push({name: 'home'})
      }
    },
    async logout() {
      const res = await fetch(`/api/logout`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${localStorage.getItem('_token')}`
        }
      })

      const data = await res.json()

      if (res.ok) {
        this.user = null
        this.errors = {}
        localStorage.removeItem('_token')
        this.router.push({name: 'login'})
      }
    }
  }
})