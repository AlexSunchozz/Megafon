import Category from '../Category/Category';
import { useAccordion } from '../Hooks/useAccordion';

const CategoriesList = ({categories, onVote, votes}) => {
    const {toggleTab, isTabOpen} = useAccordion({mode: 'multiply'})

    return (
        <div className="faq-categories" role="list">
            {categories.map((category) => (
              <Category
                key={category.id}
                name={category.name}
                isOpen={isTabOpen(category.id)}
                questions={category.questions}
                toggleCategory={toggleTab}
                id={category.id}
                onVote={onVote}
                votes={votes}
              />
            ))}
          </div>
    );
}

export default CategoriesList;