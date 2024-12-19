using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Book
    {
        public const int MAX_TITLE_LENGTH = 100;

        private Book(Guid id, string title, string author, decimal price, bool cart = false) {
            Id = id; Title = title; Author = author; Price = price; Cart =cart ;
        }

        public Guid Id { get; }    

        public string Title { get; } 
        
        public string Author { get; }

        public decimal Price { get; }

        public bool Cart { get; }

        public static (Book Book, string Error) Create(Guid id, string title, string author, decimal price, bool cart = false)
        {
            string error = string.Empty;

            if (string.IsNullOrEmpty(title))
            {
                error = "Title cannot be empty.";
            }
            else if (title.Length > MAX_TITLE_LENGTH)
            {
                error = $"Title cannot be longer than {MAX_TITLE_LENGTH} symbols.";
            }

            if (string.IsNullOrEmpty(author))
            {
                error = "Author cannot be empty.";
            }
            else if (Regex.IsMatch(author, @"\d"))
            {
                error = "Author name cannot contain numbers.";
            }

            if (price < 0)
            {
                error = "Price cannot be negative.";
            }

            var book = new Book(id, title, author, price, cart);

            return (book, error);
        }

    }   

}
