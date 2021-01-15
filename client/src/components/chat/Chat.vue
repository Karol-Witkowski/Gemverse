<template>
 <v-container fluid style="padding: 0;">
    <v-row no-gutters>
      <v-col sm="2" class="scrollable">
      </v-col>
      <v-col sm="10" style="position: relative;">
        <div class="chat-container"  ref="chatContainer" >
        </div>
        <div class="typer">
          <input type="text" placeholder="Type message">
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Chat',
};
</script>

<style src="./Chat.scss" scoped lang="scss" />
