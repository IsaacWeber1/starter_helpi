import { Link } from "react-router-dom";
import "src/css/select-quiz.css"

export function SelectQuiz(): JSX.Element {
  // allow for navigation to new quiz
  return (
    <div className="quiz-select">
      <div className="quiz-link-select-container">
        <Link className="select-quiz-link" to="/basic-quiz">
          <p className="select-quiz-link-text"><strong>Basic Guide</strong></p>
        </Link>
        <article>
          Explore Your Path: Ideal for beginners or those uncertain about their career direction, this quiz provides a friendly introduction to the world of career possibilities. Through straightforward questions about your interests and basic educational background, it helps you discover diverse career fields and suggests potential areas you might enjoy exploring further. Perfect for high school students or anyone new to career planning.
        </article>
      </div>
      <div className="quiz-link-select-container">
        <Link className="select-quiz-link" to="/advanced-quiz">
          <p className="select-quiz-link-text"><strong>Advanced Guide</strong></p>
        </Link>
        <article>
          Refine Your Journey: Designed for those who have a clearer vision of their future, this quiz dives deep into specific career pathways and advanced opportunities. By analyzing your detailed educational achievements, experiences, and skills, it offers personalized advice on strategic steps to take your career to the next level. Ideal for college students, recent graduates, or professionals seeking targeted guidance.
        </article>
      </div>
    </div>
  );
}