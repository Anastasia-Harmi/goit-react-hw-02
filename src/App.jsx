import { useState, useEffect } from "react";

import "./App.css";
import Description from "./components/Description/Description";
import Feedback from "./components/Feedback/Feedback";
import Options from "./components/Options/Options";
import Notification from "./components/Notification/Notification";

const App = () => {
  const [feedback, setFeedback] = useState(() => {
    // Спробуємо зчитати з локального сховища
    const savedFeedback = localStorage.getItem("feedback");
    return savedFeedback
      ? JSON.parse(savedFeedback)
      : { good: 0, neutral: 0, bad: 0 };
  });

  // Використовуємо useEffect для збереження зворотного зв'язку в локальному сховищі
  useEffect(() => {
    localStorage.setItem("feedback", JSON.stringify(feedback));
  }, [feedback]);

  const handleClick = (feedbackType) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [feedbackType]: prevFeedback[feedbackType] + 1,
    }));
  };

  const handleReset = () => {
    setFeedback({
      good: 0,
      neutral: 0,
      bad: 0,
    });
    localStorage.removeItem("feedback"); // Очищуємо локальне сховище при скиданні};
  };
  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const roundFeedback =
    totalFeedback > 0 && Math.round((feedback.good / totalFeedback) * 100);
  return (
    <>
      <Description />
      <Options
        onFeedback={handleClick}
        onReset={handleReset}
        totalFeedback={totalFeedback}
      />
      {totalFeedback === 0 && <Notification />}
      {totalFeedback > 0 && (
        <Feedback
          feedback={feedback}
          totalFeedback={totalFeedback}
          roundFeedback={roundFeedback}
        />
      )}
    </>
  );
};

export default App;
