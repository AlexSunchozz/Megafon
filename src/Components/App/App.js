import './App.scss';
import { useEffect, useReducer, useState, useCallback } from 'react';
import CategoriesList from '../CategoriesList/CategoriesList';

// const DATA_URL = 'https://gist.githubusercontent.com/atihonem/f5776c4b1cdc6374aa46f5f544636469/raw/a9180f6b17fe2b99404ad335ed83dbdc0d996371/data.json';
const DATA_URL = 'data/data.json';

function App() {
  const [categories, setCategories] = useState([]);
  const [sortedCategories, setSortedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true)


  // Для сортировки c Local Storage -----

  const initialVotes = () => {
    const votes = localStorage.getItem('votes');
    return votes ? JSON.parse(votes) : {};
  }

  // ------------------------------------


  const votesReducer = (state, action) => {
    const {questionId, value} = action.payload;

    switch(action.type) {
      case "VOTE": 
        const updatedVotes = {...state, [questionId]: (state[questionId] || 0) + value}

        //Обновляем local storage
        localStorage.setItem('votes', JSON.stringify(updatedVotes));

        console.log(`Вы проголосовали за вопрос: ${questionId}. Теперь рейтинг вопроса: ${updatedVotes[questionId]}`)
        
        return updatedVotes

      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  }


  // Для сортировки с LocalStorage ---------------------------------------

  const [votes, dispatch] = useReducer(votesReducer, {}, initialVotes);

  // ---------------------------------------------------------------------


  // Для сортировки без LocalStorage -------------------------------------

  // const [votes, dispatch] = useReducer(votesReducer, {});

  // ---------------------------------------------------------------------


  const handleVote = useCallback((payload) => {
    dispatch({ type: "VOTE", payload });
  }, []);

  // Сортировка вопросов внутри категорий и категорий по общему рейтингу вопросов
  const sortCategories = useCallback((categories) => {
  return [...categories]
  .map((category) => ({
      ...category, 
      questions: [...category.questions].sort((a, b) => {
        const ratingA = votes[a.id] || 0;
        const ratingB = votes[b.id] || 0;

        // Если рейтинг вопросов одинаковые, то сохраняем изначальный порядок из файла (устойчивая сортировка)
        return ratingB !== ratingA ? ratingB - ratingA : a.id - b.id;
      })
    })).sort((a,b) => {
      const totalRatingA = a.questions.reduce((sum, question) => sum + (votes[question.id] || 0), 0);
      const totalRatingB = b.questions.reduce((sum, question) => sum + (votes[question.id] || 0), 0);
      return totalRatingB - totalRatingA
    });
  }, [votes])

  // Получение данных
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(DATA_URL);

        if (!res.ok) throw new Error("Ошибка загрузки данных");

        const json = await res.json();

        if (json.categories.length > 0) {
          setCategories(json.categories); 

          // Сортировка только при обновлении страницы

          // setSortedCategories(sortCategories(json.categories));

          // -----------------------------------------
        }
        
      } catch (error) {
        console.error("Ошибка:", error);
      }
      finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);


  // Сортировка данных сразу после голосования

  useEffect(() => {
    if (categories.length > 0) {
      const sorted = sortCategories(categories);
      setSortedCategories(sorted)
    }
  }, [categories, sortCategories])

  // -----------------------------------------


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
              onVote={handleVote}
              votes={votes}/>
          }
        </div>
      </section>
    </div>
  );
}

export default App;
