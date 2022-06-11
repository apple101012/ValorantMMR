window.onload = function () {
  var rr = 0;
  var name1 = "N/A";
  const apiUrl = "https://api.henrikdev.xyz/valorant/v1/";
  var rrtext = document.querySelector(".rr");
  var nametext = document.querySelector(".name");
  const searchbox = document.querySelector(".searchbox");
  const form = document.querySelector(".form_");
  const banner = document.querySelector(".banner");
  const level = document.querySelector(".level");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const tag = searchbox.value.split("#");
    async function doWork() {
      const tag = searchbox.value.split("#");
      try {
        // for the ranking and name
        const response = await fetch(`${apiUrl}mmr/na/${tag[0]}/${tag[1]}`); //fetch mmr na only
        const json = await response.json();
        console.log(json.data.name);
        console.log(json.data.ranking_in_tier);
        rrtext.innerHTML = json.data.ranking_in_tier + "/100"; //mmr
        nametext.innerHTML = json.data.name; //name
        // for the banner and account level
        const r2 = await fetch(`${apiUrl}account/${tag[0]}/${tag[1]}`); //fetch the account stats
        const rjson = await r2.json();
        console.log(rjson);
        console.log(rjson.data.card.large);
        banner.style.background = `url("${rjson.data.card.large}")`; //banner
        level.innerHTML = rjson.data.account_level; //acc level
      } catch {}
    }
    doWork();
  });
};
