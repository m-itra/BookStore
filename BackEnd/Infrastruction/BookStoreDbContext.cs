using Infrastruction.Enites;
using Microsoft.EntityFrameworkCore;

namespace Infrastruction
{
    public class BookStoreDbContext : DbContext
    {
        public BookStoreDbContext(DbContextOptions<BookStoreDbContext> options) 
            : base(options)
        {
        }

        public DbSet<BookEntity> Books { get; set; }

    }
}
