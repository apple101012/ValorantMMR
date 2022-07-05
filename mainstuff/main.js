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
    //FOR THE FIRST FUNCTION
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
    async function matchHistory() {
      //START OF THE MATCH HISTORY FUNCTION
      const response = await fetch(
        `https://api.henrikdev.xyz/valorant/v3/matches/na/${tag[0]}/${tag[1]}?filter=competitive` //Competitive only JSON
      );
      const json = await response.json();
      const response1 = await fetch(
        `https://api.henrikdev.xyz/valorant/v1/mmr-history/na/${tag[0]}/${tag[1]}`
      );
      const mmr = await response1.json();
      let one = json.data[4].players.all_players.find(
        (x) => x.name.toLowerCase() == tag[0].toLowerCase()
      ); // player stats for match
      let two = json.data[3].players.all_players.find(
        (x) => x.name.toLowerCase() == tag[0].toLowerCase()
      ); // player stats for match
      let three = json.data[2].players.all_players.find(
        (x) => x.name.toLowerCase() == tag[0].toLowerCase()
      );
      let four = json.data[1].players.all_players.find(
        (x) => x.name.toLowerCase() == tag[0].toLowerCase()
      ); // player stats for match
      let five = json.data[0].players.all_players.find(
        (x) => x.name.toLowerCase() == tag[0].toLowerCase()
      ); // player stats for match
      let matches = [five, four, three, two, one]; // LIST OF ALL THE MATCHES JSON
      let flex = document.querySelector(".flex-container"); //select the container with all the matches
      let a = 0; //Needed to go through the victories
      flex.innerHTML = "";
      for (i of matches) {
        //variable to go through all the players stats in the matches
        let team = i.team;
        team = team.toLowerCase();
        let teamstats = json.data[a].teams[team]; //it gets the teamstats to get the victory or defeat
        console.log(teamstats);
        let mmrchange = mmr.data[a].mmr_change_to_last_game;
        let rank = mmr.data[a].currenttierpatched.split(" ");
        flex.innerHTML += `<div class="flex-item" style="background-color:${
          teamstats.has_won
            ? "rgba(0, 128, 0, 0.259)"
            : "rgba(128, 0, 0, 0.356)" //Choose color for win or loss (green then red)
        }">
        <div class="character c1">
          <img
            src="${i.assets.agent.small}"
            alt=""
            class="character-pic"
          />
           <img src="Val_Icons/${
             rank[0] + rank[1]
           }.png" alt="" class="rank-change" />
            <span class="rrchange text1" style="color: ${
              mmrchange > 0 ? "rgb(9, 242, 9)" : "rgb(255, 0, 98)" //if mmr greater tahn 0 then make it green or red
            }"
            >${
              mmrchange > 0 ? "+" + mmrchange : mmrchange //if mmr is greater than 0 then add plus sign
            }</span>
        </div>
        <div class="kda text1">KDA <span class="kda1">${i.stats.kills}/${
          i.stats.deaths //KDA HTML
        }/${i.stats.assists}</span></div>
        <div class="winloss winloss1 text1">
          ${teamstats.has_won ? "Victory" : "Defeat"}
          <span class="score">${teamstats.rounds_won}-${
          teamstats.rounds_lost //ROUNDS WON AND ROUNDS LOST
        }</span>
        </div>
        <div class="acs text1">ACS <span class="acs1">${Math.trunc(
          //Calculate the ACS and then truncate it so no decimals
          i.stats.score / (teamstats.rounds_won + teamstats.rounds_lost)
        )}</span></div>

        <div class="map">
          <img
            src="ValorantMaps/${
              json.data[a].metadata.map //Sets the map for the scoreboard
            }.png"
            alt=""
          />
        </div>
      </div>`;
        a++; //Moves onto next game to see if its victory or loss
      }
    }
    doWork();
    matchHistory();
  });
};
