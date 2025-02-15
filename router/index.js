import { createRouter, createWebHistory } from "vue-router"

const routes = [
    {
        path: '/',
        redirect: '/LandingPage'
    },
    {
      path: '/LandingPage',
      name: 'Home',
      component: 'pages/index.vue'
    },
    {
      path: '/RecipeCollection',
      name: 'RecipeCollection',
      component: 'pages/RecipeCollection.vue'
    },
    {
      path: '/AddRecipe',
      name: 'AddRecipe',
      component: 'pages/AddRecipe.vue'
    }
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes
  });
  
  export default router;