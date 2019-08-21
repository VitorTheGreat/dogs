<template>
  <div class="container">
    <div class="form">
      <div class="form-group">
      <input type="text" placeholder="Name this dog" class="form-control " v-model="dog.name"> <br />
    </div>

    <p><strong>Choose the Dog color:</strong></p>
    <div class="colors">
      <div class="bg-black" @click="setColor('black')"></div>
      <div class="bg-red" @click="setColor('red')"></div>
      <div class="bg-yellow" @click="setColor('yellow')"></div>
      <div class="bg-green" @click="setColor('green')"></div>
      <div class="bg-blue" @click="setColor('blue')"></div>
    </div><br />

    <p><strong>Choose the Dog font:</strong></p>
    <div class="fonts">
      <div class="font-Quicksand" @click="setFont('Quicksand')">Quicksand</div>
      <div class="font-Montserrat" @click="setFont('Montserrat')">Montserrat</div>
      <div class="font-Karla" @click="setFont('Karla')">Karla</div>
      <div class="font-Mukta" @click="setFont('Mukta')">Mukta</div>
      <div class="font-Nunito" @click="setFont('Nunito')">Nunito</div>
    </div>
    <br/>
    <p><strong>Dog Name: </strong> <span :class="dog.color + ' '+ dog.font">{{dog.name}}</span></p>
    <br />

    <button type="button" @click="saveDog">Save Dog</button><br />
    <select v-model="selected">
      <option v-for="(breed, index) in breeds" :key="index" :value="breed">{{breed}}</option>
    </select>
    <div v-if="dog.url">
      <img :src="dog.url" />
    </div>
    <div v-for="dog in savedDogs" :key="dog.url">
      <img :src="dog.url" :alt="dog.name">
      <p :class="dog.color + ' '+ dog.font">{{dog.name}}</p>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      breeds: null,
      selected: null,
      dog: {
        url: null,
        name: null,
        color: null,
        font: null,
      },
      savedDogs: []
    }; 
  },
  beforeMount() {
    this.getBreedList();
    this.listSavedDogs();
  },
  methods: {
    saveDog(){
      const listDogs = this.savedDogs;
      listDogs.push(this.dog);
      $savana.webStorage.create('dogData', listDogs);
      this.$swal.fire(
      'Dog Saved',
      'Congrats!',
      'success'
    )
      this.listSavedDogs();
    },
    listSavedDogs(){
      var dogs = $savana.webStorage.select('dogData');

      if (dogs) {
        this.savedDogs = dogs;
      }
      console.log(dogs);
    },
    setColor(color) {
      this.dog.color = 'font-' + color;
    },
    setFont(font) {
      this.dog.font = 'font-' + font;
    },
    getBreedList() {
      this.$http.get("/breeds/list/all").then(breeds => {
        this.breeds = this.getArray(breeds.data.message);
      });
    },
    getArray(val) {
      const breeds = [];
      for (var key in val) {
        if (val[key].length) {
          val[key].forEach(breed => {
            breeds.push(breed + " " + key);
          });
        } else {
          breeds.push(key);
        }
      }
      return breeds;
    },
    getBreed(breedName) {
      this.$http.get("/breed/" + breedName + "/images/random").then(breed => {
        this.dog.url = breed.data.message;
      });
    }
  },
  watch: {
    selected(breed) {
      if (breed.indexOf(" ") > -1) {
        breed = breed.split(" ")[1] + "/" + breed.split(" ")[0];
      }
      this.getBreed(breed);
    }
  }
};
</script>

<style lang="scss">
$colors: black, red, yellow, green, blue;
$fonts: 'Quicksand', 'Montserrat', 'Karla', 'Mukta', 'Nunito';

.fonts {
    display: flex;
    flex-direction: row;
    border: 1px solid black;
    width: 500px;
}
.colors {
  display: flex;
  flex-direction: row;
  border: 1px solid black;
  width: 200px;
}

@each $color in $colors {
  .bg-#{$color} {
    background: $color;
    width: 20%;
    height: 15px;
    margin: 5px;
    cursor: pointer;
  }
  .font-#{$color} {
    color: $color;
  }
}
@each $font in $fonts {
  .font-#{$font} {
    font-family: $font, sans-serif;
    cursor: pointer;
    margin: 0 10px;
  }
}
</style>