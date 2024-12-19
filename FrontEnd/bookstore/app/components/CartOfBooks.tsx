import React from 'react';
import { Card, Button, Empty } from 'antd';
import { CardTitle } from './CardTitle';

interface Props {
    books: Book[];
    handleDeleteCart: (id: string, book: Book) => void;
}

export const CartOfBooks = ({ books, handleDeleteCart }: Props) => {
    const cartBooks = books.filter((book: Book) => book.cart); // Фильтруем только те книги, у которых cart = true

    if (cartBooks.length === 0) {
        return (
            <div className="empty-cart-overlay">
                <Empty 
                    description={
                        <span className="empty-cart-description">
                            Корзина пуста
                        </span>
                    }
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
            </div>
        );
    }

    return (
        <div className="books-container">
            {cartBooks.map((book: Book) => (
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
                            <Button
                                onClick={() => handleDeleteCart(book.id, book)}
                                danger
                                className="delete-btn"
                            >
                                Удалить из корзины
                            </Button>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
};
