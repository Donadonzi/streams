import React from 'react';
import { Field, reduxForm, getFormMeta} from 'redux-form';


/* We created a functional component in the begining just for the sake of it! We now change to a class-based compo because we need a bunch of helper methods in it.
const StreamCreate = () => {
    return <div>StreamCreact</div>;
};
*/

class StreamCreate extends React.Component {
    
    renderError({ error, touched }) { // destrucurized of renderError(meta)
        if ( touched && error ) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }
    renderInput = (formProps) => {    // destructuring: renderInput({ input, label, meta}) ===> so we can refer to them as those names instead of formProps.input... But I find it a bit unclear so I didn't do destructuring
        const className = `field ${ formProps.meta.error && formProps.meta.touched ? 'error' : '' }`;
        return (
            <div className={className}>
                <label>{formProps.label}</label> 
                {/* <input onChange={formProps.input.onChange} value={formProps.input.value}/> Change it to a simpler syntax below */}
                {/* This will add all of the properties of formProps.input object as props to the input element  */}
                <input {...formProps.input} autoComplete="off" />
                {this.renderError(formProps.meta)}
            </div>
        );
    }

    onSubmit(formValues) {
        console.log(formValues);
    }

    render() {    
        return (    
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = formValues => {
    const errors = {};

    if (!formValues.title) {
        errors.title = 'You must enter a title';
    }

    if (!formValues.description){
        errors.description = 'You must enter a description';
    }

    return errors;
};

export default reduxForm({
    form: 'streamCreate',
    validate: validate
})(StreamCreate);