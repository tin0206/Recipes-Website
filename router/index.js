import { createRouter, createWebHistory } from "vue-router"
import Home from '../pages/index.vue'
import RecipeCollection from '../pages/RecipeCollection.vue'
import AddRecipe from '../pages/AddRecipe.vue'
import Recipe from '../pages/[name].vue'

const routes = [
  {
      path: '/',
      redirect: '/LandingPage'
  },
  {
    path: '/LandingPage',
    name: 'Home',
    component: Home
  },
  {
    path: '/RecipeCollection',
    name: 'RecipeCollection',
    component: RecipeCollection
  },
  {
    path: '/AddRecipe',
    name: 'AddRecipe',
    component: AddRecipe
  },
  {
    path: '/:name',
    name: 'Recipe',
    component: Recipe
  }
]
  
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router