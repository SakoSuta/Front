<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>User Information</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">User Information</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="UserInfo">
        <div class="ContUserInfo">
          <div class="UserImage">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="#909094" d="M10.561 8.073a6.005 6.005 0 0 1 3.432 5.142a.75.75 0 1 1-1.498.07a4.5 4.5 0 0 0-8.99 0a.75.75 0 0 1-1.498-.07a6.004 6.004 0 0 1 3.431-5.142a3.999 3.999 0 1 1 5.123 0ZM10.5 5a2.5 2.5 0 1 0-5 0a2.5 2.5 0 0 0 5 0Z"/></svg>
          </div>
          <h2>{{ User.name }}</h2>
          <p>{{ User.email }}</p>
          <p>{{ User.created_at }}</p>
        </div>
          <button @click="Logout" class="LogoutButton">Logout</button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
</script>

<script lang="ts">
export default {
  mounted() {
    const token = localStorage.getItem('token');

    fetch('http://127.0.0.1:8000/api/auth/user', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => response.json())
    .then(json => {
      this.User = json.data;
  }
  )},
  data() {
    return {
      User: [],
    };
  },
  methods: {
    Logout() {
      localStorage.removeItem('token');
      this.$router.push('/tabs/tab1');
    },
  },
};
</script>

<style>
.UserImage{
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.UserImage svg{
  width: 80px;
  height: 80px;
}

.ContUserInfo{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.LogoutButton{
  width: 50%;
  height: 50px;
  background-color: #b82222;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  margin: 50px;
}

.UserInfo{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>