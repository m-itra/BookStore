﻿using Domain.Models;

namespace Application.Interfaces
{
    public interface IBooksService
    {
        Task<Guid> CreateBook(Book book);
        Task<Guid> DeleteBook(Guid id);
        Task<List<Book>> GetAllBooks();
        Task<Guid> UpdateBook(Guid id, string title, string author, decimal price, bool cart);
    }
}