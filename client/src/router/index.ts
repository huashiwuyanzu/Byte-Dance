import { createRouter, createWebHistory } from "vue-router";
import Login from '../components/login/user-login.vue';
import Index from '../components/main-view/index-view.vue';
import Home from '../components/main-view/home-view.vue';
import Project from '../components/main-view/project-view.vue';
import Team from '../components/main-view/team-view.vue';
import Message from '../components/main-view/message-view.vue';
import User from '../components/main-view/user-view.vue';
import ProjectDetail from '../components/detail/project-detail.vue';
import InterfaceDetail from '../components/detail/interface-detail.vue';
import Test from '../components/test/test-view.vue';

const routes = [
  { path: '/login', component: Login, },
  {
    path: '/index',
    component: Index,
    children: [
      { path: 'home', component: Home },
      { path: 'project', component: Project },
      { path: 'team', component: Team },
      { path: 'message', component: Message },
      { path: 'user', component: User },
      { path: 'project-detail', component: ProjectDetail },
      { path: 'interface-detail', component: InterfaceDetail },
      { path: '', redirect: 'index/home' }
    ]
  },
  { path: '/test', component: Test },
  { path: '/', redirect: '/index' },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
