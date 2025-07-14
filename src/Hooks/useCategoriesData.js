import { useState, useEffect } from "react";

const DATA_URL = process.env.PUBLIC_URL + '/data/data.json';

export const useCategoriesData = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res = await fetch(DATA_URL);
            if (!res.ok) throw new Error("Ошибка загрузки данных");

            const json = await res.json();
            setCategories(json.categories)
            
        } catch (error) {
            console.error("Ошибка загрузки:", error);
        } finally {
            setIsLoading(false);
        }
    }

    // Получение данных
    useEffect(() => {
        fetchData();
    }, []);

    return {categories, isLoading}
}