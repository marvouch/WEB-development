<template>
    <div>
      <h1>Connexion en cours...</h1>
    </div>
  </template>
  
  <script>
  export default {
    async mounted() {
      const code = this.$route.query.code; // Récupération du code dans l'URL
  
      // Vérifie si le code est présent
      if (!code) {
        console.error('Code d’autorisation manquant.');
        this.$router.push('/login'); // Redirection vers la page de connexion
        return;
      }
  
      try {
        // Requête POST pour échanger le code contre un token
        const response = await this.$axios.$post(
          'https://accounts.spotify.com/api/token',
          new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: 'https://2ed0-41-137-204-13.ngrok-free.app/callback', // URI de redirection
            client_id: 'cd0a66c293314bce91e0810930117a0f', // Remplacez par votre Client ID Spotify
            client_secret: 'e5f05c8775f44f9f8fce13dcd499ea74', // Remplacez par votre Client Secret Spotify
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );
  
        // Log pour confirmer la réception du token
        console.log('Réponse Spotify :', response);
  
        // Stocke le token dans le localStorage
        localStorage.setItem('spotify_access_token', response.access_token);
  
        // Redirige vers le tableau de bord ou une autre page
        this.$router.push('/dashboard');
      } catch (error) {
        // Gère les erreurs et affiche plus d'informations
        console.error('Erreur lors de l’échange du token :', error.response?.data || error.message);
  
        // Redirige vers la page de connexion en cas d'erreur
        this.$router.push('/login');
      }
    },
  };
  </script>
  