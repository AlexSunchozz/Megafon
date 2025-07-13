import { useCallback, useState } from 'react';
import Category from '../Category/Category';

const CategoriesList = ({categories, onVote, votes}) => {
    // ------------------------- По одной вкладке -------------------------

    // const [openCategory, setOpenCategory] = useState(null);

    // const toggleCategory = useCallback((id) => {
    //     setOpenCategory(openCategory => openCategory === id ? null : id)
    // }, [])

    // --------------------------------------------------------------------

    // ----------------------- По несколько вкладок ------------------------

    const [openCategories, setOpenCategory] = useState([]);

    const toggleCategory = useCallback((id) => {
        setOpenCategory(openCategories => openCategories.includes(id) ? openCategories.filter(categoryId => categoryId !== id) : [...openCategories, id])
    }, [])

    // --------------------------------------------------------------------

    return (
        <ul className="faq-categories">
            {categories.map((category) => (
              <Category
                key={category.id}
                name={category.name}
                // По одной вкладке
                // isOpen={openCategory === category.id}
                // По несколько вкладок
                isOpen={openCategories.includes(category.id)}
                questions={category.questions}
                toggleCategory={toggleCategory}
                id={category.id}
                onVote={onVote}
                votes={votes}
              />
            ))}
          </ul>
    );
}

export default CategoriesList;