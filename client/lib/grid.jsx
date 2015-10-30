var tnum = function(num){
    switch (num) {
        case 1: return 'one';
        case 2: return 'two';
        case 3: return 'three';
        case 4: return 'four';
        case 5: return 'five';
        case 6: return 'six';
        case 7: return 'seven';
        case 8: return 'eight';
        case 9: return 'nine';
        case 10: return 'ten';
        case 11: return 'eleven';
        case 12: return 'twelve';
        case 13: return 'thirteen';
        case 14: return 'fourteen';
        case 15: return 'fifteen';
        case 16: return 'sixteen';
        default: 'one';
    }
};


//Page Container responsivo
Container = React.createClass({
    render(){
        let className = (this.props.className) ? (this.props.className + ' ') : '';
        return(
            <div id={this.props.id || ''} className="ui container">
                <div className={className + "column"} style={this.props.style || {}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
})




Row = React.createClass({
    render(){
        var rowClass = (this.props.className || '') + ' ';

        //align
        var align = this.props.align;
        if(typeof align === 'object'){
            rowClass += (align.xs) ? (align.xs + '-xs' + ' ') : '';
            rowClass += (align.sm) ? (align.sm + '-sm' + ' ') : '';
            rowClass += (align.md) ? (align.md + '-md' + ' ') : '';
            rowClass += (align.lg) ? (align.lg + '-lg' + ' ') : '';
        }
        if(typeof align === 'string') rowClass += align + '-xs';
        rowClass = 'fbx_row ' + rowClass;

        //inline style
        var rowStyle = this.props.style || {};

        return(
            <div className={rowClass} style={rowStyle}>
                {this.props.children}
            </div>
        );
    }
});



Col = React.createClass({
    render(){
        var colClass = (this.props.className || '') + ' ';
        var boxClass = 'box ' + (this.props.boxClass || '') + ' ';

        //size
        var size = this.props.size;
        if(typeof size === 'object'){
            colClass += (size.xs) ? ('col-xs-' + size.xs + ' ') : '';
            colClass += (size.sm) ? ('col-sm-' + size.sm + ' ') : '';
            colClass += (size.md) ? ('col-md-' + size.md + ' ') : '';
            colClass += (size.lg) ? ('col-lg-' + size.lg + ' ') : '';
        }
        if(typeof size === 'string' || typeof size === 'number'){
            colClass += 'col-xs-' + size;
        }
        if(!this.props.size) colClass += 'col-xs-12';

        //inline style
        var colStyle = this.props.style || {};
        var boxStyle = this.props.boxStyle || this.props.style || {};

        return(
            <div className={colClass} style={colStyle}>
                <div className={boxClass} style={boxStyle}>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

RowCol = React.createClass({
    render(){
        return(
            <Row className={this.props.rowClassName}>
                <Col className={this.props.colClassName} size={this.props.size}>
                    {this.props.children}
                </Col>
            </Row>
        )
    }
});
