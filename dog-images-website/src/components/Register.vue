<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <input v-model="username" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import api from '@/api.js';

export default {
  name: 'Register',
  data() {
    return
