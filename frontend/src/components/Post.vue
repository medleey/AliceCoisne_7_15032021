<template>
<div class="container post">
    <div class="row">
        <div class="col">
    <b-list-group-item class='name-user'>
      <b-avatar href="#foo" variant="primary" text="FF" class="align-baseline"></b-avatar>
      Link Text Avatar
    </b-list-group-item>  

    <div>
  <b-img src="https://picsum.photos/1024/400/?image=41" 
  fluid alt="Responsive image" class="img-post"></b-img>
    </div>
    </div>
    </div>
    
  </div>
</template>

<script>
export default {

}
</script>

<style>
    .post {
        padding: 10px;
        box-shadow: lightgray 2px 5px 10px;
        border-radius: 10px;
    }
    .list-group-item{
        background-color: unset;
    }
    .img-post {
        padding: 0px;
    }

    .name-user {
        border: none;
    }
</style>

/*<div class="mb-2">
    <b-avatar src="https://placekitten.com/300/300" size="6rem"></b-avatar>
    </div> */