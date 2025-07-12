import './App.scss';
import { useEffect, useReducer, useState, useCallback } from 'react';
import CategoriesList from '../CategoriesList/CategoriesList';

// const DATA_URL = 'https://gist.githubusercontent.com/atihonem/f5776c4b1cdc6374aa46f5f544636469/raw/a9180f6b17fe2b99404ad335ed83dbdc0d996371/data.json';
const DATA_URL = 'data/data.json';

function App() {
  const [categories, setCategories] = useState([]);
  // const [sortedCategories, setSortedCategories] = useState([]);

  // Получение данных
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(DATA_URL);

        if (!res.ok) throw new Error("Ошибка загрузки данных");

        const json = await res.json();

        setCategories(json.categories);
        
      } catch (error) {
        console.error("Ошибка:", error);
      }
    };

    loadData();
  }, []);

  // const sortCategories = () => {

  // }

  const initialVaotes = () => {
    const votes = localStorage.getItem('votes');
    return votes ? JSON.parse(votes) : {};
  }

  const votesReducer = (state, action) => {
    
    const {questionId, value} = action.payload;

    switch(action.type) {
      case "VOTE": 
        const updatedVotes = {...state, [questionId]: (state[questionId] || 0) + value}

        //Обновляем local storage
        localStorage.setItem('votes', JSON.stringify(updatedVotes))
        console.log(`Вы проголосовали за вопрос: ${questionId}. Теперь рейтинг вопроса: ${updatedVotes[questionId]}`)
        
        return updatedVotes

      default:
        return state;
    }
  }

  const [votes, dispatch] = useReducer(votesReducer, {}, initialVaotes);

  const handleVote = useCallback((payload) => {
    dispatch({ type: "VOTE", payload });
  }, []);

  return (
    <div className="app-wrapper">
      <section className="faq">
        <div className="faq-container container">
          <div className="faq-title"><h2>FAQ</h2></div>
          <CategoriesList 
            categories={categories}
            onVote={handleVote}
            votes={votes}/>
        </div>
      </section>
    </div>
  );
}

export default App;
