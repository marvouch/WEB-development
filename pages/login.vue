<template>
    <div>
      <h1>Connexion à Spotify</h1>
      <button @click="redirectToSpotify">Se connecter</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      redirectToSpotify() {
        const clientId = 'cd0a66c293314bce91e0810930117a0f';
        const redirectUri = 'https://2ed0-41-137-204-13.ngrok-free.app/callback';
        const scopes = [
    'streaming', // Requis pour le SDK Spotify
    "user-read-email",
    'user-read-private',
    'user-modify-playback-state', // Contrôle de lecture
    'user-read-playback-state',   // Voir l'état de la lecture
    'user-read-currently-playing',
    'playlist-read-private',
    'user-read-recently-played',
    'user-library-read',
    'user-top-read',
    'user-follow-read',
  ];
        const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
          redirectUri
        )}&scope=${encodeURIComponent(scopes.join(' '))}`;
        window.location.href = authUrl;
      },
    },
  };
  </script>
  
