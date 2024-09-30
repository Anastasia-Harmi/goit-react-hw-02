import React from "react";

const Feedback = ({ feedback, totalFeedback, roundFeedback }) => {
  return (
    <div>
      <p>Good: {feedback.good}</p>
      <p>Neutral: {feedback.neutral}</p>
      <p>Bad: {feedback.bad}</p>
      <p>Total: {totalFeedback}</p>
      <p>Positive feedback: {roundFeedback}%</p>
    </div>
  );
};

export default Feedback;
