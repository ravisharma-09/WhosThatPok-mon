async function fetchpoki(name) {
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`) ;

        if(!response.ok){
            throw new Error("can't fetch the resources")
        }

        const data = await response.json() ;
        console.log(data)
        rendercard(data) ;
    }
    catch(error){
        console.error(error)
        display.innerHTML = `<h2> cant find this pokemon</h2>`
    }    
}




let offset = 0 ;
const btn = document.getElementById("btn") ;
const inpo = document.getElementById("inpo") ;

btn.addEventListener('click' , () =>{
    const name = inpo.value.toLowerCase() ;
    if (name) {
        fetchpoki(name)
        display.style.display = "block" ;

    }
})


function rendercard(data){
    
    const name = data.name ;
    const id = data.id ;
    const sprite = data.sprites.other["official-artwork"].front_default ;
    const types = data.types.map(t => t.type.name) ;
    const weight = data.weight /10
    const height = data.height / 10
    const stats = data.stats.map(s =>({
        name : s.stat.name,
        value : s.base_stat 
    }))
    const ability = data.abilities.map(t => t.ability.name);
    const exp = data.base_experience ;
    
    const display = document.getElementById("display") ;
    display.innerHTML = `
    <h2>#${id} ${name}</h2>
    <img src="${sprite}" alt="${name}" width="200" height="300">
    <p>Heigth: ${height} m | Weight: ${weight} kg</p>
    <p>type: ${types.join(', ')}</p>
    <p>Abilities: ${ability.join(', ')}</P>
    <p>Base EXP: ${exp}</P>
    <p style="text-align:left; font-size:1.9rem;">Stats:</p>
    
    ${stats.map(s => `
        <div class="statrow">
        <span class="statname"> ${s.name} </span>
        <div class="statbarbg">
        <div class="statbarfil" style="width:${(s.value/250)*100}%"></div>
        </div>
        <span class="statnum">${s.value}</span>
        </div>
        
        `).join('')}

    </p>
    
    `

}
function closecard(){
    display.style.display = "none" ;
    inpo.value = "" ;
}

async function fetchbatch(){
    console.log(offset)
    try{
        const promises = []
        for(let i = offset+1 ; i<= offset +15 ; i++){
            promises.push(
                fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
            )
        }
        const result = await Promise.all(promises);
        let ans = await Promise.all(result.map(v => v.json()))

       

        ans.forEach(element => { rendercardgrid(element)
            offset +=1
            
        });

    }
    catch(error){
        console.error(error)
    }

}


function rendercardgrid(data){

    const name = data.name ;
    const id = data.id ;
    const sprite = data.sprites.other["official-artwork"].front_default ;
    const types = data.types.map(t => t.type.name) ;
    const weight = data.weight /10
    const height = data.height / 10
    const stats = data.stats.map(s =>({
        name : s.stat.name,
        value : s.base_stat 
    }))
    const ability = data.abilities.map(t => t.ability.name);
    const exp = data.base_experience ;
    

const card = document.createElement("div") ;
card.classList.add("pokecard")
card.innerHTML = `
    <h3>#${id} ${name}</h3>
    <img src="${sprite}" alt="${name}" width="200" height="300">
    <p>Heigth: ${height} m | Weight: ${weight} kg</p>
    <p>type: ${types.join(', ')}</p>
    <p>Abilities: ${ability.join(', ')}</P>
    <p class="exp">Base EXP: ${exp}</P>

`
document.getElementById('gridcards').appendChild(card)
}
function load(){
fetchbatch()
}
fetchbatch()



