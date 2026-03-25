import { useEffect, useState } from 'react';
import '../styles/CategoryFilter.css';

type CategoryFilterProps = {
    selectedCategories: string[];
    onCheckboxChange: (categories: string) => void;
};

function CategoryFilter ({
    selectedCategories,
    onCheckboxChange,
}: CategoryFilterProps) {
    const [categories, setCategories] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://localhost:5001/Book/BookCategories');
                const data: string[] = await response.json();

                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []); 

    const handleCheckboxChange = ({ target } : { target: HTMLInputElement }) => {
        const updatedCategories = selectedCategories.includes(target.value)
            ? selectedCategories.filter((category) => category !== target.value)
            : [...selectedCategories, target.value];
        onCheckboxChange(updatedCategories.join(','));
    };

    return (
        <div className="category-filter">
            <div className="category-filter__header">
                <div>
                    <h5>Book Categories</h5>
                    <p className="category-filter__summary">
                        {selectedCategories.length === 0
                            ? 'Choose one or more categories'
                            : `${selectedCategories.length} selected`}
                    </p>
                </div>
                <button
                    type="button"
                    className="category-filter__toggle"
                    onClick={() => setIsOpen((current) => !current)}
                    aria-expanded={isOpen}
                >
                    Filter Categories
                    <span className={`category-filter__chevron ${isOpen ? 'is-open' : ''}`}>
                        ▼
                    </span>
                </button>
            </div>
            {isOpen && (
                <div className="category-list">
                    {categories.map((category) => (
                        <label key={category} htmlFor={category} className="category-item">
                            <input
                                type="checkbox"
                                id={category}
                                value={category}
                                className="category-checkbox"
                                checked={selectedCategories.includes(category)}
                                onChange={handleCheckboxChange}
                            />
                            <span>{category}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CategoryFilter;
