import './Category.scss';
import CategoryQuestion from "../CategoryQuestion/CategoryQuestion";
import { useState, useRef, useEffect, useCallback } from 'react';
import { useAccordion } from '../Hooks/useAccordion';
import { memo } from "react";

const Category = ({ name, questions, isOpen, toggleCategory, id, onVote, votes }) => {
    const contentRef = useRef(null);
    const [maxHeight, setMaxHeight] = useState('0px');

    const {toggleTab, isTabOpen, tab, clearTabs} = useAccordion({mode: 'multiply'})

    // Обновляем maxHeight в зависимости от состояния isOpen и текущей высоты контента
    const updateHeight = useCallback(() => {
        if (contentRef.current) {
            setMaxHeight(isOpen 
                ? `${contentRef.current.scrollHeight + parseInt(window.getComputedStyle(contentRef.current).paddingTop,10)}px` 
                : '0px');
        }
    }, [isOpen]);

    
    // Обновляем maxHeight каждый раз при изменении isOpen
    useEffect(() => {
        updateHeight();
    }, [tab, updateHeight, isOpen]);

    // Зыкрываем вопросы, при закрытии категории
    useEffect(() => {
        if (!isOpen) {
            clearTabs();
        }
    }, [isOpen, clearTabs])

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
                 }}
            >
                <div role="list"
                    className={`category-list-wrapper ${tab ? 'active' : ''}`}
                    ref={contentRef}
                    aria-label={`Список вопросов по теме ${name}`}
                    >
                    {questions.map(question => (
                        <CategoryQuestion
                            key={question.id}
                            question={question}
                            isOpenQuestion={isTabOpen(question.id)}
                            toggleQuestion={toggleTab}
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
