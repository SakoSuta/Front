<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Login</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Login</ion-title>
          </ion-toolbar>
        </ion-header>
        <div class="allNote">
          <div class="ContentAllNote">
            <router-link to="/tabs/tab3" class="OneNote">
              <h2>Ma premiere note</h2>
              <p>05/05/05</p>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="#909094" d="M10.561 8.073a6.005 6.005 0 0 1 3.432 5.142a.75.75 0 1 1-1.498.07a4.5 4.5 0 0 0-8.99 0a.75.75 0 0 1-1.498-.07a6.004 6.004 0 0 1 3.431-5.142a3.999 3.999 0 1 1 5.123 0ZM10.5 5a2.5 2.5 0 1 0-5 0a2.5 2.5 0 0 0 5 0Z"/></svg>
                User</span>
            </router-link>
            <form @submit="handleLogin">
                <input type="email" name="email" v-model="email" placeholder="Email" required>
                <input type="password" name="password" v-model="password" placeholder="Password" required>
                <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
  </script>

  <script lang="ts">
  import { ref } from 'vue';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async handleLogin(event: Event) {
      event.preventDefault();

      try {
        const formData = new FormData(event.target as HTMLFormElement);
        const emailValue = formData.get('email');
        const passwordValue = formData.get('password');

        console.log('Données envoyées :', {
          email: emailValue,
          password: passwordValue,
        });

        const response = await fetch('http://127.0.0.1:8000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: emailValue,
            password: passwordValue,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const token = data.token;
          localStorage.setItem('token', token);
          this.$router.push('/tabs/tab3');
        }
      } catch (error) {
        console.error('An error occurred', error);
      }
    },
  },
};
  </script>

<style>
.allNote{
  display: flex;
  justify-content: center;
  margin: 20px 0px;
}
.ContentAllNote{
  background-color: #1C1C1E;
  padding: 0px 30px;
  width: 89%;
  height: fit-content;
  border-radius: 8px;
}
.OneNote{
  background-color: #1C1C1E;
  display: flex;
  flex-direction: column;
  padding: 14px 20px 14px 0px;
  padding-bottom: 20px;
  border-bottom: rgba(144, 144, 148,0.1) solid 1px;
  text-decoration: none;
}

.OneNote h2{
  color: #fff;
  font-size: 17px;
  margin: 0px;
  height: 21px;
  display: flex;
  align-items: center;
}

.OneNote p{
  color: #909094;
  font-size: 15px;
  margin: 0px;
  height: 21px;
  display: flex;
  align-items: center;
}

.OneNote span{
  color: #909094;
  font-size: 15px;
  margin: 0px;
  height: 21px;
  display: flex;
  align-items: center;
}

.OneNote span svg{
  margin-right: 4px;
  width: 16px;
  height: 16px;
}
</style>