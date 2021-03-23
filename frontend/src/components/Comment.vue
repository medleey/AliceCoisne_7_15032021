<template>
  <div class="container">
      <div class="row">
          <div class="col d-flex mb-3">
            <b-list-group-item class='name-user p-0'>
            <b-avatar href="#foo" size="3rem" variant="primary" text="FF" class="align-baseline"></b-avatar>
            </b-list-group-item>
            <div class="p-1 ml-2 comment-user">
                <p class="mb-0"><b>Jean Michel</b></p>
                <p class="mb-0">Wouah super photo !!</p>
            </div>
        </div>
    </div> 
  </div>
</template>

<script>
export default {
  name:'Comment',
  data () {
    return { 
    }
  }
} 
</script>
    
<style>
    .comment-user {
        background-color: white;
        box-shadow: lightgray 2px 2px 5px;
        border-radius: 10px;
    }
</style>