import { useCallback, useReducer, useState } from 'react';
import Category from '../Category/Category';
import CategoryWithoutOneTab from '../Category/CategoryWithoutOneTab';

const CategoriesList = ({categories}) => {
    // const [raiting, dispatch] = useReducer(reducer)

    // ------------------------- По одной вкладке -------------------------

    const [openCategory, setOpenCategory] = useState(null);

    const toggleCategory = useCallback((id) => {
        setOpenCategory(openCategory => openCategory === id ? null : id)
    }, [])

    // --------------------------------------------------------------------

    return (
        <ul className="faq-categories">
            {categories.map((category) => (
              <Category
                key={category.id}
                name={category.name}
                isOpen={openCategory === category.id}
                questions={category.questions}
                toggleCategory={toggleCategory}
                id={category.id}
              />
            ))}
            {/* {categories.map((category) => (
                <CategoryWithoutOneTab
                  key={category.id}
                  name={category.name}
                  questions={category.questions}
              />
            ))} */}
          </ul>
    );
}

export default CategoriesList;