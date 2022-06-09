window.onload = function() {
    var rr = 0;
    var name1 = "N/A";
    const apiUrl = "https://api.henrikdev.xyz/valorant/v1/";
    var rrtext = document.querySelector(".rr");
    var nametext = document.querySelector('.name');
    const searchbox = document.querySelector(".searchbox");
    const form = document.querySelector(".form_");
    form.addEventListener('submit', (e) =>{
        e.preventDefault();
        const tag = searchbox.value.split("#");
    //     fetch(`${apiUrl}mmr/na/${tag[0]}/${tag[1]}`)
    //     .then(req => req.json())
    //     .then(x => 
    //         console.log(x)
    //     //     {
    //     // rrtext.innerHTML = (x.rr);
    //     // nametext.innerHTML = (x.name)}
    //     )
    //     .catch(error)(
    //         console.log("ERROR")
    //  );
    async function doWork(){
        const response = await fetch(`${apiUrl}mmr/na/${tag[0]}/${tag[1]}`);
        const json = await response.json();
        console.log(json)
        console.log(json.data.ranking_in_tier)
        rrtext.innerHTML = json.data.ranking_in_tier + "/100";
        nametext.innerHTML = json.data.name;
    }
    doWork();
    })
    








};

