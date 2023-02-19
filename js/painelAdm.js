const url = 'https://soundgarden-api.vercel.app/events' // resgatar os eventos dessa url

const postEvent = document.querySelector('#tbody-events-adm') // selecionar pra onde vão os eventos no HTML (posicionar) através do DOM

// BUSCAR OS EVENTOS (GET)

async function getEvents(){ // função assíncrona pra pegar os eventos
    const response = await fetch(url); // esperar as requisições (await) / response = variável padrão (primeira resposta após o fetch)
    console.log(response); // resposta ok no F12 (status: 200)

    const data = await response.json(); // json vai extrair em dados recebendo-os como um array de objetos / data = variável padrão (posso chamar por outro nome, como events)
    console.log(data);

    data.map((event) => { // inserir os dados no template / map vai passar por cada um dos elementos que veio na requisição / event é o dado que estou recebendo

        // criar os elementos da tabela de eventos com base no HTML
        const tr = document.createElement("tr"); // div que vai abrigar todos os elementos abaixo em linha
        const th = document.createElement("th"); // div que vai abrigar os elementos de cabeçalho
        const tdDate = document.createElement("td");
        const tdName = document.createElement("td");
        const tdAttractions = document.createElement("td");
        const tdActions = document.createElement("td");
        const buttonVerReservas = document.createElement("a");
        const buttonEditar = document.createElement("a");
        const buttonExcluir = document.createElement("a");

        // relembrando elementos da tabela: th (table header), td (table data) e tr (table row)

        // defino que os elementos da tabela serão alinhas em linha (row)
        th.scope = "row"; 

        // defino o número da coluna # que indica a quantidade de eventos (início=1)
        th.innerText = 1 // ainda mal feito !
        
        // criados os elementos da tabela, preencho-os com o conteúdo que vem da API:
        tdDate.innerText = event.scheduled; // lembrando que 'event' é o dado que estou recebendo
        tdName.innerText = event.name; // 'scheduled', 'name' e 'attractions' é como cada elemento está identificado na API
        tdAttractions.innerText = event.attractions;
        
        // definir ação, estilo e texto de cada botão:
        buttonVerReservas.setAttribute("href", `reservas.html?id=${data.id}`); // montar o link com o id de cada botão na url pra ter páginas individuais
        buttonVerReservas.classList.add("btn", "btn-dark");
        buttonVerReservas.innerText = "ver reservas";

        buttonEditar.setAttribute("href", `editar-evento.html?id=${data.id}`);
        buttonEditar.classList.add("btn", "btn-secondary");
        buttonEditar.innerText = "editar";

        buttonExcluir.setAttribute("href", `excluir-evento.html?id=${data.id}`);
        buttonExcluir.classList.add("btn", "btn-danger");
        buttonExcluir.innerText = "excluir";

        // coloco todos na div tr (através do appendChild) - essa div é a linha da tabela e vai receber todos os elementos de cada evento formando as colunas (faz uma coluna de cada vez)
        tr.appendChild(th);
        tr.appendChild(tdDate);
        tr.appendChild(tdName);
        tr.appendChild(tdAttractions);
        tr.appendChild(tdActions);

        // adiciono os três botões dentro da coluna tdActions
        tdActions.appendChild(buttonVerReservas);
        tdActions.appendChild(buttonEditar);
        tdActions.appendChild(buttonExcluir);

        // e agora posiciono essa div (tr) no #tbody-events-adm (que foi definida como postEvent no início do código)
        postEvent.appendChild(tr)

        // a declaração return finaliza a execução de uma função / ainda não entendi como funciona e se é necessário isso...
        return tr; // tr é a div que está abrigando os elementos na tabela
    }) 
}

// por fim, chamo a função pra ela ser executada
getEvents()