var my_news = [
  {
    author: 'Саша Печкин',
    text: 'В четчерг, четвертого числа...',
    bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
  },
  {
    author: 'Просто Вася',
    text: 'Считаю, что $ должен стоить 35 рублей!',
    bigText: 'А евро 42!'
  },
  {
    author: 'Гость',
    text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
    bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
  }
];

var TestInput = React.createClass({
  componentDidMount: function() {
    ReactDOM.findDOMNode(this.refs.myTestInput).focus();
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
        likesIncreasing: nextProps.likeCount > this.props.likeCount
    });
  },

  onBtnClickHandler: function() {
    console.log(this.refs);
    alert(ReactDOM.findDOMNode(this.refs.myTestInput).value);
  },

  render: function() {
    return (
      <div>
        <input
          className='test-input'
          defaultValue=''
          placeholder='введите значение'
          ref='myTestInput'
        />
        <button onClick={this.onBtnClickHandler} ref='alert_button'>Показать alert</button>
      </div>
    );
  }
});

var Article = React.createClass({
    propTypes: {
        data: React.PropTypes.shape({ text: React.PropTypes.string.isRequired }),
        data: React.PropTypes.shape({ author: React.PropTypes.string.isRequired })
    },

    getInitialState: function(){
        return { 
            visible: false,
            rating: 0,
            eshe_odno_svoistvo: 'qweqwe'
        };
    },

    readmoreClick: function(e) {
        e.preventDefault();
        var visible = this.state.visible;
        this.setState({ visible: !visible });
    },

    render: function(){
        var visible = this.state.visible;
        return (
            <div>
                <p className="news__text">{this.props.data.text}:</p>
                <p className="news__author">{this.props.data.author}:</p>
                <a href="#" onClick={this.readmoreClick} className={'news__readmore '}>Подробнее</a>
                <p className={'news__big-text ' + (visible ? '': 'none')}>{this.props.data.bigText}</p>
            </div>
        );
    }
});

var News = React.createClass({

    propTypes: { data: React.PropTypes.array.isRequired },

    getInitialState: function() {
        return {
          counter: 0
        }
    },

    onTotalNewsClick: function() {
        this.setState({ counter: ++this.state.counter });
    },

    render: function(){
        var data = this.props.data, newsTemplate = <div>Новостей нет</div>;

        if (data.length > 0){
            newsTemplate = data.map(function(item, index){
                return (
                    <article key={index}>
                        <Article data={item}/>
                    </article>
                );
            });
        }

        return(
            <div className="news">
                <h3>Новости</h3>
                {newsTemplate}
                <strong className={'news__count ' + (data.length > 0 ? '':'none') } 
                onClick={ this.onTotalNewsClick }>
                    Всего новостей: {data.length}
                </strong>
            </div>
        );
    }
});

var Comments = React.createClass({
    render: function(){
        return (
            <div className="comments">
                Нет новостей - комментировать нечего.
            </div>
        );
    }
});

var App = React.createClass({
    render: function(){
        return (
            <div className="app">
                <News data={my_news}/>
                <Comments />
                <TestInput />
            </div>
        );
    }
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);