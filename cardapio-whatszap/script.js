function formatarMoeda(valor){
return valor.toLocaleString("pt-BR",{
style:"currency",
currency:"BRL"
})
}

let carrinho=[]
let total=0

function atualizarCarrinho(){

const lista=document.getElementById("lista-carrinho")
lista.innerHTML=""

let quantidadeTotal=0
total=0

carrinho.forEach(produto=>{

const item=document.createElement("li")

const texto=document.createElement("span")

texto.textContent=produto.nome+" x"+produto.quantidade+" - "+formatarMoeda(produto.preco*produto.quantidade)

const botaoMais=document.createElement("button")
botaoMais.textContent="+"

botaoMais.onclick=function(){

produto.quantidade++

salvarCarrinho()
atualizarCarrinho()

}

const botaoMenos=document.createElement("button")
botaoMenos.textContent="-"

botaoMenos.onclick=function(){

produto.quantidade--

if(produto.quantidade<=0){

carrinho=carrinho.filter(p=>p.nome!==produto.nome)

}

salvarCarrinho()
atualizarCarrinho()

}

item.appendChild(texto)
item.appendChild(botaoMais)
item.appendChild(botaoMenos)

lista.appendChild(item)

quantidadeTotal+=produto.quantidade
total+=produto.preco*produto.quantidade

})

document.getElementById("total").textContent=formatarMoeda(total)

document.getElementById("total-fixo").textContent=formatarMoeda(total)

document.getElementById("contador-itens").textContent=quantidadeTotal+" itens"

}

function adicionarProduto(nome,preco){

let produtoExistente=carrinho.find(p=>p.nome===nome)

if(produtoExistente){

produtoExistente.quantidade++

}else{

carrinho.push({
nome:nome,
preco:preco,
quantidade:1
})

}

salvarCarrinho()
atualizarCarrinho()

}

function limparCarrinho(){

carrinho=[]
total=0

localStorage.removeItem("carrinho")

atualizarCarrinho()

}

function salvarCarrinho(){

localStorage.setItem("carrinho",JSON.stringify(carrinho))

}

function carregarCarrinho(){

const carrinhoSalvo=localStorage.getItem("carrinho")

if(carrinhoSalvo){

carrinho=JSON.parse(carrinhoSalvo)

atualizarCarrinho()

}

}

function finalizarPedido(){

const nome=document.getElementById("nomeCliente").value

let mensagem="Olá meu nome é "+nome+"%0A%0A"

mensagem+="Pedido:%0A"

carrinho.forEach(produto=>{

mensagem+=produto.nome+" x"+produto.quantidade+" - "+formatarMoeda(produto.preco*produto.quantidade)+"%0A"

})

mensagem+="%0ATotal: "+formatarMoeda(total)

const telefone="5511957735271"

const url="https://wa.me/"+telefone+"?text="+mensagem

window.open(url)

}

window.onload=carregarCarrinho

let produtos = []

function salvarProdutos(){
localStorage.setItem("produtos",JSON.stringify(produtos))
}

function carregarProdutos(){

const dados = localStorage.getItem("produtos")

if(dados){

produtos = JSON.parse(dados)

}else{

produtos = [

{
nome:"X-Bacon",
preco:28,
imagem:"img/xBacon.png"
},

{
nome:"Bacon Egg",
preco:23,
imagem:"img/bacon-egg.png"
},

{
nome:"Monstruoso",
preco:28,
imagem:"img/monstruoso.png"
}

]

}

renderizarProdutos()

}

function renderizarProdutos(){

const area = document.getElementById("produtos")

area.innerHTML = ""

produtos.forEach(produto=>{

const card = document.createElement("div")

card.className = "produto"

card.innerHTML = `
<img src="${produto.imagem}">
<h3>${produto.nome}</h3>
<p>${formatarMoeda(produto.preco)}</p>
<button onclick="adicionarProduto('${produto.nome}',${produto.preco})">
Adicionar
</button>
`

area.appendChild(card)

})

}

function criarProduto(){

const nome = document.getElementById("novoNome").value
const preco = Number(document.getElementById("novoPreco").value)
const imagem = document.getElementById("novaImagem").value

const produto = {

nome:nome,
preco:preco,
imagem:imagem

}

produtos.push(produto)

salvarProdutos()

renderizarProdutos()

}
function entrarAdmin(){

const senha = prompt("Digite a senha de administrador")

if(senha === "1234"){

document.getElementById("admin-area").style.display = "block"

}else{

alert("Senha incorreta")

}

}