async function fetchpoki() {
    try{
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu") ;

        if(!response.ok){
            throw new Error("can't fetch the resources")
        }

        const data = await response.json() ;
        console.log(data.name)
    }
    catch(error){
        console.error(error)
    }    
}

fetchpoki()