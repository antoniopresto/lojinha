let TransitionGroup = React.addons.CSSTransitionGroup;

TopoMenu = React.createClass({
    mixins: [ReactMeteorData],

    getInitialState(){
        return {
            open: false
        }
    },

    getMeteorData(){
        let route = Router.current().route || {};
        let routeName = route.name;
        let links = this.props.links;

        return {
            title: document.title,
            routeName,
            links
        };
    },

    handleRightButton(ev){
        let open = !this.state.open;
        this.setState({open});
    },

    render(){
        let className = (this.state.open) ? " open": '';
        return(
            <div className="topo-menu-wr">
                <Row class='topo-menu'>
                    <Col class="left" size={{xs:2, sm: 1}}>
                        {this.props.leftButton}
                    </Col>

                    <Col size={{xs:8, sm: 10}}>
                        <h1 className='title'>{this.data.title}</h1>
                    </Col>

                    <Col class="burger" size={{xs:2, sm: 1}} align="right">
                        <a onClick={this.handleRightButton}>
                            <div id="hamburger"
                                 className={"hamburger-icon-3" + className}>
                               <span></span>
                               <span></span>
                               <span></span>
                               <span></span>
                            </div>
                        </a>
                    </Col>

                    {this.renderMenu()}
                </Row>
            </div>
        );
    },

    renderMenu(){
        if(!this.state.open) return <span />
        return(
            <TransitionGroup transitionName="topo-menu" transitionAppear={true}>
                <div className="topo-menu-box" style={{height: hh}}>
                    <ul>
                        {_.map(this.data.links, (a, k) => {
                            setTimeout(()=>{
                                let node = React.findDOMNode(this.refs['link_'+k]);
                                node && (node.className = 'animated bounceInUp');
                            }, 100 * k);

                            return(
                                <li className="menu-item" key={k}>
                                    <a  className='hide'
                                        ref={'link_'+k}
                                        href={a.href}
                                        target={a.target || '_self'}
                                        onClick={(ev)=>{
                                            this.handleRightButton(); // fechar
                                            a.onClick && a.onClick(ev);
                                        }}>
                                        {a.icon && <i className={a.icon}></i>}
                                        {a.title}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </TransitionGroup>
        );
    }
});
