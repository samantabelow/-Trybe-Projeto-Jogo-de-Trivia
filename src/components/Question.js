import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../actions';
import '../App.css';

class Question extends React.Component {
  constructor() {
    super();
    this.handleCorrectAnswer = this.handleCorrectAnswer.bind(this);
    this.handleIncorrectAnswer = this.handleIncorrectAnswer.bind(this);
  }

  handleCorrectAnswer() {
    const { changeButtonStyle, activateButton, lastQuestionCorrectAction } = this.props;
    // changeScoreAction();
    changeButtonStyle();
    activateButton();
    lastQuestionCorrectAction();
  }

  handleIncorrectAnswer() {
    const { changeButtonStyle, activateButton, lastQuestionIncorrectAction } = this.props;
    changeButtonStyle();
    activateButton();
    lastQuestionIncorrectAction();
  }

  render() {
    const { rightClass, wrongClass, optionsDisabled } = this.props;
    const {
      category,
      question,
      correctAnswer,
      incorrectAnswers,
    } = this.props;
    const index = 0;
    return (
      <div>
        <p key={ `question${index}` } data-testid="question-category">{category}</p>
        <p key={ `category${index}` } data-testid="question-text">{question}</p>
        <button
          type="button"
          key={ `right${index}` }
          className={ rightClass }
          disabled={ optionsDisabled }
          data-testid="correct-answer"
          onClick={ this.handleCorrectAnswer }
        >
          {correctAnswer}
        </button>
        {incorrectAnswers.map((answer, order) => (
          <button
            type="button"
            key={ `wrong${order}` }
            className={ wrongClass }
            disabled={ optionsDisabled }
            data-testid={ `wrong-answer-${order}` }
            onClick={ this.handleIncorrectAnswer }
          >
            {answer}
          </button>))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  rightClass: state.gamepage.rightClass,
  wrongClass: state.gamepage.wrongClass,
  timer: state.gamepage.time,
  optionsDisabled: state.gamepage.optionsDisabled,
});

const mapDispatchToProps = (dispatch) => ({
  // changeScoreAction: () => dispatch(actions.changeScore()),
  changeButtonStyle: () => dispatch(actions.changeButtonStyle()),
  activateButton: () => dispatch(actions.enableButton()),
  lastQuestionCorrectAction: () => dispatch(actions.lastQuestionCorrect()),
  lastQuestionIncorrectAction: () => dispatch(actions.lastQuestionIncorrect()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);

Question.propTypes = {
  category: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  incorrectAnswers: PropTypes.shape(PropTypes
    .arrayOf(PropTypes.shape(PropTypes.string))).isRequired,
  // changeScoreAction: PropTypes.func.isRequired,
  changeButtonStyle: PropTypes.func.isRequired,
  rightClass: PropTypes.string.isRequired,
  wrongClass: PropTypes.string.isRequired,
  optionsDisabled: PropTypes.bool.isRequired,
  activateButton: PropTypes.func.isRequired,
  lastQuestionCorrectAction: PropTypes.func.isRequired,
  lastQuestionIncorrectAction: PropTypes.func.isRequired,
};
