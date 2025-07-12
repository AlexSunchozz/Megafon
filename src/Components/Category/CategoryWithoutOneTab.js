import './Category.scss';
import CategoryQuestionWithoutOneTab from "../CategoryQuestion/CategoryQuestionWithoutOneTab";
import { useState, useRef, useEffect, useCallback } from 'react';

const CategoryWithoutOneTab = ({ name, questions }) => {
    const contentRef = useRef(null);
    const [maxHeight, setMaxHeight] = useState('0px');
    const [isOpen, setIsOpen] = useState(null);
    const [openQuestion, setOpenQuestion] = useState(null);

    // Обновляем maxHeight в зависимости от состояния isOpen и текущей высоты контента
    const updateHeight = useCallback(() => {
        if (contentRef.current) {
            setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
        }
    }, [isOpen]);

    // Обновляем maxHeight каждый раз при изменении isOpen
    useEffect(() => {
        updateHeight();
    }, [isOpen, updateHeight]);

    const toggleCategory = () => setIsOpen(isOpen => !isOpen)
    const toggleQuestion = (id) => {
        setOpenQuestion(openQuestion => openQuestion === id ? null : id)
    }

    return (
        <li className={`faq-categories__item category ${isOpen ? 'active' : ''}`}>
            <div className="category-top" onClick={toggleCategory}>
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

            <div
                className="category-list"
                ref={contentRef}
                style={{
                    maxHeight,
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease',
                }}
            >
                <ul className="category-list-wrapper">
                    {questions.map(question => (
                        <CategoryQuestionWithoutOneTab
                            key={question.id}
                            question={question.question}
                            questionId={question.id}
                            answer={question.answer}
                            rating={question.rating}
                            isOpenCategory={isOpen}
                            openQuestion={openQuestion === question.id}
                            toggleQuestion={() => toggleQuestion(question.id)}
                            setOpenQuestion={setOpenQuestion}
                            updateHeight={updateHeight}
                        />
                    ))}
                </ul>
            </div>
        </li>
    );
};

export default CategoryWithoutOneTab;
