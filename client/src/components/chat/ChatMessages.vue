<template>
  <v-container
    cols='8'
    ml-6
  >
    <v-list three-line>
      <template v-for="(item, index) in items">
        <v-divider
          :inset="item.inset"
          :key="index"
          v-if="item.divider"
        />
        <v-list-item
          :key="item.tittle"
          v-else
        >
          <v-list-item-avatar>
            <v-img :src="item.avatar" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="item.tittle" />
            <v-list-item-subtitle v-html="item.message" />
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-container>
</template>

<script>
export default {
  name: 'ChatMessages',
  data() {
    return {
      drawerToggle: false,
      items: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          message: '<span class="text--primary">Ali Connors</span> &mdash; I\'ll be in your neighborhood doing errands this weekend. Do you want to hang out?',
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          message: '<span class="text--primary">Antonio Muaer</span> &mdash; Wish I could come, but I\'m out of town this weekend.',
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          message: '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Birthday gift',
          message: '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Recipe to try',
          message: '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Recipe dizaster',
          message: '<span class="text--primary">Britta Holt</span> &mdash; Banana, chilli, kimchi and eggs, fells good.',
        },
      ],
    };
  },
};
</script>
