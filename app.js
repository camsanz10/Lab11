class Agente {
    constructor(nombre, rol, habilidades, imagen) {
        this.nombre = nombre;
        this.rol = rol;
        this.habilidades = habilidades;
        this.imagen = imagen;
    }
}

async function getAgents() {
    try {
        const response = await fetch('https://valorant-api.com/v1/agents');
        const data = await response.json();
        const agentes = data.data.map(agente => new Agente(
            agente.displayName,
            agente.role ? agente.role.displayName : 'Desconocido',
            agente.abilities.map(habilidad => habilidad.displayName),
            agente.displayIcon
        ));
        renderAgents(agentes);
        setupSearch(agentes);
    } catch (error) {
        console.error('Error al obtener los agentes:', error);
    }
}

function renderAgents(agentes) {
    const container = document.getElementById('agentsContainer');
    container.innerHTML = ''; // Limpia el contenedor antes de renderizar
    agentes.forEach(agente => {
        const agentCard = document.createElement('div');
        agentCard.classList.add('agent-card');
        agentCard.innerHTML = `
            <img src="${agente.imagen}" alt="${agente.nombre}">
            <h2>${agente.nombre}</h2>
            <p>Rol: ${agente.rol}</p>
            <h3>Habilidades:</h3>
            <ul>${agente.habilidades.map(habilidad => `<li>${habilidad}</li>`).join('')}</ul>
        `;
        container.appendChild(agentCard);
    });
}

function setupSearch(agentes) {
    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('input', () => {
        const searchTerm = searchBar.value.toLowerCase();
        const filteredAgents = agentes.filter(agente =>
            agente.nombre.toLowerCase().includes(searchTerm)
        );
        renderAgents(filteredAgents);
    });
}

document.addEventListener('DOMContentLoaded', getAgents);