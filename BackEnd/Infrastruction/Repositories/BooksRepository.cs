using Domain.Models;
using Infrastruction.Enites;
using Microsoft.EntityFrameworkCore;
using Application.Interfaces;

namespace Infrastruction.Repositories
{
    public class BooksRepository : IBooksRepository
    {
        private readonly BookStoreDbContext _context;

        public BooksRepository(BookStoreDbContext context)
        {
            _context = context;
        }

        public async Task<List<Book>> Get()
        {
            var bookEntities = await _context.Books.AsNoTracking().ToListAsync();

            var books = bookEntities.Select(b => Book.Create(b.Id, b.Title, b.Author, b.Price, b.Cart).Book).ToList();

            return books;
        }

        public async Task<Guid> Create(Book book)
        {
            var bookEntity = new BookEntity
            {
                Id = book.Id,
                Title = book.Title,
                Author = book.Author,
                Price = book.Price,
                Cart = book.Cart,
            };

            await _context.Books.AddAsync(bookEntity);
            await _context.SaveChangesAsync();

            return bookEntity.Id;
        }

        public async Task<Guid> Update(Guid id, string title, string author, decimal price, bool cart)
        {
            await _context.Books.Where(b => b.Id == id).ExecuteUpdateAsync(s => s
            .SetProperty(b => b.Title, b => title)
            .SetProperty(b => b.Author, b => author)
            .SetProperty(b => b.Price, b => price)
            .SetProperty(b => b.Cart, b => cart));

            return id;
        }

        public async Task<Guid> Delete(Guid id)
        {
            await _context.Books.Where(b => b.Id == id).ExecuteDeleteAsync();

            return id;
        }

    }
}
