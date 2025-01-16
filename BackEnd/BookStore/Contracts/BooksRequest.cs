namespace BookStore.Contracts
{
    public record BooksRequest(string Title, string Author, decimal Price, bool Cart);
}
