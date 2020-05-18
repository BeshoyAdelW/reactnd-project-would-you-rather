import React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardTitle } from 'reactstrap';
import {  Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import NotFound from "./NotFound";

class Question extends React.Component {
    constuctor() {
        this.loadQuestionDetails = this.routeChange.bind(this);
    }
    loadQuestionDetails(e, questionId) {
        let path = `/questions/`+questionId;
        this.props.history.push(path);
    }

    render() {
        const {question} = this.props;
        if (question === undefined) {
            return <Route component={NotFound}/>;
        } else {
            return (
                <Card onClick={(e) => this.loadQuestionDetails(e, question.id)}>
                    <CardBody>
                        <CardTitle>Would You Rather</CardTitle>
                        <ul>
                            <li>{question.optionOne.text}</li>
                            <li>{question.optionTwo.text}</li>
                        </ul>
                    </CardBody>
                </Card>
            );
        }
    }
}

Question.propTypes = {
    question: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

function mapStateToProps (state, { id }) {
    if (id === undefined) {
        return <Route component={NotFound}/>;
    } else {
    return {
        question : state.questions[id],
        auth: state.authedUser
    }
}}

export default withRouter(connect(mapStateToProps, null)(Question))
