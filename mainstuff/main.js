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
  const rank = document.querySelector(".rank");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const tag = searchbox.value.split("#");
    async function doWork() {
      //FUNCTION START                     FIRST IS MMR AND RANK THEN ITS NORMAL ACCOUNT
      const tag = searchbox.value.split("#");
      try {
        // RANKING AND NAME
        const response = await fetch(`${apiUrl}mmr/na/${tag[0]}/${tag[1]}`); //fetch mmr na only
        const json = await response.json(); //convert the mmr stuff to json
        if (json.data.mmr_change_to_last_game > 0)
          //IF RR IS LOST
          rrtext.innerHTML =
            "RR = " +
            json.data.ranking_in_tier +
            `<i class="fa-solid fa-arrow-up"></i>`;
        //arrow up
        else if (json.data.mmr_change_to_last_game < 0)
          //IF RR IS GAINED
          rrtext.innerHTML =
            "RR = " +
            json.data.ranking_in_tier +
            `<i class="fa-solid fa-arrow-down"></i>`;
        //arrow down
        else rrtext.innerHTML = "RR = " + json.data.ranking_in_tier; //NO RR LOST OR GAINED
        nametext.innerHTML = json.data.name; //SET NAME
        let tier = json.data.currenttierpatched.replace(" ", ""); //FOR RANK IMAGE
        rank.innerHTML = `<img src="Val_Icons/${tier}.png" alt="" class="rankpic">`; //FOR RANK IMAGE
        // for the banner and account level
        const r2 = await fetch(`${apiUrl}account/${tag[0]}/${tag[1]}`); //fetch the account stats
        const rjson = await r2.json(); //convert norm stats to json
        banner.style.background = `url("${rjson.data.card.large}")`; //BANNER
        level.innerHTML = "Level = " + rjson.data.account_level; //ACCOUNT LEVEL
      } catch {
        rank.innerHTML = `<img src="Val_Icons/Iron 1.png" alt="" class="rankpic">`;
        nametext.innerHTML = `Unknown`;
        rrtext.innerHTML = `RR = 00`;
        level.innerHTML = "999";
      }
    }
    doWork();
  });
};
