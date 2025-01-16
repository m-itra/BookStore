"use client";

import { useEffect, useState } from "react";
import { BookRequest, getAllBooks, updateBook } from "../service/books";
import Title from "antd/es/typography/Title";
import { CartOfBooks } from "../components/CartOfBooks";

export default function BookPage(){

    const defaultValues = {
        title: "",
        author: "",
        price: 1,
        cart:false,
    } as Book;

    const [values, setValues] = useState<Book>(defaultValues);
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(()=>{
        const getBooks = async () => {
            const books = await getAllBooks();
            setLoading(false);
            setBooks(books);
        };
        getBooks();
    }, []);

    
    const closeModal = () =>{
        setValues(defaultValues);
        setIsModalOpen(false);
    };

    const deleteFromCart = async (id:string, request: BookRequest) => {
            request.cart = false;
            await updateBook(id, request);
            closeModal();
        
            const book = await getAllBooks();
            setBooks(book);
    };

    return (
        <div>
            <div style={{ marginTop: "40px" }}></div>
            
            {loading ? (<Title>Loading...</Title>) :<CartOfBooks books={books} handleDeleteCart={deleteFromCart}/>}

        </div>
    );
}