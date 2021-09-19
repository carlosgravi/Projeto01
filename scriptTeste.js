// carrega a lista salva no localStorage, transforma em objeto javascript

function carrega() {
    const tarefas = JSON.parse(localStorage.getItem("@listaTarefas:tarefas"));
    if (tarefas === null) {
      return;
    }
    for (const tarefa of tarefas) {
      criaListaTarefas(tarefa["task"], tarefa["isChecked"]);
    }
  }
  
//inclui transformando o objeot em string

  function inclui() {
    const listaAdd = document.querySelector("#listaDeTarefas").children;
    const tarefas = [];
  
    for (const li of listaAdd) {
      const tarefa = li.children[1].innerHTML;
      const verifica = li.children[0].checked;
      tarefas.push({ task: tarefa, isChecked: verifica });
    }
  
    localStorage.setItem("@listaTarefas:tarefas", JSON.stringify(tarefas));
  }
  
// Verifica se existe tarefa incluida e cria uma linha com checkbox e botao de excluir para cada tarefa

  function criaListaTarefas(text, verifica = false) {
    const ul = document.querySelector("#listaDeTarefas");
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", riscaTarefaConcluida);
    const span = document.createElement("span");
    span.innerHTML = text;
    span.classList.add("task");
    const buttonDelete = document.createElement("button");
    buttonDelete.innerHTML = `<i>-</i>`;
    buttonDelete.addEventListener("click", apagaTarefa);
  
    if (verifica) {
      checkbox.checked = true;
      span.classList.add("done");
    }
  
    li.appendChild(checkbox);

  // cria posição dos botoes checkbox e delete

    checkbox.insertAdjacentElement("afterend", span);
    span.insertAdjacentElement("afterend", buttonDelete);
  
    ul.appendChild(li);
  }
  
// função adicionar tarefa e retorna mensagem quando não tiver escrito nada ao adicionar

  function adicionaTarefa(event) {
    event.preventDefault();
  
    const taskElement = document.querySelector("#incluiTarefa");
    const task = taskElement.value;

    if (task.length === 0) {
      alert("Digite o nome da tarefa.");
      return;
    }
  
    criaListaTarefas(task);
  
    taskElement.value = "";
  
    inclui();
  }
  
// função risca tarefa concluida quando marcada no checkbox

  function riscaTarefaConcluida(event) {
    const span = event.target.parentElement.children[1];
    if (event.target.checked) {
      span.classList.add("done");
    } else {
      span.classList.remove("done");
    }
    inclui();
  }
 
//função apaga tarefa com verificador se deseja apagar ou não e confirmação de exclusão caso opte por excluir e aviso de que a tarefa
//foi mantida caso desista

  function apagaTarefa(event){
    swal({
      title: "Tem certeza?",
      text: "Depois de excluída, você não será capaz de recuperar esta tarefa!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((result) => {
      if (result) {
          event.target.parentElement.remove();
          inclui();
        swal("Pronto! Sua tarefa foi pagada com sucesso!", {
          icon: "success",
        });
      } else {
        swal("Sua tarefa não foi apagada!");
      }
    });
  }

  