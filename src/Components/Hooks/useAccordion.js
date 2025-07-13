import { useState, useCallback } from "react";

export const useAccordion = ({mode}) => {
    const [tab, setTabs] = useState(mode === 'multiply' ? [] : null);
        
    const toggleTab = useCallback((id) => {
        if (mode === 'multiply') {
            setTabs(tab => 
                tab.includes(id)  // Проверяем есть ли id в массиве открытых вкладок
                    ? tab.filter(tabId => tabId !== id)  // Если есть, то вкладка закрывается
                    : [...tab, id]) // Иначе добавляем id в массив и открываем вкладку
        } else {
            setTabs(tab => tab === id ? null : id)
        }
    }, [mode])

    const isTabOpen = useCallback((id) => {
        return mode === 'single' ? tab === id : tab.includes(id)
    }, [tab, mode]);

    const clearTabs = useCallback(() => {
        setTabs(mode === 'multiply' ? [] : null)
    }, [mode])

    return {toggleTab, isTabOpen, tab, clearTabs}
}