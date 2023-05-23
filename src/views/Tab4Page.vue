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
            <div v-if="isNewUser" class="Login">
                <div class="LoginContent">
                    <form @submit="handleRegiter">
                        <input type="text" name="name" v-model="name" placeholder="Name" required>
                        <input type="email" name="email" v-model="email" placeholder="Email" required>
                        <input type="password" name="password" v-model="password" placeholder="Password" required>
                        <button type="submit" class="LogButton">Regiter</button>
                        <router-link to="/tabs/tab4/login">Have an account ?</router-link>
                    </form>
                </div>
            </div>
            <div v-else class="Login">
                <div class="LoginContent">
                    <form @submit="handleLogin">
                        <input type="email" name="email" v-model="email" placeholder="Email" required>
                        <input type="password" name="password" v-model="password" placeholder="Password" required>
                        <button type="submit" class="LogButton">Login</button>
                        <router-link to="/tabs/tab4/new">You don't have an account ?</router-link>
                    </form>
                </div>
            </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
  import { RouterLink } from 'vue-router';
  </script>

  <script lang="ts">
  import { ref } from 'vue';

export default {
    mounted() {
        const token = localStorage.getItem('token');

        const slug = this.$route.params.slug;

        if (slug === "new") {
          this.isNewUser = true;
        }
    },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      isNewUser: false,
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
          this.$router.push('/tabs/tab1');
        }
      } catch (error) {
        console.error('An error occurred', error);
      }
    },
    async handleRegiter(event: Event) {
      event.preventDefault();

      try {
        const formData = new FormData(event.target as HTMLFormElement);
        const nameValue = formData.get('name');
        const emailValue = formData.get('email');
        const passwordValue = formData.get('password');

        console.log('Données envoyées :', {
          name: nameValue,
          email: emailValue,
          password: passwordValue,
        });

        const response = fetch('http://127.0.0.1:8000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: nameValue,
            email: emailValue,
            password: passwordValue,
          }),
        });
        
        if (response.ok) {
          const data = await response.json();
          const token = data.token;
          localStorage.setItem('token', token);
          this.$router.push('/tabs/tab1');
        }
  }catch (error) {
        console.error('An error occurred', error);
      }
    },
  },
};
  </script>

<style>
.Login{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.LoginContent{
    width: 80%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.LoginContent form{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.LoginContent form input{
    width: 100%;
    height: 40px;
    margin: 10px 0px;
    padding: 0px 10px;
    border-radius: 8px;
    border: none;
    background-color: #1C1C1E;
    color: white;
    font-size: 16px;
}

.LoginContent form button{
    width: 100%;
    height: 40px;
    margin: 10px 0px;
    padding: 0px 10px;
    border-radius: 8px;
    border: none;
    background-color: #ddac00;
    color: white;
    font-size: 16px;
}
</style>