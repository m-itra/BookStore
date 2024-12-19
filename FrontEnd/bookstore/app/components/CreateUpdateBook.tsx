import Modal from "antd/es/modal/Modal";
import { SetStateAction, useEffect, useState } from "react";
import { Input } from "antd";
import { BookRequest } from "../service/books";


interface Props {
    mode: Mode;
    values: Book;
    isModalOpen: boolean;
    handleCancel: () =>void;
    handleCreate: (request: BookRequest) =>void;
    handleUpdate: (id:string, request: BookRequest) =>void;    
}

export enum Mode {
    Create,
    Edit,
}

export const CreateUpdateBook = ({
    mode,
    values,
    isModalOpen,
    handleCancel,
    handleCreate,
    handleUpdate,
}:Props) =>{

    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [price, setPrice] = useState<number>(1);
    const [cart, setCart] = useState<boolean>(false);

    useEffect(() => {
        setTitle(values.title);
        setAuthor(values.author);
        setPrice(values.price);
        setCart(values.cart);
      }, [values]);

    const handleOnOk = async () => {
        const bookRequest = { title, author, price, cart};
    
        mode == Mode.Create
          ? handleCreate(bookRequest)
          : handleUpdate(values.id, bookRequest);
      };


    return (
        <Modal title={mode === Mode.Create ? "Добавить книгу": "Редактировать книгу"} 
            open={isModalOpen} 
            cancelText={"Отмена"}
            onOk = {handleOnOk}
            onCancel = {handleCancel}>

            <div className="book_modal">
                <Input
                    value={title}
                    onChange={(e: { target: { value: SetStateAction<string> } }) => setTitle(e.target.value)}
                    placeholder="Название"
                    />
                
                <Input
                    value={author}
                    onChange={(e: { target: { value: SetStateAction<string> } }) =>setAuthor(e.target.value)}
                    
                    placeholder="Автор"
                />

                <Input
                    value={price}
                    onChange={(e: { target: { value: SetStateAction<string> } }) => setPrice(Number(e.target.value))}
                    placeholder="Цена"
                />
            </div>

        </Modal>
    )
}