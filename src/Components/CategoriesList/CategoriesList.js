import { useState } from 'react';
import Category from '../Category/Category';

const CategoriesList = ({categories}) => {
    const [openCategory, setOpencategory] = useState(null);

    const toggleCategory = (id) => {
        setOpencategory(openCategory => openCategory === id ? null : id)
    }

    return (
        <ul className="faq-categories">
            {categories.map((category) => (
              <Category
                key={category.id}
                name={category.name}
                isOpen={openCategory === category.id}
                questions={category.questions}
                toggleCategory={() => toggleCategory(category.id)}
              />
            ))}
          </ul>
    );
}

export default CategoriesList;