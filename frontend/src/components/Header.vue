<template>
  <header>
    <div>
      <nav
        class="navbar navbar-expand-sm navbar-dark bg-secondary mb-3 py-0"
      >
        <div class="container">
          <img src="@/assets/logo.png" alt="groupomania logo" class="gm-logo" />
        </div>

        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/login" class="nav-link"> Se connecter </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link"> S'inscrire </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
 
}
</script>

<style>
    .gm-logo {
        width: 150px;
    }

    .gm-banner {
        background-color: grey;
    }
</style>
