import React from 'react';
import Select from 'react-select';
import BingoCard from '../subcomponents/BingoCard';

class CardGenerator extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      generatedCards: [],
      numberOfCards: null,
      blackWhite: false,
      color: null,
      perPage: null
    }
    window.addEventListener("beforeprint", this.printCards);
  }

  generateBingoNumbers = () => {
    let letters = ["B", "I", "N", "G", "O"];
    let numbers = {};
    let count = 1;
    letters.forEach((letter) => {
      numbers[letter] = [];
      for(let i = 1; i <= 15; i++) {
        numbers[letter].push(count);
        count++;
      }
    })
    return numbers;
  }

  handleNumberSelect = (event) => {
    this.setState({numberOfCards: parseInt(event.value)});
  }
  handleColorSelect = (event) => {
    this.setState({color: event.value});
  }
  handlePerPageSelect = (event) => {
    this.setState({perPage: event});
  }
  handleBWCheckbox = (e) => {
    this.setState({blackWhite: e.currentTarget.checked});
  }

  handleButton = (event) => {
    let cards = [];
    for(let i = 1; i <= this.state.numberOfCards; i++){
      cards.push(this.generateCard());
    }
    this.setState({generatedCards: cards});
  }

  generateCard = () => {
    let numbers = this.generateBingoNumbers();
    let card = {};
    Object.keys(numbers).map(letter => {
      let chosenNumbers = [];
      for(let i = 0; i<5; i++){
        chosenNumbers.push(numbers[letter].splice(Math.floor(Math.random()*numbers[letter].length), 1));
      }
      card[letter] = chosenNumbers;
      return letter;
    });
    return card;
  }

  printCards = () => {
    let style = document.createElement('style');
    switch(this.state.perPage.value){
      case "2":
        style.appendChild(document.createTextNode('@page { orientation: landscape; size: landscape; margin: 1in .5in; }'));
        break;
      case "4":
        style.appendChild(document.createTextNode('@page { orientation: portrait; size: portrait; margin: 1in .5in; }'));
        break;
      case "6":
        style.appendChild(document.createTextNode('@page { orientation: landscape; size: landscape; margin: 0.4in 0.25in; }'));
        break;
      default:
        style.appendChild(document.createTextNode('@page { orientation: portrait; size: portrait; margin: 1in .5in; }'));
        break;
    }
    document.head.appendChild(style);
  }

  get perPageOptions() {
    let options = [
      {value: "2", label: "2"},
      {value: "4", label: "4"},
      {value: "6", label: "6"}
    ];
    return options;
  }

  get numberOfCardsOptions() {
    let options = [];
    for(let i = 0; i <= 100; i++){
      options.push({value: i.toString(), label: i.toString()});
    }
    return options;
  }

  get colorOptions(){
    return [
      {value: "red", label: "Vermelho"},
      {value: "orange", label: "Laranja"},
      {value: "yellow", label: "Amarelo"},
      {value: "green", label: "Verde"},
    {value: "blue", label: "Azul"},
      {value: "purple", label: "Roxo"},
      {value: "pink", label: "pink"},
      {value: "aqua", label: "Ciano"},
      {value: "gray", label: "Cinza"},
      {value: "brown", label: "Marron"}
    ]
  }

  get sectionClasses() {
    let classes = "padding-vertical-xxlg pale-gray-bg " + this.state.blackWhite === "true" ? "print-bw " : "print-color ";
    if(this.state.perPage !== null){
      switch(this.state.perPage.value){
        case "2":
          classes+= 'print-two ';
          break;
        case "4":
          classes+= 'print-four ';
          break;
        case "6":
          classes+= 'print-six ';
          break;
        default:
          classes+= 'print-four ';
          break;
      }
    }
    return classes;
  }

  get generateButtonDisabled(){
    return this.state.numberOfCards === null || this.state.color === null;
  }

  render() {
    return(
      <section className={this.sectionClasses}>
        <div className="container row no-print">
          <div className="col">
            <h1>Gerador de Cartelas</h1>
            <p>Gere Cartelas aleat??rias e imprima para jogar em qualquer lugar! Basta escolher a quantidade e cor depois s?? clicar em Gerar!</p>
            <p className="medium-text">A impress??o das cartelas ser?? no padr??o das cores e at?? 4 cartelas por p??gina. Voc?? tamb??m pode alterar essas configura????es. <br/>
              Ex: Imprimir 2 por p??gina resultar?? em cartelas maiores, mas isso tamb??m pode ser configurado depois nas op????es de sua impressora.</p>
              <h2>Gerar n??meros das cartelas ao gosto do jogador</h2>
              <p>Isto ser?? poss??vel logo implementaremos, consulte suporte caso queira gerar cartelas manualmente!</p>
            <div className="row justify-start align-center extra-pale-gray-bg padding-xlg">
              <div className="col shrink padding-horizontal-md">
                <Select 
                  className="number-select"
                  placeholder="N??mero de Cartelas"
                  onChange={this.handleNumberSelect}
                  options={this.numberOfCardsOptions}
                />
              </div>
              <div className="col shrink padding-horizontal-md">
                <Select 
                  className="number-select"
                  placeholder="Cores das cartelas"
                  onChange={this.handleColorSelect}
                  options={this.colorOptions}
                />
              </div>
              <div className="col shrink padding-horizontal-md margin-right-xlg">
                <button className="primaryBtn" onClick={this.handleButton.bind(this)} disabled={this.generateButtonDisabled}>Gerar Cartelas</button>
              </div>
              <div className="col shrink padding-horizontal-lg">
                <h5>Op????es de impress??o</h5>
              </div>
              <div className="col shrink padding-horizontal-md">
                <Select
                  className="number-select single"
                  placeholder="Por P??gina"
                  onChange={this.handlePerPageSelect}
                  options={this.perPageOptions}
                />
              </div>
              <div className="col shrink padding-horizontal-md">
                <label className={this.state.blackWhite ? 'toggle checked' : 'toggle'}>
                  <span className="toggle-span"></span>
                  <span>Imprimir Preto/Branco</span>
                  <input type="checkbox" onChange={this.handleBWCheckbox} checked={this.state.blackWhite}></input>
                </label>
              </div>
              <div className="col padding-horizontal-md text-right">
                <button data-visibility={this.state.generatedCards.length > 0 ? 'show' : 'hide'} className="altBtn" onClick={() => {window.print();return false;}}>IMPRIMIR</button>
              </div>
            </div>
          </div>
        </div>
        <div className="row card-block justify-center margin-vertical-lg">
            <div className="col text-center">
              {this.state.generatedCards.map((card, index) => {
                  return( 
                    <div data-color={this.state.blackWhite ? 'dk-gray' : this.state.color} className="card" key={"a" + index}>
                      <BingoCard card={card} />
                    </div>
                  )
                })}
            </div>
          </div>
      </section>
    )
  }
}

export default CardGenerator;