import './App.scss';
import { useEffect, useState } from 'react';
import CategoriesList from '../CategoriesList/CategoriesList';

const DATA_URL = 'https://gist.githubusercontent.com/atihonem/f5776c4b1cdc6374aa46f5f544636469/raw/a9180f6b17fe2b99404ad335ed83dbdc0d996371/data.json';
// const DATA_URL = '../../Data/data.json';

function App() {
  const [categories, setCategories] = useState([]);

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

  return (
    <div className="app-wrapper">
      <section className="faq">
        <div className="faq-container container">
          <div className="faq-title"><h2>FAQ</h2></div>
          <CategoriesList categories={categories}/>
        </div>
      </section>
    </div>
  );
}

export default App;
