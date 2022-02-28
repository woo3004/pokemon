document.getElementById("nameSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("pokeName").value.toLowerCase();
    if (value === "")
      return;
    console.log(value);

    const url = "https://pokeapi.co/api/v2/pokemon/" + value;
    fetch(url)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        console.log(json);
        let front_image = json.sprites.front_default;
        let back_image = json.sprites.back_default;
        const pokemon = {};
        pokemon['name'] = json.name[0].toUpperCase() + json.name.slice(1);
        pokemon['id'] = json.id;
        pokemon['weight'] = json.weight;
        pokemon['height'] = json.height;
        let type = [];
        for (let i = 0; i < json.types.length; i++) {
            type.push(json.types[i].type.name);
        }
        pokemon['type'] = type;

        pokemon['abilities'] = json.id;
        let abilities = [];
        for (let i = 0; i < json.abilities.length; i++) {
            abilities.push(json.abilities[i].ability.name);
        }
        pokemon['abilities'] = abilities;
        
        let result = "<h1>" + pokemon.name + "</h1>" + "<div class='image_box'><img src=" + front_image + ">" + 
        "<img src=" + back_image + "></div>";

        result += "<h4>index number: " + pokemon.id + "</h4>";
        result += "<h4>weight: " + pokemon.weight + "</h4>";
        result += "<h4>height: " + pokemon.height + "</h4>";
        
        result += "<h4>type: ";
        for(let i = 0; i < pokemon.type.length; i++) {
            result += pokemon.type[i];
            if(!((i+1)==pokemon.type.length)) {
                result += ", "
            }
        }
        result += "</h4>";

        result += "<h4>ability: ";
        for(let i = 0; i < pokemon.abilities.length; i++) {
            result += pokemon.abilities[i];
            if(!((i+1)==pokemon.abilities.length)) {
                result += ", "
            }
        }
        result += "</h4>";

        
        console.log(pokemon);


        document.getElementById("result").innerHTML = result;
    });
    
});

const sample = () => {
    const url = `https://pokeapi.co/api/v2/pokemon`;
    fetch(url)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            let sampleList = {};
            let sampleResult = "<b>Here are some list of Pokemons</b><ol class='list'>";

            for (let i = 0; i < data.results.length; i++) {
                sampleResult += "<li>" + (i+1) + ". " + data.results[i].name + "</li>";
            }

            sampleResult += "</ol>";
            
            document.getElementById("result").innerHTML = sampleResult;

        });
}

sample();