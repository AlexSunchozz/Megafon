import { useReducer, useCallback } from "react";

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

const initialVotes = () => {
    const data = localStorage.getItem('votes');
    return data ? JSON.parse(data) : {};
}

export const useVotes = () => {
    const [votes, dispatch] = useReducer(votesReducer, {}, initialVotes);

    //  Для сортировки без LocalStorage -------------------------------------
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
            // Добавляем индекс к каждому вопросу в случае, если в json придут вопросы не по порядку своего id
            questions: [...category.questions.map((question, i) => 
                ({...question, index: i})
            )].sort((a, b) => {
                const ratingA = votes[a.id] || 0;
                const ratingB = votes[b.id] || 0;

                // Если рейтинг вопросов одинаковые, то сохраняем изначальный порядок из файла (устойчивая сортировка)
                return ratingB !== ratingA ? ratingB - ratingA : a.index - b.index;
            })
        }))
        .sort((a,b) => {
            const totalRatingA = a.questions.reduce((sum, question) => sum + (votes[question.id] || 0), 0);
            const totalRatingB = b.questions.reduce((sum, question) => sum + (votes[question.id] || 0), 0);
            return totalRatingB - totalRatingA
        });
    }, [votes])

    return {
        handleVote,
        votes,
        sortCategories
    }
}