window.ee = new EventEmitter();

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
    /* author: 'Гость', */
    text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
    bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
  }
];

var TestInput = React.createClass({

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
          ref='myTestInput'/>
        <button onClick={this.onBtnClickHandler} ref='alert_button'>Добавить новость</button>
      </div>
    );
  }
});

var Article = React.createClass({
  /* propTypes: {
    data: React.PropTypes.shape({ text: React.PropTypes.string.isRequired }),
    data: React.PropTypes.shape({ author: React.PropTypes.string.isRequired })
  },*/

  getDefaultProps: function(){
    return {
      author: 'несуществующее свойство автор по-умолчанию'
    };
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

var Add = React.createClass({
  getInitialState: function() {
    return {
      agreeNotChecked: true,
      authorIsEmpty: true,
      textIsEmpty: true
    };
  },
  componentDidMount: function() {
    ReactDOM.findDOMNode(this.refs.author).focus();
  },

  onBtnClickHandler: function(e) {
    e.preventDefault();

    var author = ReactDOM.findDOMNode(this.refs.author).value;

    var textEl = ReactDOM.findDOMNode(this.refs.text);
    var text = textEl.value;

    var item = [{
      author: author,
      text: text,
      bigText: '...'
    }];

    window.ee.emit('News.add', item);

    textEl.value = '';
    this.setState({ textIsEmpty: true });
  },

  onCheckRuleClick: function(e) {
    this.setState({ agreeNotChecked: !this.state.agreeNotChecked });
  },

  onFieldChange: function(fieldName, e) {
    if (e.target.value.trim().length > 0) {
      this.setState({[''+fieldName]:false})
    } else {
      this.setState({[''+fieldName]:true})
    }
  },

  render: function() {
    var agreeNotChecked = this.state.agreeNotChecked,
        authorIsEmpty = this.state.authorIsEmpty,
        textIsEmpty = this.state.textIsEmpty;

    return (
      <form className='add cf'>

        <input
          type='text'
          className='add__author'
          onChange={this.onFieldChange.bind(this, 'authorIsEmpty')}
          placeholder='Ваше имя'
          ref='author'/>

        <textarea
          className='add__text'
          onChange={this.onFieldChange.bind(this, 'textIsEmpty')}
          placeholder='Текст новости'
          ref='text'></textarea>

        <label className='add__checkrule'>
          <input type='checkbox' ref='checkrule' onChange={this.onCheckRuleClick}/>Я согласен с правилами

        </label>

        <button
          className='add__btn'
          onClick = {this.onBtnClickHandler}
          ref = 'alert_button'
          disabled = {agreeNotChecked || authorIsEmpty || textIsEmpty}>
          Опубликовать новость
        </button>

      </form>
    );
  }
});

var App = React.createClass({

  getInitialState: function() {
    return {
      news: my_news
    };
  },
  componentDidMount: function() {
    var self = this;
    window.ee.addListener('News.add', function(item) {
      var nextNews = item.concat(self.state.news);
      self.setState({news: nextNews});
    });
  },
  componentWillUnmount: function() {
    window.ee.removeListener('News.add');
  },

  onBtnClickHandler: function(e) {
    e.preventDefault();
    var author = ReactDOM.findDOMNode(this.refs.author).value;
    var text = ReactDOM.findDOMNode(this.refs.text).value;

    var item = [{
      author: author,
      text: text,
      bigText: '...'
    }];

    window.ee.emit('News.add', item);
    textEl.value = '';
    this.setState({textIsEmpty: true});
  },

  render: function(){
    return (
      <div className="app">
        <Add />
        <News data={this.state.news}/>
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