import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {  
    this.props.editStream(this.props.match.params.id, formValues);
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <h3>Edit a Stream</h3>
        {/* This way we will load the entire stream object in the ReduxForm. But we don't wanna do that al technicality and the fact that only the changed fields should be passed to the API, not IDs. So we extract the properties that we do want to be changed. */}
        {/* <StreamForm onSubmit={this.onSubmit} initialValues={this.props.stream}/> */}
        <StreamForm onSubmit={this.onSubmit} initialValues={_.pick(this.props.stream, 'title', 'description')}/>
      </div>
    );
  }
}    

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);