"use client";

import Button from "antd/es/button/button";
import { Empty } from "antd";
import { useEffect, useState } from "react";
import { BookRequest, createBook, deleteBook, getAllBooks, updateBook } from "./service/books";
import { Books } from "./components/Books";
import Title from "antd/es/typography/Title";
import { CreateUpdateBook, Mode } from "./components/CreateUpdateBook";

export default function BookPage() {
    const defaultValues = {
        title: "",
        author: "",
        price: 1,
    } as Book;

    const [values, setValues] = useState<Book>(defaultValues);

    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState(Mode.Create);

    useEffect(() => {
        const getBooks = async () => {
            const books = await getAllBooks();
            setLoading(false);
            setBooks(books);
        };

        getBooks();
    }, []);

    const handleCreateBook = async (request: BookRequest) => {
        await createBook(request);
        closeModal();

        const book = await getAllBooks();
        setBooks(book);
    };

    const handleUpdateBook = async (id: string, request: BookRequest) => {
        await updateBook(id, request);
        closeModal();

        const book = await getAllBooks();
        setBooks(book);
    };

    const handleDeleteBook = async (id: string) => {
        await deleteBook(id);
        closeModal();

        const book = await getAllBooks();
        setBooks(book);
    };

    const openModal = () => {
        setMode(Mode.Create);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setValues(defaultValues);
        setIsModalOpen(false);
    };

    const openEditModal = (book: Book) => {
        setMode(Mode.Edit);
        setValues(book);
        setIsModalOpen(true);
    };

    const addInCart = async (id: string, request: BookRequest) => {
        request.cart = true;
        await updateBook(id, request);
        closeModal();

        const book = await getAllBooks();
        setBooks(book);
    };

    return (
        <div style={{ padding: "20px" }}>
            <Button
                type="primary"
                style={{ marginBottom: "20px" }}
                size="large"
                onClick={openModal}
            >
                Добавить книгу
            </Button>

            <CreateUpdateBook
                mode={mode}
                values={values}
                isModalOpen={isModalOpen}
                handleCreate={handleCreateBook}
                handleUpdate={handleUpdateBook}
                handleCancel={closeModal}
            />

            <div style={{ marginTop: "20px" }}>
                {loading ? (
                    <Title>Loading...</Title>
                ) : books.length === 0 ? (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "60vh",
                            flexDirection: "column",
                        }}
                    >
                        <Empty description={
                            <span className="empty-cart-description">
                                Нет доступных книг
                            </span>
                    } />
                        
                    </div>
                ) : (
                    <Books
                        books={books}
                        handleAdd={addInCart}
                        handleOpen={openEditModal}
                        handleDelete={handleDeleteBook}
                    />
                )}
            </div>
        </div>
    );
}
