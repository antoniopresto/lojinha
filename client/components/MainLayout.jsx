window.setWSizes = function(){
    window.ww = $('.main-layout-wr').width() || $(window).width();
    window.hh = $(window).height();
    window.mw = (ww > hh) ? hh : ww;
    window.mwStyle = {maxWidth: mw, maxHeight: mw};
};
setWSizes();

let _menuLinks = [
    {
        title: 'Início',
        href: '/'
    }
];

MainLayout = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData(){
        return {
            showSteps: Session.get('showSteps')
        }
    },

    componentDidMount(){
        setWSizes();
        $(window).resize(setWSizes);
    },

    render() {
        let className = (this.data.showSteps) ? 'show-steps' : '';
        return (
            <div>
                <div className={className + " main-layout-wr"}>
                    <TopoMenu links={_menuLinks} />

                    <RowCol>
                        {this.props.content}
                        <h1>Oi!</h1>
                    </RowCol>
                </div>
            </div>
        );
    }
});
