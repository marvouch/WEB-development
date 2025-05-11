<template>
  <div class="flex h-screen bg-black text-white">
    <!-- Barre latérale -->
    <Sidebar />

    <!-- Contenu principal -->
    <main class="flex-1 overflow-y-auto">
      <div class="p-8 bg-gradient-to-b from-gray-800 to-black">
        <!-- Search Bar -->
        <div class="mb-8">
          <div class="relative">
            <input
              v-model="searchQuery"
              @input="handleSearch"
              type="text"
              placeholder="Rechercher des titres, artistes, playlists..."
              class="w-full px-4 py-3 bg-gray-700 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <i class="material-icons absolute right-4 top-3 text-gray-400">search</i>
          </div>
        </div>

        <!-- Search Results -->
        <div v-if="searchQuery && searchResults" class="mb-8">
          <!-- Categories -->
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
            <div
              v-for="category in searchResults.categories?.items"
              :key="category.id"
              class="relative group cursor-pointer"
              @click="browseCategory(category.id)"
            >
              <img
                :src="category.icons[0]?.url"
                :alt="category.name"
                class="w-full h-40 object-cover rounded-lg shadow-lg"
              />
              <div class="absolute inset-0 bg-black bg-opacity-20 rounded-lg group-hover:bg-opacity-30 transition-all duration-200">
                <h3 class="absolute bottom-4 left-4 text-xl font-bold">{{ category.name }}</h3>
              </div>
            </div>
          </div>

          <!-- Artists -->
          <div v-if="searchResults.artists?.items.length" class="mb-8">
            <h2 class="text-2xl font-bold mb-4">Artistes</h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <div
                v-for="artist in searchResults.artists.items"
                :key="artist.id"
                class="text-center"
              >
                <div class="relative group">
                  <img
                    :src="artist.images[0]?.url || require('~/assets/default-album.png')"
                    :alt="artist.name"
                    class="w-full aspect-square object-cover rounded-full mb-2 shadow-lg"
                  />
                  <button
                    @click="playArtist(artist.uri)"
                    class="absolute bottom-2 right-2 bg-green-500 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <i class="material-icons">play_arrow</i>
                  </button>
                </div>
                <h3 class="font-semibold truncate">{{ artist.name }}</h3>
                <p class="text-gray-400 text-sm">Artiste</p>
              </div>
            </div>
          </div>

          <!-- Tracks -->
          <div v-if="searchResults.tracks?.items.length" class="mb-8">
            <h2 class="text-2xl font-bold mb-4">Titres</h2>
            <div class="space-y-2">
              <div
                v-for="track in searchResults.tracks.items"
                :key="track.id"
                class="flex items-center p-2 hover:bg-gray-800 rounded-lg group"
              >
                <img
                  :src="track.album.images[0]?.url || require('~/assets/default-album.png')"
                  :alt="track.name"
                  class="w-12 h-12 object-cover rounded mr-4"
                />
                <div class="flex-1">
                  <h3 class="font-semibold">{{ track.name }}</h3>
                  <p class="text-gray-400 text-sm">{{ track.artists.map(a => a.name).join(', ') }}</p>
                </div>
                <div class="flex items-center space-x-4">
                  <button
                    @click.stop="toggleLike(track.id)"
                    class="text-gray-400 hover:text-white transition-colors duration-200"
                    :class="{ 'text-red-500': isTrackLiked(track.id) }"
                  >
                    <i class="material-icons">{{ isTrackLiked(track.id) ? 'favorite' : 'favorite_border' }}</i>
                  </button>
                  <button
                    @click.stop="playTrack(track.uri)"
                    class="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <i class="material-icons">{{ currentTrack?.id === track.id && isPlaying ? 'pause' : 'play_arrow' }}</i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Playlists -->
          <div v-if="searchResults.playlists?.items.length" class="mb-8">
            <h2 class="text-2xl font-bold mb-4">Playlists</h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <div
                v-for="playlist in searchResults.playlists.items"
                :key="playlist.id"
                class="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition duration-200"
              >
                <div class="relative group">
                  <img
                    :src="playlist.images[0]?.url || require('~/assets/default-album.png')"
                    :alt="playlist.name"
                    class="w-full aspect-square object-cover mb-2 rounded shadow-lg"
                  />
                  <button
                    @click="playPlaylist(playlist.uri)"
                    class="absolute bottom-2 right-2 bg-green-500 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <i class="material-icons">play_arrow</i>
                  </button>
                </div>
                <h3 class="font-semibold truncate">{{ playlist.name }}</h3>
                <p class="text-gray-400 text-sm truncate">{{ playlist.owner.display_name }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Header with Create Playlist Button -->
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold">Votre Bibliothèque</h1>
          <button
            @click="showCreatePlaylistModal = true"
            class="bg-white hover:bg-gray-200 text-black px-6 py-2 rounded-full flex items-center font-bold"
          >
            <i class="material-icons mr-2">add</i>
            Créer une playlist
          </button>
        </div>

        <!-- Tabs -->
        <div class="flex space-x-4 mb-6">
          <button
            @click="activeTab = 'playlists'"
            :class="[
              'px-4 py-2 rounded-full transition-colors font-bold',
              activeTab === 'playlists' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
            ]"
          >
            Playlists
          </button>
          <button
            @click="activeTab = 'liked'"
            :class="[
              'px-4 py-2 rounded-full transition-colors font-bold',
              activeTab === 'liked' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
            ]"
          >
            Titres likés
          </button>
        </div>

        <!-- Liked Songs Section -->
        <div v-if="activeTab === 'liked'" class="mb-8">
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <div
              v-for="track in likedTracks"
              :key="track.id"
              class="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition duration-200 ease-in-out transform hover:scale-105"
            >
              <div class="relative group">
                <img
                  :src="track?.album?.images?.[0]?.url || require('~/assets/default-album.png')"
                  :alt="track?.name || 'Unknown track'"
                  class="w-full h-40 object-cover mb-2 rounded shadow-lg"
                />
                <div class="absolute bottom-2 right-2 flex space-x-2">
                  <button
                    @click="toggleLike(track.id)"
                    class="bg-gray-800 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <i class="material-icons text-red-500">favorite</i>
                  </button>
                </div>
              </div>
              <h3 class="text-lg font-semibold truncate">{{ track?.name || 'Unknown track' }}</h3>
              <p class="text-gray-400 text-sm truncate">{{ track?.artists?.[0]?.name || 'Unknown artist' }}</p>
              <button
                @click="playTrack(track.uri)"
                class="mt-2 w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full flex items-center justify-center font-bold"
              >
                <i class="material-icons mr-2">play_arrow</i>
                LIRE
              </button>
            </div>
          </div>
        </div>

        <!-- Playlists Grid -->
        <div v-if="activeTab === 'playlists'" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <!-- Create Playlist Card -->
          <div
            @click="showCreatePlaylistModal = true"
            class="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition duration-200 ease-in-out transform hover:scale-105 cursor-pointer"
          >
            <div class="h-40 bg-gray-700 rounded flex items-center justify-center mb-2 shadow-lg">
              <i class="material-icons text-6xl text-gray-500">add</i>
            </div>
            <h3 class="text-lg font-semibold text-center">Créer une playlist</h3>
          </div>

          <!-- User Playlists -->
          <div
            v-for="playlist in userPlaylists"
            :key="playlist.id"
            class="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition duration-200 ease-in-out transform hover:scale-105"
          >
            <div class="relative group">
              <img
                :src="playlist?.images?.[0]?.url || require('~/assets/default-album.png')"
                :alt="playlist?.name || 'Unknown playlist'"
                class="w-full h-40 object-cover mb-2 rounded shadow-lg"
              />
            </div>
            <h3 class="text-lg font-semibold truncate">{{ playlist?.name || 'Unknown playlist' }}</h3>
            <p class="text-gray-400 text-sm truncate">{{ playlist?.tracks?.total || 0 }} titres</p>
            <button
              @click="playPlaylist(playlist.uri)"
              class="mt-2 w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full flex items-center justify-center font-bold"
            >
              <i class="material-icons mr-2">play_arrow</i>
              LIRE
            </button>
          </div>
        </div>
      </div>

      <!-- Create Playlist Modal -->
      <div v-if="showCreatePlaylistModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-gray-800 p-6 rounded-lg w-full max-w-md">
          <h2 class="text-2xl font-bold mb-4">Créer une nouvelle playlist</h2>
          <form @submit.prevent="createPlaylist">
            <div class="mb-4">
              <label class="block text-gray-300 mb-2">Nom de la playlist</label>
              <input
                v-model="newPlaylistName"
                type="text"
                class="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Ma nouvelle playlist"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-300 mb-2">Description</label>
              <textarea
                v-model="newPlaylistDescription"
                class="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Ajouter une description (optionnel)"
                rows="3"
              ></textarea>
            </div>
            <div class="flex justify-end space-x-4">
              <button
                type="button"
                @click="showCreatePlaylistModal = false"
                class="px-4 py-2 text-gray-300 hover:text-white"
              >
                Annuler
              </button>
              <button
                type="submit"
                class="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold"
              >
                Créer
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Player Controls -->
      <div v-if="currentTrack" class="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex items-center border-t border-gray-700">
        <!-- Left section: Track info and like button -->
        <div class="flex items-center w-1/3">
          <img
            :src="currentTrack.albumCover || require('~/assets/default-album.png')"
            :alt="currentTrack.name"
            class="w-16 h-16 object-cover mr-4 rounded shadow-lg"
          />
          <div class="flex-1">
            <p class="text-white font-semibold">{{ currentTrack.name }}</p>
            <p class="text-gray-400">{{ currentTrack.artist }}</p>
          </div>
          <button 
            @click="toggleLike(currentTrack.id)" 
            class="text-gray-400 hover:text-white transition-colors duration-200 ml-4"
            :class="{ 'text-red-500': isTrackLiked(currentTrack.id) }"
          >
            <i class="material-icons">{{ isTrackLiked(currentTrack.id) ? 'favorite' : 'favorite_border' }}</i>
          </button>
        </div>

        <!-- Center section: Playback controls -->
        <div class="flex flex-col items-center w-1/3">
          <div class="flex items-center space-x-4 mb-2">
            <button @click="previousTrack" class="text-gray-400 hover:text-white transition-colors duration-200">
              <i class="material-icons">skip_previous</i>
            </button>
            <button @click="togglePlayback" class="text-white hover:text-green-500 transition-colors duration-200">
              <i class="material-icons text-3xl">{{ isPlaying ? 'pause_circle_filled' : 'play_circle_filled' }}</i>
            </button>
            <button @click="nextTrack" class="text-gray-400 hover:text-white transition-colors duration-200">
              <i class="material-icons">skip_next</i>
            </button>
          </div>
          <!-- Progress bar -->
          <div class="w-full flex items-center space-x-2">
            <span class="text-xs text-gray-400">{{ formatTime(currentTime) }}</span>
            <div class="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer" @click="seekTo">
              <div 
                class="h-full bg-white rounded-full" 
                :style="{ width: `${(currentTime / duration) * 100}%` }"
              ></div>
            </div>
            <span class="text-xs text-gray-400">{{ formatTime(duration) }}</span>
          </div>
        </div>

        <!-- Right section: Volume control -->
        <div class="flex items-center justify-end w-1/3 space-x-4">
          <button @click="toggleMute" class="text-gray-400 hover:text-white transition-colors duration-200">
            <i class="material-icons">{{ volumeIcon }}</i>
          </button>
          <div class="flex items-center space-x-2 w-32">
            <input
              type="range"
              v-model="volume"
              min="0"
              max="100"
              @input="setVolume"
              class="w-full h-1 bg-gray-600 rounded-full appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Sidebar from '~/components/Sidebar.vue';

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      userPlaylists: [],
      likedTracks: [],
      likedTracksIds: new Set(),
      showCreatePlaylistModal: false,
      newPlaylistName: '',
      newPlaylistDescription: '',
      activeTab: 'playlists',
      currentTrack: null,
      isPlaying: false,
      player: null,
      deviceId: null,
      searchQuery: '',
      searchResults: null,
      searchTimeout: null,
      currentTime: 0,
      duration: 0,
      volume: 50,
      isMuted: false,
      previousVolume: 50,
    };
  },
  computed: {
    volumeIcon() {
      if (this.isMuted || this.volume === 0) return 'volume_off';
      if (this.volume < 30) return 'volume_down';
      if (this.volume < 70) return 'volume_up';
      return 'volume_up';
    },
  },
  mounted() {
    this.loadLibrary();
    this.loadLikedTracks();
    this.initializePlayer();
  },
  methods: {
    ...mapMutations(['setDeviceId']),
    async initializePlayer() {
      const token = localStorage.getItem('spotify_access_token');
      if (!token) {
        console.error('No access token available');
        return;
      }

      // Check if script is already loaded
      if (!window.Spotify) {
        const script = document.createElement('script');
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.async = true;
        document.body.appendChild(script);
      }

      // Wait for SDK to be ready
      if (!window.Spotify) {
        window.onSpotifyWebPlaybackSDKReady = () => {
          this.setupPlayer(token);
        };
      } else {
        this.setupPlayer(token);
      }
    },

    setupPlayer(token) {
      this.player = new Spotify.Player({
        name: 'Spotify Clone Player',
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.5,
      });

      // Error handling
      this.player.addListener('initialization_error', ({ message }) => {
        console.error('Failed to initialize:', message);
      });

      this.player.addListener('authentication_error', ({ message }) => {
        console.error('Failed to authenticate:', message);
        // Redirect to login if authentication fails
        this.$router.push('/login');
      });

      this.player.addListener('account_error', ({ message }) => {
        console.error('Failed to validate Spotify account:', message);
      });

      this.player.addListener('playback_error', ({ message }) => {
        console.error('Failed to perform playback:', message);
      });

      // Playback status updates
      this.player.addListener('player_state_changed', (state) => {
        if (state) {
          const track = state.track_window.current_track;
          this.currentTrack = {
            id: track.id,
            name: track.name,
            artist: track.artists[0]?.name,
            albumCover: track.album.images[0]?.url,
          };
          this.isPlaying = !state.paused;
          this.duration = state.duration / 1000;
          this.currentTime = state.position / 1000;
        }
      });

      // Ready
      this.player.addListener('ready', ({ device_id }) => {
        console.log('Player is ready with device ID:', device_id);
        this.deviceId = device_id;
        this.setDeviceId(device_id);
        localStorage.setItem('spotify_device_id', device_id);
      });

      // Connect to the player
      this.player.connect().then((success) => {
        if (success) {
          console.log('Successfully connected to Spotify!');
        } else {
          console.error('Failed to connect to Spotify');
        }
      });
    },

    async playTrack(uri) {
      try {
        const token = localStorage.getItem('spotify_access_token');
        if (!token) {
          console.error('No access token available');
          return;
        }

        // First, ensure the device is active
        await this.$axios.$put(
          'https://api.spotify.com/v1/me/player',
          {
            device_ids: [this.deviceId],
            play: false,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        // Then play the track
        await this.$axios.$put(
          `https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`,
          {
            uris: [uri],
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('Playing track:', uri);
      } catch (error) {
        console.error('Error playing track:', error.response?.data || error.message);
        // If device not found, try to transfer playback
        if (error.response?.status === 404) {
          await this.transferPlayback();
          // Retry playing the track after transfer
          await this.playTrack(uri);
        }
      }
    },

    async transferPlayback() {
      try {
        const token = localStorage.getItem('spotify_access_token');
        if (!token || !this.deviceId) return;

        await this.$axios.$put(
          'https://api.spotify.com/v1/me/player',
          {
            device_ids: [this.deviceId],
            play: false,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('Playback transferred to device:', this.deviceId);
      } catch (error) {
        console.error('Error transferring playback:', error.response?.data || error.message);
      }
    },

    async togglePlayback() {
      try {
        const token = localStorage.getItem('spotify_access_token');
        if (!token) {
          console.error('No access token available');
          return;
        }

        if (this.isPlaying) {
          await this.$axios.$put(
            `https://api.spotify.com/v1/me/player/pause?device_id=${this.deviceId}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else {
          await this.$axios.$put(
            `https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

        this.isPlaying = !this.isPlaying;
      } catch (error) {
        console.error('Error toggling playback:', error.response?.data || error.message);
      }
    },

    async previousTrack() {
      try {
        const token = localStorage.getItem('spotify_access_token');
        if (!token || !this.deviceId) return;

        await this.$axios.$post(
          `https://api.spotify.com/v1/me/player/previous?device_id=${this.deviceId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error('Error playing previous track:', error.response?.data || error.message);
      }
    },

    async nextTrack() {
      try {
        const token = localStorage.getItem('spotify_access_token');
        if (!token || !this.deviceId) return;

        await this.$axios.$post(
          `https://api.spotify.com/v1/me/player/next?device_id=${this.deviceId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error('Error playing next track:', error.response?.data || error.message);
      }
    },

    async toggleLike(trackId) {
      try {
        const token = localStorage.getItem('spotify_access_token');
        if (!token) {
          console.error('No access token available');
          return;
        }

        const isLiked = this.isTrackLiked(trackId);
        const method = isLiked ? 'delete' : 'put';

        // Make the API call to like/unlike the track
        await this.$axios[method](
          'https://api.spotify.com/v1/me/tracks',
          {
            ids: [trackId],
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        // Update the liked tracks Set
        if (isLiked) {
          this.likedTracksIds.delete(trackId);
          // Remove from likedTracks array
          this.likedTracks = this.likedTracks.filter(track => track.id !== trackId);
        } else {
          this.likedTracksIds.add(trackId);
          // Add to likedTracks array if we have the track info
          const track = this.searchResults?.tracks?.items?.find(t => t.id === trackId);
          if (track) {
            this.likedTracks.push(track);
          }
        }

        // Update search results if we're in search view
        if (this.searchResults?.tracks?.items) {
          const trackIndex = this.searchResults.tracks.items.findIndex(t => t.id === trackId);
          if (trackIndex !== -1) {
            this.searchResults.tracks.items[trackIndex].isLiked = !isLiked;
          }
        }

        // Force a re-render
        this.$forceUpdate();

        // Reload liked tracks to ensure everything is in sync
        await this.loadLikedTracks();
      } catch (error) {
        console.error('Error toggling like:', error.response?.data || error.message);
      }
    },

    isTrackLiked(trackId) {
      return this.likedTracksIds.has(trackId);
    },

    async loadLibrary() {
      try {
        const token = localStorage.getItem('spotify_access_token');
        if (!token) {
          console.error('No access token available');
          return;
        }

        const playlistsResponse = await this.$axios.$get('https://api.spotify.com/v1/me/playlists', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            limit: 50,
          },
        });

        if (playlistsResponse && playlistsResponse.items) {
          this.userPlaylists = playlistsResponse.items.filter(playlist => playlist !== null);
        }
      } catch (error) {
        console.error('Error loading library:', error.response?.data || error.message);
        this.userPlaylists = [];
      }
    },

    async loadLikedTracks() {
      try {
        const token = localStorage.getItem('spotify_access_token');
        if (!token) {
          console.error('No access token available');
          return;
        }

        const response = await this.$axios.$get('https://api.spotify.com/v1/me/tracks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            limit: 50,
          },
        });

        if (response && response.items) {
          this.likedTracks = response.items.map(item => item.track).filter(track => track !== null);
          // Update the Set of liked track IDs
          this.likedTracksIds = new Set(this.likedTracks.map(track => track.id));
        }
      } catch (error) {
        console.error('Error loading liked tracks:', error.response?.data || error.message);
        this.likedTracks = [];
        this.likedTracksIds = new Set();
      }
    },

    async createPlaylist() {
      try {
        const token = localStorage.getItem('spotify_access_token');
        if (!token) {
          console.error('No access token available');
          return;
        }

        const userResponse = await this.$axios.$get('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const response = await this.$axios.$post(
          `https://api.spotify.com/v1/users/${userResponse.id}/playlists`,
          {
            name: this.newPlaylistName,
            description: this.newPlaylistDescription || '',
            public: false,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        this.userPlaylists = [response, ...this.userPlaylists];
        this.newPlaylistName = '';
        this.newPlaylistDescription = '';
        this.showCreatePlaylistModal = false;
        await this.loadLibrary();
      } catch (error) {
        console.error('Error creating playlist:', error.response?.data || error.message);
        this.newPlaylistName = '';
        this.newPlaylistDescription = '';
        this.showCreatePlaylistModal = false;
      }
    },

    async playPlaylist(uri) {
      try {
        const token = localStorage.getItem('spotify_access_token');
        if (!token) {
          console.error('No access token available');
          return;
        }

        // First, ensure the device is active
        await this.$axios.$put(
          'https://api.spotify.com/v1/me/player',
          {
            device_ids: [this.deviceId],
            play: false,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        // Then play the playlist
        await this.$axios.$put(
          `https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`,
          {
            context_uri: uri,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('Playing playlist:', uri);
      } catch (error) {
        console.error('Error playing playlist:', error.response?.data || error.message);
        // If device not found, try to transfer playback
        if (error.response?.status === 404) {
          await this.transferPlayback();
          // Retry playing the playlist after transfer
          await this.playPlaylist(uri);
        }
      }
    },

    async handleSearch() {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }

      this.searchTimeout = setTimeout(async () => {
        if (!this.searchQuery.trim()) {
          this.searchResults = null;
          return;
        }

        try {
          const token = localStorage.getItem('spotify_access_token');
          if (!token) {
            console.error('No access token available');
            return;
          }

          const response = await this.$axios.$get('https://api.spotify.com/v1/search', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              q: this.searchQuery,
              type: 'track,artist,playlist,category',
              limit: 20,
            },
          });

          this.searchResults = response;
        } catch (error) {
          console.error('Error searching:', error.response?.data || error.message);
        }
      }, 300);
    },

    async browseCategory(categoryId) {
      try {
        const token = localStorage.getItem('spotify_access_token');
        if (!token) {
          console.error('No access token available');
          return;
        }

        const response = await this.$axios.$get(`https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            limit: 20,
          },
        });

        this.searchResults = {
          ...this.searchResults,
          playlists: response.playlists,
        };
      } catch (error) {
        console.error('Error browsing category:', error.response?.data || error.message);
      }
    },

    async playArtist(uri) {
      try {
        const token = localStorage.getItem('spotify_access_token');
        if (!token) {
          console.error('No access token available');
          return;
        }

        // First, ensure the device is active
        await this.$axios.$put(
          'https://api.spotify.com/v1/me/player',
          {
            device_ids: [this.deviceId],
            play: false,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        // Then play the artist
        await this.$axios.$put(
          `https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`,
          {
            context_uri: uri,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('Playing artist:', uri);
      } catch (error) {
        console.error('Error playing artist:', error.response?.data || error.message);
        if (error.response?.status === 404) {
          await this.transferPlayback();
          await this.playArtist(uri);
        }
      }
    },

    formatTime(seconds) {
      if (!seconds) return '0:00';
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    },

    async seekTo(event) {
      try {
        const token = localStorage.getItem('spotify_access_token');
        if (!token || !this.deviceId) return;

        const progressBar = event.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const percent = (event.clientX - rect.left) / rect.width;
        const position = Math.floor(this.duration * percent);

        await this.$axios.$put(
          `https://api.spotify.com/v1/me/player/seek?position_ms=${position * 1000}&device_id=${this.deviceId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        this.currentTime = position;
      } catch (error) {
        console.error('Error seeking:', error.response?.data || error.message);
      }
    },

    async setVolume() {
      try {
        if (!this.player) return;
        await this.player.setVolume(this.volume / 100);
        this.isMuted = this.volume === 0;
      } catch (error) {
        console.error('Error setting volume:', error);
      }
    },

    toggleMute() {
      if (this.isMuted) {
        this.volume = this.previousVolume;
      } else {
        this.previousVolume = this.volume;
        this.volume = 0;
      }
      this.isMuted = !this.isMuted;
      this.setVolume();
    },

    // Add this method to check if a track is liked in search results
    isTrackLikedInSearch(trackId) {
      return this.likedTracksIds.has(trackId);
    },
  },
};
</script>

<style scoped>
.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}

.material-icons {
  transition: transform 0.2s ease-in-out;
}

button:hover .material-icons {
  transform: scale(1.1);
}

/* Custom range input styling */
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  margin-top: -5px;
}

input[type="range"]::-moz-range-thumb {
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  border: none;
}

input[type="range"]:focus {
  outline: none;
}

input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 2px;
  background: #4a4a4a;
  border-radius: 1px;
}

input[type="range"]::-moz-range-track {
  width: 100%;
  height: 2px;
  background: #4a4a4a;
  border-radius: 1px;
}
</style>
