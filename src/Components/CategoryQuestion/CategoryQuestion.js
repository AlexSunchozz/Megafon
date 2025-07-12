import { useRef  } from 'react';
import './CategoryQuestion.scss';
import { memo } from 'react';

const CategoryQuestion = ({ question, answer, onVote, isVotes, isOpenQuestion, toggleQuestion }) => {
    const answerRef = useRef(null);

    return (
        <li className={`category-list__item question ${isOpenQuestion ? 'active' : ''}`}>
            <div className="question-content">
                <div
                    className="question-content-top"
                    onClick={() => toggleQuestion(question.id)}
                >
                    <p className="question-content-top__descr">ВОПРОС</p>
                    <div className="question-content-top__title">
                        <h4>{question.question}</h4>
                        <div className="question-content-top__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path
                                    d="m11.2 12 4.8 4.8 4.8-4.8 1.7 1.6L16 20l-6.5-6.4z"
                                    transform="translate(5.5,8) translate(-9.5,-12)"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="question-content-bottom" 
                        ref={answerRef}
                        style={{
                        height: isOpenQuestion ? 'auto' : '0px',
                        transitionProperty: 'height, padding-bottom',
                        transitionDuration: '0.3s',
                        transitionTimingFunction: "ease",
                        overflow: 'hidden',
                        paddingBottom: isOpenQuestion ? '32px' : '0px'
                        }}>
                    <p className="question-content-bottom__descr">ОТВЕТ</p>
                    <div className="question-content-bottom-container">
                        <div className="question-content-bottom__text">{answer}</div>
                        <div className="question-bottom__raiting raiting">
                            <div className="raiting-container">
                                {isVotes ? 
                                    <div className="raiting__text"
                                         style={{margin: '8px 0px', transition: 'margin ease 0.3s'}}>Отзыв отправлен, спасибо!</div> :
                                    <>
                                        <div className="raiting__text">Информация была полезной?</div>
                                        <div className="raiting__btns">
                                            <button type="button" className="raiting__btns-yes"
                                                    onClick={(e) => onVote({questionId: question.id, value: 1})}>ДА</button>
                                            <button type="button" className="raiting__btns-no"
                                                    onClick={(e) => onVote({questionId: question.id, value: -1})}>НЕТ</button>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default memo(CategoryQuestion);
