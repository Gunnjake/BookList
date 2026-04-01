import type { Book } from "../types/Book";
import { getApiBaseUrl } from "./apiConfig";

interface FetchBooksResponse {
    books: Book[];
    totalNumBooks: number;
}

const API_BASE_URL = `${getApiBaseUrl()}/book`;

// Fetch paged books
export const fetchBooks = async (
    pageSize: number,
    pageNum: number,
    selectedCategories: string[]
): Promise<FetchBooksResponse> => {
    try{
        const categoryParams = selectedCategories
            .map((cat) => `Categorytypes=${encodeURIComponent(cat)}`)
            .join('&'); 
        const response = await fetch(
            `${API_BASE_URL}/AllBooks?BookQty=${pageSize}&PageNum=${pageNum}${categoryParams ? `&${categoryParams}` : ''}`
        );

        if (!response.ok) {
            throw new Error(`Error fetching books: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to fetch books:', error);
        throw error;
    }
};

// Create new book
export const addBook = async (book: Book): Promise<Book> => {
    const response = await fetch(`${API_BASE_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
    });

    if (!response.ok) {
        throw new Error(`Error adding book: ${response.statusText}`);
    }

    return await response.json();
};

// Update saved book
export const updateBook = async (book: Book): Promise<Book> => {
    const response = await fetch(`${API_BASE_URL}/${book.bookId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
    });

    if (!response.ok) {
        throw new Error(`Error updating book: ${response.statusText}`);
    }

    return await response.json();
};

// Delete selected book
export const deleteBook = async (bookId: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/${bookId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(`Error deleting book: ${response.statusText}`);
    }
};
