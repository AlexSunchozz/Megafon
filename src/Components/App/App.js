import './App.scss';
import CategoriesList from '../CategoriesList/CategoriesList';
import { useEffect, useState } from 'react';
import { useCategoriesData } from '../../Hooks/useCategoriesData';
import { useVotes } from '../../Hooks/useVotes';

function App() {
  const {categories, isLoading} = useCategoriesData();
  const {sortCategories, votes, handleVote} = useVotes();
  const [sortedCategories, setSortedCategories] = useState([]);

  
  useEffect(() => {
    if (categories.length > 0) {
      const sortedData = sortCategories(categories);
      setSortedCategories(sortedData); 
    }
  },[categories])

  return (
    <div className="app-wrapper">
      <section className="faq">
        <div className="faq-container container">
          <div className="faq-title"><h2>FAQ</h2></div>
          {isLoading ? (
            <div>Загрузка FAQ...</div>
          ) :
            <CategoriesList 
              categories={sortedCategories}
              votes={votes}
              handleVote={handleVote}
            />
          }
        </div>
      </section>
    </div>
  );
}

export default App;
