<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          <div class="TitleNote">
            <router-link to="/tabs/tab1" class="linguini">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="#DDAC00" d="M9.78 12.78a.75.75 0 0 1-1.06 0L4.47 8.53a.75.75 0 0 1 0-1.06l4.25-4.25a.751.751 0 0 1 1.042.018a.751.751 0 0 1 .018 1.042L6.06 8l3.72 3.72a.75.75 0 0 1 0 1.06Z"/></svg>
              <span>Back Home</span>
            </router-link>
          </div>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large"><div class="TitleNote">
            <router-link to="/tabs/tab1" class="linguini">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="#DDAC00" d="M9.78 12.78a.75.75 0 0 1-1.06 0L4.47 8.53a.75.75 0 0 1 0-1.06l4.25-4.25a.751.751 0 0 1 1.042.018a.751.751 0 0 1 .018 1.042L6.06 8l3.72 3.72a.75.75 0 0 1 0 1.06Z"/></svg>
              <span>Back Home</span>
            </router-link>
          </div>
        </ion-title>
        </ion-toolbar>
      </ion-header>

      <div v-if="UserNoteVerify" style="height: 90%;">
        <form action="" class="TheDeathNote" @submit="saveNote">
          <input type="text" name="title" v-model="Note.title" placeholder="Title" required>
          <textarea name="content" v-model="Note.content" placeholder="Content" required></textarea>
          <button type="submit" class="TheDeathNotebutton">Save</button>
          <button @click="DeleteNote" class="DeleteButton">Delete</button>
        </form>
      </div>
      <div v-else style="height: 90%;">
        <div class="NotURNote">
          <div class="ContentNote">
            <h2>{{ Note.title }}</h2>
            <p>{{ Note.content }}</p>
          </div>
        <div class="UserNote">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="#909094" d="M10.561 8.073a6.005 6.005 0 0 1 3.432 5.142a.75.75 0 1 1-1.498.07a4.5 4.5 0 0 0-8.99 0a.75.75 0 0 1-1.498-.07a6.004 6.004 0 0 1 3.431-5.142a3.999 3.999 0 1 1 5.123 0ZM10.5 5a2.5 2.5 0 1 0-5 0a2.5 2.5 0 0 0 5 0Z"/></svg>
            {{ User.name }}
          </div>
        </div>
      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { Router } from 'vue-router';
</script>

<script lang="ts">
export default {
  mounted() {
    const token = localStorage.getItem('token');

    fetch(`http://127.0.0.1:8000/api/notes/${this.$route.params.id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => response.json())
    .then(json => {
      this.Note = json.Result;

      fetch('http://127.0.0.1:8000/api/auth/user', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => response.json())
    .then(json => {
      console.log(json.data);
      console.log(this.Note.user_id);
      if(json.data.id === this.Note.user_id){
         this.UserNoteVerify = true;
      }
      this.User = json.data;
    });
    });
  },
  data() {
    return {
      User: [],
      Note: {
        title: '',
        content: '',
      },
      UserNoteVerify: false,
    };
  },
  methods: {
    saveNote(Event: Event) {
      Event.preventDefault();
      const token = localStorage.getItem('token');
      const noteId = this.$route.params.id;

      fetch(`http://127.0.0.1:8000/api/notes/${noteId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.Note),
      })
        .then(response => response.json())
        .then(json => {
          // Gérer la réponse de la requête ici
          console.log(json);
          this.$router.push('/tabs/tab1');
        });
    },
    DeleteNote() {
      const token = localStorage.getItem('token');
      const noteId = this.$route.params.id;

      fetch(`http://127.0.0.1:8000/api/notes/${noteId}`,
      { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } })
        .then(response => response.json())
        .then(json => {
          console.log(json);
          this.$router.push('/tabs/tab1');
        });
  }},
};
</script>

<style>
.TitleNote{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.linguini{
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 16px;
}

.linguini span{
  margin-left: 5px;
}

.TheDeathNote{
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 20px 30px;
  height: 100%;
}

.TheDeathNote input{
  font-size: 28px;
  font-weight: bold;
  margin: 20px 0px;
  border: none;
  background-color: rgba(0, 0, 0, 0); 
}

.TheDeathNote textarea{
  font-size: 16px;
  margin: 10px 0px;
  height: 100%;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  resize: none;
}

.TheDeathNotebutton{
  margin: 10px 0px;
  padding: 10px 20px;
  border: none;
  background-color: #DDAC00;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
}

.TheDeathNote input:focus {
  outline: none;
}

.TheDeathNote textarea:focus {
  outline: none;
}

ion-title{
  padding: 10px;
}

.NotURNote{
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
  height: 100%;
}

.ContentNote h2{
  font-size: 28px;
  font-weight: bold;
  margin: 20px 0px;
}

.UserNote{
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-top: auto;
}

.DeleteButton{
  margin: 10px 0px;
  padding: 10px 20px;
  border: none;
  background-color: #dd0000;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
}

</style>