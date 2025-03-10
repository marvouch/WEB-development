<template>
  <div id="app">
			
			<div class="displ">
			<label class="text">RECHERCHE</label>
			<input type =text class="id" v-model="searchQuery">
    </div>
		
			
				<!-- Menu de recherche -->
    <div class="produits">
          <div>
				     <section class="filtres">
					   <h3 class="text">Filtres</h3>
              <div class="displ">
              <label>CATEGORIE</label>
              <select v-model="selectedCategory">
                          <option value="">Toutes les catégories</option>
                <option>Électricité</option>
                <option>Filtration</option>
                <option>Moteur</option>
                <option>Freinage</option>
                <option>Refroidissement</option>
                <option>Suspension</option>
                <option>Sécurité</option>
                <option>Transmission</option>
                <option>Carburant</option>
                <option>Carrosserie</option>
                <option>Échappement</option>
                <option>Direction</option>
              </select>
            </div>
				<div class="displ">
					<label>DISPONIBILITE</label>
					<select v-model="selectedAvailability">
						<option value="">TOUS</option>
						<option value="true">true</option>
						<option value="false">false</option>
					</select>
				</div>
				<div class="displ">
					<label>PRIX</label>
					<select v-model="sortOrder">
						<option value="asc">croissant</option>
						<option value="desc">décroissant</option>
					</select>
				</div>
				</section>
        </div>
        <div>
				<!-- Fiches produits -->
				 <section>
					<h4 class="text">Produits</h4>
					<div class="fiches" v-for="product in filteredProducts" :key="product.id">
						<div class="classproduit">
							<img :src="product.image">
							<p>{{product.nom}}</p>
							<p>{{product.prix}} MAD</p>
							<p>Catégorie {{product.categorie}}</p>
							<p v-if="product.disponible">DISPONIBLE</p>
							<p v-else>INDISPONIBLE</p>
							<button v-on:click="ajouteraupanier(product)">Ajouter au panier</button>
              </div>
              </div>
				 </section>
         </div>
         <div>
          <h4 class="text">Panier</h4>
          <ul>
          <li v-for="(item, index) in panier" :key="index">
            {{ item.nom }} :{{ item.prix }}$
          </li>
          </ul>
         </div>
         

         

  </div>
	</div>
</template>

<script>


export default {
  name: 'App',
  data () {
          return {
            panier: [],
            searchQuery: "",
            selectedCategory: "",
            selectedAvailability: "",
            sortOrder: "asc",
            pieces:[]
            
            
          };
        },
        methods :{
            ajouteraupanier(product){
                this.panier.push(product)
            }

        },
        computed: {
          filteredProducts() {
              let filtered = [...this.pieces]; // Create a new array to ensure reactivity

              if (this.searchQuery) {
                  filtered = filtered.filter(p =>
                      p.nom.toLowerCase().includes(this.searchQuery.toLowerCase())
                  );
              }

              if (this.selectedAvailability !== "") {
                  let availability = this.selectedAvailability === "true"; 
                  filtered = filtered.filter(p => p.disponible === availability);
              }

              if (this.selectedCategory !== "") {
                  filtered = filtered.filter(p => p.categorie === this.selectedCategory);
              }

              if (this.sortOrder === "asc") {
                  filtered.sort((a, b) => a.prix - b.prix);
              } else if (this.sortOrder === "desc") {
                  filtered.sort((a, b) => b.prix - a.prix);
              }

              return filtered;
          }

},
        async mounted() {
          try {
            const response = await fetch("http://localhost:3000/pieces-auto");
            if (!response.ok) throw new Error("Erreur lors du chargement des données");
            this.pieces = await response.json();
          } catch (err) {
            console.error(err);
          }
        }


}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
