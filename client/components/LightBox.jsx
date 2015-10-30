let _component;
let _callbacks = [];
let _runCallbacks = (open) => {
    _callbacks.map((fn) => {
        fn(open);
    });
};

LightBox = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            open: Session.get('lightboxOpen'),
            component: _component
        }
    },

    render() {
        let className = (this.data.open) ? "open" : 'close';
        if(!this.data.open || !this.data.component) return <div />;

        return (
            <div className={className + " component-lightbox"} style={mwStyle}>
                <Row class="center-xs middle-xs wr">
                    <Col>
                        {this.data.component}
                    </Col>
                </Row>
            </div>
        );
    }
});


_.extend(LightBox, {
    open(component) {
        _component = component;
        Session.set('lightboxOpen', true);
        _runCallbacks(true);

        $('html, body').css({
            'overflow': 'hidden',
            'height': '100%'
        });
    },
    close() {
        _component = null;
        Session.set('lightboxOpen', false);
        _runCallbacks(false);

        $('html, body').css({
            'overflow': 'auto',
            'height': 'auto'
        });
    },
    onChange(cb) {
        let canAdd = true;
        _callbacks.map((c) => {
            if ((c + '') == cb + '') canAdd = false;
        });
        if (canAdd) _callbacks.push(cb);
    }
});
