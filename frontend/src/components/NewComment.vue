<template>
<div>
  <div class="border-b">
    <div class="border rounded p-3 mb-4" v-for="comment in comments" v-bind:key="comment.id">
      {{ comment.body }}
    </div>
  </div>
  <form @submit.prevent="subitComment">
    <div class="form-group">
    <h3 class="font-normal texte-grey-darkest text-sm mb-3">Écrivez votre commentaire</h3>
    <textarea class="border rounded p-3 mb-8 w-100" v-model="comment"></textarea>
    </div>
    <button type="submit" class="border rounded py-2">Envoyer mon commentaire</button>
    
  </form>
</div>
 
</template>

<script type="text/babel">
export default {
  props: ['dataComments'],
  data () {
    return {
      comment: '',
      comments: this.dataComments, 
    }
  },
  methods: {
    submitComment() {
      axios.post('/comments', {
        content: this.comment
    }) .then((result) => {
      console.log(result)
      this.comment.push({
        body: this.comment
      })
      this.comment = ''
    })
  },
}
}
</script>

<style>
  h3{
    font-size: 16px;
    margin: none;
  }
</style>