import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const usePostsStore = defineStore("postsStore", {
  state: () => {
    return {
      errors: {}
    }
  },
  actions: {
    async getAllPosts() {
      const res = await fetch('/api/posts')
      const data = await res.json()

      return data
    },
    async getPost(post) {
      const res = await fetch(`/api/posts/${post}`)
      const data = await res.json()

      return data
    },
    async createPost(formData) {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('_token')}`
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (data.errors) {
        this.errors = data.errors
      } else {
        this.router.push({name: 'home'})
        this.errors = {}
      }
    },
    async deletePost(post) {
      const authStore = useAuthStore()
      if (authStore.user.id === post.user_id) {
        const res = await fetch(`/api/posts/${post.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('_token')}`,
          }
        })

        const data = await res.json()
        if (res.ok) {
          this.router.push({name: 'home'})
        }
      }
    },
    async updatePost(post, formData) {
      const authStore = useAuthStore()
      if (authStore.user.id === post.user_id) {
        const res = await fetch(`/api/posts/${post.id}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('_token')}`,
          },
          body: JSON.stringify(formData)
        })

        const data = await res.json()

        if (data.errors) {
          this.errors = data.errors
        } else {
          this.router.push({name: 'home'})
          this.errors = {}
        }
      }
    },

  }
})