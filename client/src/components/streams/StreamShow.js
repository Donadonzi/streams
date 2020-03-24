import React from 'react';
import { connect } from 'react-redux';
import flv from 'flv.js';

import { fetchStream } from '../../actions';

class StreamShow extends React.Component {

  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  // We need to refactor this method. Because in the begining when we try to attatch the MediaElement, the videoRef doesn't exist yet, due to the fetching process and the fact that we set an if in the relevant component.
  // I am keeping this former code for reference. There are other way to address this issue, such as refactoring the render() method. But we are gonna go with the more complicated solution.
  // componentDidMount() {
  //   const { id } = this.props.match.params;
  //   this.props.fetchStream(id);

  //   this.player = flv.createPlayer({
  //     type: 'flv',
  //     url: `http://localhost:8000/live/${id}.flv`
  //   });

  //   this.player.attachMediaElement(this.videoRef.current);
  //   this.player.load();
  // }

  // Modified method
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStream(id);
    this.buildPlayer()  ;
  }
  
  // This method was added for solving the problem mentioned above.
  buildPlayer() {
    const { id } = this.props.match.params;

    if (this.player || !this.props.stream) {
      return;
    } 

    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`
    });

    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();  
  }

  // This lifeCycleMethod is added so that we'd be able to build the player at any point during the process
  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  render(){
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <video ref={this.videoRef} style={{ width: '100%'}} controls />
        <h1>{this.props.stream.title}</h1>
        <h5>{this.props.stream.description}</h5>
      </div>    
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);

