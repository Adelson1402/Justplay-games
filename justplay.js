
//Gere sua API_KEY aqui -> https://rawg.io/apidocs

async function getGames(){

    clearBodyImages();

    const panel = document.createElement('div');

    panel.id = 'panelDiv';

    panel.className = 'painel';

    const gameName = document.getElementById('nameGame');

    const spinner = document.getElementById('spinner');

    if(!callAndValidateGameName(gameName.value)){
        return;
    }

      fetch('https://api.rawg.io/api/games?search='+gameName.value+'&key=SUA_API_KEY_AQUI&search_precise=true')
                     .then(resp => {
                        loading(resp);

                        if(resp.ok){
                    
                          spinner.classList.add('hidden');
                       
                          return resp.json().then(data => {

                              const responseJson = data;

                              console.log(data);
                               
                              buildFirstPanel(responseJson.results);
                            })
                        }
                     });

                     document.body.appendChild(panel);
}


function buildFirstPanel(results){

    const painel = document.getElementById('panelDiv');

   
    
    for(let r of results){

        const subPanel = document.createElement('div');

        const name = document.createElement('span');

        name.textContent  = r.name;

        subPanel.className = 'card img-panel';
    
        subPanel.style.maxWidth = "18rem";
        subPanel.style.height = "max-content";
    
        subPanel.id = 'subPanelId';

        const img = document.createElement('img');

        img.className = 'card-img-top';

        if(r.background_image){
            img.src = r.background_image;
        }

        subPanel.appendChild(img);

        subPanel.appendChild(name);

        if(r.platforms){
            buildPlataforms(r.platforms, subPanel)
        }

        painel.appendChild(subPanel);
    }
}

function callAndValidateGameName(gameName){

    const gameNameLength = gameName.trim();

    if(gameNameLength.length === 0){
        alert('Insira um nome de um jogo');
        return;
    }

    gameName = gameName.replaceAll(' ','%20');

    return true;
}

function clearBodyImages(){
    const panel = document.getElementById('panelDiv');

    if(panel){
        panel.remove();
    }
}

function loading(response){

    if(response.status != 200){
        spinner.classList.remove('hidden');
    }
   
}

function buildPlataforms(platforms, subPanel){

    const divPlatform = document.createElement('div');

    for(let platform of platforms){

        const iconPlatform = document.createElement('i');

        iconPlatform.className = getPlatformsIcon(platform.platform.name);

        iconPlatform.title = platform.platform.name;

        divPlatform.appendChild(iconPlatform);
    }

    subPanel.appendChild(divPlatform);
}

function getPlatformsIcon(platformName){

    switch (platformName){
        case 'PlayStation 5':
            return 'bi bi-playstation black';
        case 'PlayStation 4':
            return 'bi bi-playstation white';
        case 'PlayStation 3':
        case 'PlayStation 2':
        case 'PlayStation':
            return 'bi bi-playstation';
        case 'PS Vita':
            return 'bi bi-playstation blue';
        case 'PC':
            return 'bi bi-pc';
        case 'Xbox One':
            return 'bi bi-xbox';
        case 'Xbox 360':
            return 'bi bi-xbox x360';
        case 'Nintendo Switch':
            return 'bi bi-nintendo-switch';
        default:
            return 'bi bi-dpad';
    }
}

