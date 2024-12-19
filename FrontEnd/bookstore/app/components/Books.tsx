import React from 'react';
import { Card, Button } from 'antd';
import { CardTitle } from './CardTitle';

interface Props {
    books: Book[];
    handleDelete: (id: string) => void;
    handleAdd: (id: string, book: Book) => void;
    handleOpen: (book: Book) => void;
}

export const Books = ({ books, handleOpen, handleDelete, handleAdd }: Props) => {
    return (
        <div className="books-container">
            {books.map((book: Book) => (
                <Card
                    key={book.id}
                    title={<CardTitle title={book.title} price={book.price} />}
                    bordered={false}
                    className="book-card"
                    hoverable
                >
                    <div className="book-details">
                        <p className="author-name">{book.author}</p>
                        <div className="card-actions">
                            <div className="add-to-cart-container">
                                {book.cart ? (
                                    <p className="in-cart-message">Книга уже в корзине</p>
                                ) : (
                                    <Button 
                                        onClick={() => handleAdd(book.id, book)} 
                                        className="add-to-cart-btn"
                                        type="primary"
                                    >
                                        Добавить в корзину
                                    </Button>
                                )}
                            </div>

                            <div className="edit-container">
                                <Button 
                                    onClick={() => handleOpen(book)} 
                                    className="edit-btn"
                                >
                                    Изменить
                                </Button>
                            </div>

                            <div className="delete-container">
                                <Button
                                    onClick={() => handleDelete(book.id)}
                                    danger
                                    className="delete-btn"
                                >
                                    Удалить
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
};
