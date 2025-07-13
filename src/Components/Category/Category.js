import './Category.scss';
import CategoryQuestion from "../CategoryQuestion/CategoryQuestion";
import { useState, useRef, useEffect, useCallback } from 'react';
import { memo } from "react";

const Category = ({ name, questions, isOpen, toggleCategory, id, onVote, votes }) => {
    const contentRef = useRef(null);
    const [maxHeight, setMaxHeight] = useState('0px');

    // Раскрытие по одной вкладке вопроса ------------------
    // const [openQuestion, setOpenQuestion] = useState(null);
    // ------------------------------------------------------

    // Раскрытие по несколько вкладок вопросов --------------
    const [openQuestions, setOpenQuestion] = useState([]);
    // ------------------------------------------------------

    // Обновляем maxHeight в зависимости от состояния isOpen и текущей высоты контента
    const updateHeight = useCallback(() => {
        if (contentRef.current) {
            setMaxHeight(isOpen ? `${contentRef.current.scrollHeight + parseInt(window.getComputedStyle(contentRef.current).paddingTop,10)}px` : '0px');
        }
    }, [isOpen]);

    // Обновляем maxHeight каждый раз при изменении isOpen
    useEffect(() => {
        updateHeight();
    }, [openQuestions, updateHeight, isOpen]);

    // Зыкрываем вопросы, при закрытии категории
    useEffect(() => {
        if (!isOpen) {
            // По одной вкладке
            // setOpenQuestion(null);

            // Несколько вкладок сразу
            setOpenQuestion([]);
        }
    }, [isOpen])


    // Раскрытие по одной вкладке ----------------------------------------

    // const toggleQuestion = useCallback((id) => {
    //     setOpenQuestion(openQuestion => openQuestion === id ? null : id)
    // }, [])

    // --------------------------------------------------------------------



    // Раскрытие по одной вкладке ----------------------------------------

    const toggleQuestion = useCallback((id) => {
        setOpenQuestion(openQuestions => openQuestions.includes(id) ? openQuestions.filter(questionId => questionId !== id) : [...openQuestions, id])
    }, [])

    // --------------------------------------------------------------------

    return (
        <div role="listitem" className={`faq-categories__item category ${isOpen ? 'active' : ''}`}>
            <div className="category-top" 
                    aria-expanded={isOpen}
                    role="button"
                    aria-controls={`category-content-${id}`}
                    id={`category-header-${id}`}
                    onClick={() => toggleCategory(id)}>
                <h3 className="category-top__title">{name}</h3>
                <div className="category-top__icon">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="#333333"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="m11.2 12 4.8 4.8 4.8-4.8 1.7 1.6L16 20l-6.5-6.4z"
                            transform="translate(4,7) scale(1.2308,1.25) translate(-9.5,-12)"
                        />
                    </svg>
                </div>
            </div>
            <div className="category-list"
                 id={`category-content-${id}`}
                 role="region"
                 aria-labelledby={`category-header-${id}`}
                 style={{
                    maxHeight,
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease',
                 }}
            >
                <div role="list"
                    className={`category-list-wrapper ${openQuestions ? 'active' : ''}`}
                    ref={contentRef}
                    aria-label={`Список вопросов по теме ${name}`}
                    >
                    {questions.map(question => (
                        <CategoryQuestion
                            key={question.id}
                            question={question}
                            answer={question.answer}
                            rating={question.rating}
                            // Раскрытие по однйо вкладке вопроса
                            // isOpenQuestion={openQuestion === question.id}
                            // 
                            // Раскрытие всех вкладок
                            isOpenQuestion={openQuestions.includes(question.id)}
                            // 
                            toggleQuestion={toggleQuestion}
                            onVote={onVote}
                            isVotes={votes[question.id] !== undefined}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default memo(Category);
