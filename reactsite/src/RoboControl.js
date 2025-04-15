import ReactSlider from 'react-slider'

const RoboControl = (props,state) => {

    state.index = 10

    return (
        <ReactSlider
    className="horizontal-slider"
    thumbClassName="example-thumb"
    trackClassName="example-track"
    renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
    />
    )

};
export default RoboControl;