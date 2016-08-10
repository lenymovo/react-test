'use strict'
      var contacts = [
        {
          id: 1,
          name: "ivan",
          prof: 'ingener',
          image: "img/1.jpg"
        }, {
          id: 2,
          name: 'vasya',
          prof: 'programmer',
          image: "img/2.jpg"
        }, {
          id: 3,
          name: 'petya',
          prof: 'director',
          image: "img/3.jpg"
        }, {
          id: 4,
          name: 'ilya',
          prof: 'manager',
          image: "img/4.jpg"
        }
      ];

      var Contact = React.createClass({
        render: function(){
          return (
            <li>
              <img src={this.props.img} />
              {" " + this.props.name} 
              {" " + this.props.prof}
            </li>
          )
        }
      });

        var ContactList = React.createClass({
          getInitialState: function(){
            return{
              currArray: contacts
            }
          },

          handleEvent1: function(event){
            var currArray = contacts.filter(function(el){
              return el.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1;
            });

            this.setState({
              currArray: currArray
            })
          },

          render: function(){
            return (
              <div>
                <input type="text" onChange={this.handleEvent1}/>
                <ul>
                  {
                    this.state.currArray.map(function(el){
                      return <Contact 
                        key={el.id} 
                        name={el.name}
                        prof={el.prof}
                        img={el.image}
                      />
                    })
                  }
                </ul>
              </div>)
          }
        });

        ReactDOM.render(
          <ContactList />,
          document.getElementById('content')
        );