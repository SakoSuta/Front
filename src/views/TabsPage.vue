<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/tab3">
          <div class="IIcone">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="#DDAC00" d="M10.561 8.073a6.005 6.005 0 0 1 3.432 5.142a.75.75 0 1 1-1.498.07a4.5 4.5 0 0 0-8.99 0a.75.75 0 0 1-1.498-.07a6.004 6.004 0 0 1 3.431-5.142a3.999 3.999 0 1 1 5.123 0ZM10.5 5a2.5 2.5 0 1 0-5 0a2.5 2.5 0 0 0 5 0Z"/></svg>
          </div>
        </ion-tab-button>

        <ion-label class="manyNote">{{AllNoteNumber}} Notes</ion-label>

        <ion-tab-button tab="tab3" href="/tabs/tab2/new">
          <div class="IIcone">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="#ddac00" d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V4.664a.25.25 0 0 0-.073-.177l-2.914-2.914a.25.25 0 0 0-.177-.073Zm4.48 3.758a.75.75 0 0 1 .755.745l.01 1.497h1.497a.75.75 0 0 1 0 1.5H9v1.507a.75.75 0 0 1-1.5 0V9.005l-1.502.01a.75.75 0 0 1-.01-1.5l1.507-.01l-.01-1.492a.75.75 0 0 1 .745-.755Z"/></svg>
          </div>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonPage, IonRouterOutlet } from '@ionic/vue';
</script>

<script lang="ts">
export default {
  mounted() {
    const token = localStorage.getItem('token');

    fetch('http://127.0.0.1:8000/api/notes', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => response.json())
    .then(json => {
      this.AllNoteNumber = json.Result.length;
    });
},
  data() {
    return {
      AllNoteNumber: [],
    };
  }
}
</script>

<style>
.manyNote{
  width: 65%;
  font-size: 14px;
}

.IIcone{
  width: 100%;
  height: 100%;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.IIcone svg{
  width: 25px;
  height: 25px;
}
</style>