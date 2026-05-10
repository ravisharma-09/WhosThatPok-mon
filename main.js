async function fetchpoki(name) {
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`) ;

        if(!response.ok){
            throw new Error("can't fetch the resources")
        }

        const data = await response.json() ;
        console.log(data)
    }
    catch(error){
        console.error(error)
    }    
}



const btn = document.getElementById("btn") ;
const inpo = document.getElementById("inpo") ;

btn.addEventListener('click' , () =>{
    const name = inpo.value.toLowerCase() ;
    if (name) {
        fetchpoki(name)
    }
})