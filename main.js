// Referências dos elementos
const form = document.getElementById("form-contato");
const listaContatos = document.getElementById("lista-contatos");

// Função para carregar contatos
async function carregarContatos() {
    const { data, error } = await supabaseClient
        .from("contatos")
        .select("*")
        .order("criado_em", { ascending: false });

    if (error) {
        console.error("Erro ao carregar contatos:", error);
        return;
    }

    listaContatos.innerHTML = "";
    data.forEach(contato => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${contato.nome}</td>
            <td>${contato.email}</td>
            <td>${contato.telefone || ""}</td>
            <td class="actions">
                <button onclick="atualizarContato('${contato.id}')">✏ Atualizar</button>
                <button onclick="excluirContato('${contato.id}')">🗑 Excluir</button>
            </td>
        `;
        listaContatos.appendChild(row);
    });
}

// Adicionar contato
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();

    const { error } = await supabaseClient
        .from("contatos")
        .insert([{ nome, email, telefone }]);

    if (error) {
        alert("Erro ao adicionar contato!");
        console.error(error);
        return;
    }

    form.reset();
    carregarContatos();
});

// Atualizar contato
async function atualizarContato(id) {
    const novoNome = prompt("Novo nome:");
    const novoEmail = prompt("Novo e-mail:");
    const novoTelefone = prompt("Novo telefone:");

    if (!novoNome || !novoEmail) {
        alert("Nome e e-mail são obrigatórios!");
        return;
    }

    const { error } = await supabaseClient
        .from("contatos")
        .update({ nome: novoNome, email: novoEmail, telefone: novoTelefone })
        .eq("id", id);

    if (error) {
        alert("Erro ao atualizar contato!");
        console.error(error);
        return;
    }

    carregarContatos();
}

// Excluir contato
async function excluirContato(id) {
    if (!confirm("Tem certeza que deseja excluir este contato?")) return;

    const { error } = await supabaseClient
        .from("contatos")
        .delete()
        .eq("id", id);

    if (error) {
        alert("Erro ao excluir contato!");
        console.error(error);
        return;
    }

    carregarContatos();
}

// Carregar contatos ao abrir
carregarContatos();
