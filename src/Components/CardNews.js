//criando uma classe que herda de elementos HTML
class CardNews extends HTMLElement {
    //instanciando o construtor da classe e o construtor super
    constructor(){
        super();

        //deixando nosso shadow DOM aberto para que outros arquvivos js possam alterar as props
        const shadow = this.attachShadow({mode: "open"});

        //"pendurando" o build na arvore do nosso shadow DOM
        shadow.appendChild(this.build());
        shadow.appendChild(this.styles());
    }

    //criando o método build:
    build() {

        //criando nosso componente raiz como uma div
        const componentRoot = document.createElement("div");
        //falando que a classe dessa div será chamada de "card"
        componentRoot.setAttribute("class", "card");

        //criando a div cardLeft
        const cardLeft = document.createElement("div");
        //mesma coisa, passando o atrinuto classe e seu nome
        cardLeft.setAttribute("class", "card__left");

        //criando um span para conter o nome do autor
        const autor = document.createElement("span");
        //escrevendo o nome do autor através da propriedade "autor" criada. repare que aqui não estamos
        //setando o atributo, estamos pegando. por isso getAttribute.
        autor.textContent = "Por: " + (this.getAttribute("autor") || "Anônimo");

        //criando o link com o titulo da noticia
        const linkTitle = document.createElement("a");
        //passando titulo através da propriedade title ~ mesmo esquema da de cima: get
        linkTitle.textContent = this.getAttribute("title");
        //passando link tbm pela propriedade
        linkTitle.href = this.getAttribute("link-url");

        //mesma coisa com o conteúdo da noticia
        const newsContent = document.createElement("p");
        newsContent.textContent = this.getAttribute("content");


        //agora vamos trabalhar para formar nossa arvóre dos componentes html:
        //basicamente estamos falando que a div cardLeft é pai desses 3 elementos
        cardLeft.appendChild(autor);
        cardLeft.appendChild(linkTitle);
        cardLeft.appendChild(newsContent);

        //agora vamos fazer a mesma coisa, mas com a div que ficará a direita
        const cardRight = document.createElement("div");
        cardRight.setAttribute("class", "card__right");

        //criando o elemento responsável pela imagem
        const newsImg = document.createElement("img");
        //pegando img fornecida via props, caso não seja informado/encontrado coloca uma img padrão
        newsImg.src = this.getAttribute("picture") || "assets/default.png";
        
        //criando a arvore da nossa div da direita:
        cardRight.appendChild(newsImg);

        //por fim, vamos "pendurar" nossas 2 divs filhas naquela criada lá no começo,
        //que vai ser o "pai" de todos esses

        componentRoot.appendChild(cardLeft);
        componentRoot.appendChild(cardRight);

        //retorno do metodo
        return componentRoot;

    }

    //criando agora o método responsável pela estilização dos cards de noticia
    styles() {
        //criando o style no html
        const style = document.createElement("style");

        //agora vamos escrever todo o conteúdo do css aqui ~ p.s: é importante usar
        // a crase
        style.textContent = `
            .card{
                width: 80%;
                box-shadow: 9px 9px 27px 0px rgba(0, 0, 0, 0.75);
                -webkit-box-shadow: 9px 9px 27px 0px rgba(0, 0, 0, 0.75);
                -moz-box-shadow: 9px 9px 27px 0px rgba(0, 0, 0, 0.75);
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }
            .card__left {
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding-left: 10px;
            }

            .card__left > span {
                font-weight: 400;
            }
            .card__left > a {
                margin-top: 15px;
                font-size: 25px;
                color: black;
                text-decoration: none;
                font-weight: bold;
            }
            .card__left > p {
                color: rgb(70, 70, 70);
            }
            .card__right > img{
                width: 100%;
            }
        `;
        return style;
    }
}
        //definindo nossa tag HTML customizavel com um nome para ser "chamada" 
        //no arquivo index.html
        customElements.define("card-news", CardNews);