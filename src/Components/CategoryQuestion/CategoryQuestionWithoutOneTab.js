import { useEffect, useRef, useState } from 'react';
import './CategoryQuestion.scss';

const CategoryQuestionWithoutOneTab = ({ question, answer, rating, updateHeight, openQuestion, isOpenCategory, setOpenQuestion, toggleQuestion }) => {
    const answerRef = useRef(null);

    useEffect(() => {
        // При открытии/закрытии вызываем updateHeight, чтобы родитель пересчитал высоту
        if (!isOpenCategory) setOpenQuestion(openQuestion => !openQuestion)

        updateHeight?.();

    }, [updateHeight, openQuestion, isOpenCategory, setOpenQuestion]);

    // const toggleClickQuestion = () => setOpenQuestion(openQuestion => !openQuestion)

    return (
        <li className="category-list__item question">
            <div className="question-content">
                <div
                    className={`question-content-top ${openQuestion ? 'active' : ''}`}
                    onClick={toggleQuestion}
                >
                    <p className="question-content-top__descr">ВОПРОС</p>
                    <div className="question-content-top__title">
                        <h4>{question}</h4>
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

                {openQuestion && (
                    <div className="question-content-bottom" 
                         ref={answerRef}
                         >
                        <p className="question-content-bottom__descr">ОТВЕТ</p>
                        <div className="question-content-bottom-container">
                            <div className="question-content-bottom__text">{answer}</div>
                            <div className="question-bottom__raiting raiting">
                                <div className="raiting-container">
                                    <div className="raiting__text">Информация была полезной?</div>
                                    <div className="raiting__btns">
                                        <button className="raiting__btns-yes">ДА</button>
                                        <button className="raiting__btns-no">НЕТ</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )} 
            </div>
        </li>
    );
};

export default CategoryQuestionWithoutOneTab;
